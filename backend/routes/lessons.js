const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const { protect, authorize } = require('../middleware/auth');

// Get single lesson
router.get('/:id', protect, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course');
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    // Check if student has access (not locked)
    if (req.user.role === 'student') {
      const progress = await Progress.findOne({
        student: req.user.id,
        course: lesson.course._id
      });
      
      const course = await Course.findById(lesson.course._id).populate('lessons');
      const lessonIndex = course.lessons.findIndex(l => l._id.toString() === lesson._id.toString());
      
      // Check if lesson is locked
      if (lessonIndex > 0) {
        const previousLesson = course.lessons[lessonIndex - 1];
        const isPreviousCompleted = progress?.completedLessons.some(
          cl => cl.lesson.toString() === previousLesson._id.toString()
        );
        
        if (!isPreviousCompleted) {
          return res.status(403).json({ message: 'Complete previous lesson first' });
        }
      }
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
    const { answers } = req.body;
    const lesson = await Lesson.findById(req.params.id);
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    if (!lesson.quiz || lesson.quiz.length === 0) {
      return res.status(400).json({ message: 'This lesson has no quiz' });
    }
    
    // Calculate score
    let correctAnswers = 0;
    lesson.quiz.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / lesson.quiz.length) * 100);
    const passed = score >= (lesson.requiredCompletion.minimumScore || 70);
    
    // Update progress
    const progress = await Progress.findOne({
      student: req.user.id,
      course: lesson.course
    });
    
    if (progress) {
      const lessonProgress = progress.completedLessons.find(
        cl => cl.lesson.toString() === lesson._id.toString()
      );
      
      if (lessonProgress) {
        lessonProgress.quizScore = score;
        lessonProgress.quizAttempts += 1;
      } else {
        progress.completedLessons.push({
          lesson: lesson._id,
          quizScore: score,
          quizAttempts: 1
        });
      }
      
      await progress.save();
      
      // Log activity
      progress.activityLog.push({
        action: 'quiz_submitted',
        details: { lessonId: lesson._id, score, passed }
      });
      await progress.save();
    }
    
    res.json({
      success: true,
      score,
      passed,
      correctAnswers,
      totalQuestions: lesson.quiz.length
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
    
    // If student, check which lessons are locked
    if (req.user.role === 'student') {
      const progress = await Progress.findOne({
        student: req.user.id,
        course: req.params.courseId
      });
      
      const lessonsWithStatus = lessons.map((lesson, index) => {
        const isCompleted = progress?.completedLessons.some(
          cl => cl.lesson.toString() === lesson._id.toString()
        );
        
        // First lesson is always unlocked
        const isLocked = index === 0 ? false : 
          !progress?.completedLessons.some(
            cl => cl.lesson.toString() === lessons[index - 1]._id.toString()
          );
        
        return {
          ...lesson.toObject(),
          isLocked,
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
