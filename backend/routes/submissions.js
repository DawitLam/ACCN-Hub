const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const ActivityLog = require('../models/ActivityLog');
const { protect, authorize } = require('../middleware/auth');

// Submit homework/project/activity
router.post('/', protect, authorize('student'), async (req, res) => {
  try {
    const { lessonId, courseId, submissionType, content, fileUrls, metadata } = req.body;
    
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    // Create submission
    const submission = await Submission.create({
      student: req.user.id,
      lesson: lessonId,
      course: courseId,
      submissionType,
      content,
      fileUrls: fileUrls || [],
      metadata
    });
    
    // Update progress
    const progress = await Progress.findOne({
      student: req.user.id,
      course: courseId
    });
    
    if (progress) {
      const lessonProgress = progress.completedLessons.find(
        cl => cl.lesson.toString() === lessonId
      );
      
      if (lessonProgress && submissionType === 'homework') {
        lessonProgress.homeworkSubmitted = true;
      }
      
      await progress.save();
    }
    
    // Log activity
    await ActivityLog.logActivity({
      user: req.user.id,
      activityType: submissionType === 'project' ? 'project_submitted' : 'homework_submitted',
      course: courseId,
      lesson: lessonId,
      details: { submissionId: submission._id, type: submissionType },
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });
    
    res.status(201).json({
      success: true,
      message: 'Submission created successfully',
      submission
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating submission', error: error.message });
  }
});

// Get student's submissions
router.get('/my-submissions', protect, authorize('student'), async (req, res) => {
  try {
    const { courseId, lessonId } = req.query;
    
    const query = { student: req.user.id };
    if (courseId) query.course = courseId;
    if (lessonId) query.lesson = lessonId;
    
    const submissions = await Submission.find(query)
      .populate('lesson', 'title')
      .populate('course', 'title')
      .sort({ submittedAt: -1 });
    
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
});

// Get submissions for grading (instructors)
router.get('/course/:courseId', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const submissions = await Submission.find({ course: req.params.courseId })
      .populate('student', 'firstName lastName email')
      .populate('lesson', 'title')
      .sort({ submittedAt: -1 });
    
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
});

// Grade submission
router.put('/:id/grade', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const { score, feedback, rubricScores } = req.body;
    
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    submission.score = score;
    submission.feedback = feedback;
    submission.rubricScores = rubricScores;
    submission.status = 'graded';
    submission.gradedBy = req.user.id;
    submission.gradedAt = new Date();
    
    await submission.save();
    
    // Update progress if final project
    if (submission.submissionType === 'project') {
      const progress = await Progress.findOne({
        student: submission.student,
        course: submission.course
      });
      
      if (progress) {
        progress.finalProject = {
          submitted: true,
          submissionId: submission._id,
          score,
          rubricScores
        };
        await progress.save();
      }
    }
    
    // Log activity
    await ActivityLog.logActivity({
      user: req.user.id,
      activityType: 'submission_graded',
      course: submission.course,
      lesson: submission.lesson,
      targetUser: submission.student,
      details: { submissionId: submission._id, score, type: submission.submissionType },
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });
    
    res.json({
      success: true,
      message: 'Submission graded successfully',
      submission
    });
  } catch (error) {
    res.status(500).json({ message: 'Error grading submission', error: error.message });
  }
});

module.exports = router;
