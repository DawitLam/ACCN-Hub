const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const { protect, authorize } = require('../middleware/auth');

// Get single lesson
router.get('/:id', protect, async (req, res) => {
  try {
    const ActivityLog = require('../models/ActivityLog');
    
    // For students, exclude quiz answers and explanations
    const lesson = req.user.role === 'student' 
      ? await Lesson.findById(req.params.id)
          .select('-quiz.correctAnswer -quiz.explanation')
          .populate('course')
      : await Lesson.findById(req.params.id).populate('course');
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    // Log lesson view for all users
    if (req.user.role === 'student' || req.user.role === 'instructor') {
      await ActivityLog.logActivity({
        user: req.user.id,
        activityType: 'lesson_viewed',
        course: lesson.course._id,
        lesson: lesson._id,
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
    }
    
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lesson', error: error.message });
  }
});

// Create new lesson (instructors only)
router.post('/', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const { courseId, ...lessonData } = req.body;
    
    // Verify course exists and user owns it
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to add lessons to this course' });
    }
    
    // Create lesson
    const lesson = await Lesson.create({
      ...lessonData,
      course: courseId
    });
    
    // Add lesson to course
    await Course.findByIdAndUpdate(courseId, {
      $push: { lessons: lesson._id }
    });
    
    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      lesson
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating lesson', error: error.message });
  }
});

// Update lesson (instructors only)
router.put('/:id', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course');
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    // Check if user owns the course
    if (lesson.course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this lesson' });
    }
    
    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Lesson updated successfully',
      lesson: updatedLesson
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating lesson', error: error.message });
  }
});

// Delete lesson (instructors only)
router.delete('/:id', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course');
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    // Check if user owns the course
    if (lesson.course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this lesson' });
    }
    
    // Remove from course
    await Course.findByIdAndUpdate(lesson.course._id, {
      $pull: { lessons: lesson._id }
    });
    
    await lesson.deleteOne();
    
    res.json({
      success: true,
      message: 'Lesson deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lesson', error: error.message });
  }
});

// Submit quiz for lesson
router.post('/:id/quiz', protect, authorize('student'), async (req, res) => {
  try {
    const { answers, timeSpent } = req.body;
    const ActivityLog = require('../models/ActivityLog');
    
    // Get lesson with correct answers (only for grading)
    const lesson = await Lesson.findById(req.params.id)
      .select('+quiz.correctAnswer +quiz.explanation');
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    if (!lesson.quiz || lesson.quiz.length === 0) {
      return res.status(400).json({ message: 'This lesson has no quiz' });
    }
    
    // Get progress and check attempts
    const progress = await Progress.findOne({
      student: req.user.id,
      course: lesson.course
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    
    const lessonProgress = progress.completedLessons.find(
      cl => cl.lesson.toString() === lesson._id.toString()
    );
    
    const currentAttempts = lessonProgress?.quizAttempts || 0;
    const maxAttempts = lesson.quizSettings?.maxAttempts || 3;
    
    // Check attempt limit
    if (currentAttempts >= maxAttempts) {
      await ActivityLog.logActivity({
        user: req.user.id,
        activityType: 'permission_denied',
        course: lesson.course,
        lesson: lesson._id,
        details: { reason: 'Max quiz attempts exceeded', attempts: currentAttempts },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
      
      return res.status(403).json({ 
        message: `Maximum quiz attempts (${maxAttempts}) exceeded`,
        attemptsRemaining: 0
      });
    }
    
    // Calculate score
    let correctAnswers = 0;
    const results = [];
    
    lesson.quiz.forEach((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      if (isCorrect) correctAnswers++;
      
      results.push({
        questionNumber: index + 1,
        correct: isCorrect,
        userAnswer: answers[index],
        correctAnswer: lesson.quizSettings?.showCorrectAnswers ? question.correctAnswer : undefined,
        explanation: (lesson.quizSettings?.showCorrectAnswers && question.explanation) ? question.explanation : undefined
      });
    });
    
    const score = Math.round((correctAnswers / lesson.quiz.length) * 100);
    const passingScore = lesson.quizSettings?.passingScore || lesson.requiredCompletion?.minimumScore || 70;
    const passed = score >= passingScore;
    
    // Update progress
    if (lessonProgress) {
      lessonProgress.quizScore = Math.max(lessonProgress.quizScore || 0, score);
      lessonProgress.quizAttempts = currentAttempts + 1;
      lessonProgress.quizHistory = lessonProgress.quizHistory || [];
      lessonProgress.quizHistory.push({
        attemptedAt: new Date(),
        score,
        timeSpent,
        answers
      });
    } else {
      progress.completedLessons.push({
        lesson: lesson._id,
        quizScore: score,
        quizAttempts: 1,
        quizHistory: [{
          attemptedAt: new Date(),
          score,
          timeSpent,
          answers
        }]
      });
    }
    
    await progress.save();
    
    // Log activity
    await ActivityLog.logActivity({
      user: req.user.id,
      activityType: passed ? 'quiz_passed' : 'quiz_failed',
      course: lesson.course,
      lesson: lesson._id,
      details: { 
        score, 
        passed, 
        attempt: currentAttempts + 1,
        timeSpent,
        correctAnswers,
        totalQuestions: lesson.quiz.length
      },
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      duration: timeSpent
    });
    
    res.json({
      success: true,
      score,
      passed,
      correctAnswers,
      totalQuestions: lesson.quiz.length,
      passingScore,
      attemptsUsed: currentAttempts + 1,
      attemptsRemaining: maxAttempts - (currentAttempts + 1),
      results: lesson.quizSettings?.showCorrectAnswers ? results : results.map(r => ({
        questionNumber: r.questionNumber,
        correct: r.correct
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz', error: error.message });
  }
});

// Get lessons for a course
router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId })
      .sort({ order: 1 });
    
    // If student or instructor, add completion status (all unlocked)
    if (req.user.role === 'student' || req.user.role === 'instructor') {
      const progress = await Progress.findOne({
        student: req.user.id,
        course: req.params.courseId
      });
      
      const lessonsWithStatus = lessons.map((lesson, index) => {
        const isCompleted = progress?.completedLessons.some(
          cl => cl.lesson.toString() === lesson._id.toString()
        );
        
        return {
          ...lesson.toObject(),
          isLocked: false,  // All lessons are accessible
          completed: isCompleted
        };
      });
      
      return res.json(lessonsWithStatus);
    }
    
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lessons', error: error.message });
  }
});

module.exports = router;
