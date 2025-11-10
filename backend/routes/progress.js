const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// Get student statistics
router.get('/stats', protect, authorize('student'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const progressRecords = await Progress.find({ student: req.user.id });
    
    let totalPoints = 0;
    let completedLessons = 0;
    let achievements = 0;
    
    progressRecords.forEach(progress => {
      totalPoints += progress.totalPoints || 0;
      completedLessons += progress.completedLessons.length;
      achievements += progress.achievements.length;
    });
    
    res.json({
      enrolledCourses: user.enrolledCourses.length,
      completedLessons,
      totalPoints,
      achievements
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

// Get progress for specific course
router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      student: req.user.id,
      course: req.params.courseId
    })
      .populate('completedLessons.lesson')
      .populate('currentLesson');
    
    if (!progress) {
      return res.status(404).json({ message: 'No progress found for this course' });
    }
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error: error.message });
  }
});

// Mark lesson as complete
router.post('/complete/:lessonId', protect, authorize('student'), async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    const progress = await Progress.findOne({
      student: req.user.id,
      course: lesson.course
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    
    // Check if already completed
    const alreadyCompleted = progress.completedLessons.some(
      cl => cl.lesson.toString() === lesson._id.toString()
    );
    
    if (alreadyCompleted) {
      return res.status(400).json({ message: 'Lesson already completed' });
    }
    
    // Add to completed lessons
    progress.completedLessons.push({
      lesson: lesson._id,
      completedAt: new Date()
    });
    
    // Add points
    progress.totalPoints += lesson.points || 100;
    
    // Update current lesson to next lesson
    const course = await Course.findById(lesson.course).populate('lessons');
    const currentIndex = course.lessons.findIndex(
      l => l._id.toString() === lesson._id.toString()
    );
    
    if (currentIndex < course.lessons.length - 1) {
      progress.currentLesson = course.lessons[currentIndex + 1]._id;
    }
    
    // Calculate completion percentage
    await progress.calculateCompletion();
    
    // Check for new achievements
    const newAchievements = [];
    
    // First lesson achievement
    if (progress.completedLessons.length === 1) {
      const achievement = {
        name: 'Getting Started',
        description: 'Completed your first lesson',
        icon: '🎯',
        earnedAt: new Date()
      };
      progress.achievements.push(achievement);
      newAchievements.push(achievement);
    }
    
    // Halfway achievement
    if (progress.completionPercentage >= 50 && progress.completionPercentage < 60) {
      const achievement = {
        name: 'Halfway There',
        description: 'Completed 50% of the course',
        icon: '⭐',
        earnedAt: new Date()
      };
      progress.achievements.push(achievement);
      newAchievements.push(achievement);
    }
    
    // Course completion achievement
    if (progress.completionPercentage === 100) {
      const achievement = {
        name: 'Course Complete',
        description: `Completed ${course.title}`,
        icon: '🏆',
        earnedAt: new Date()
      };
      progress.achievements.push(achievement);
      newAchievements.push(achievement);
      
      // Generate certificate
      progress.certificateIssued = true;
      progress.certificateIssuedAt = new Date();
      progress.certificateUrl = `/certificates/${req.user.id}_${course._id}.pdf`;
    }
    
    // Log activity
    progress.activityLog.push({
      action: 'lesson_completed',
      details: { lessonId: lesson._id, title: lesson.title }
    });
    
    await progress.save();
    
    res.json({
      success: true,
      message: 'Lesson completed successfully',
      progress: {
        completionPercentage: progress.completionPercentage,
        totalPoints: progress.totalPoints,
        completedLessons: progress.completedLessons.length
      },
      newAchievements,
      certificateIssued: progress.certificateIssued
    });
  } catch (error) {
    res.status(500).json({ message: 'Error completing lesson', error: error.message });
  }
});

// Log activity
router.post('/activity', protect, async (req, res) => {
  try {
    const { action, details } = req.body;
    
    // Find most recent progress record or create placeholder
    const progressRecords = await Progress.find({ student: req.user.id })
      .sort({ lastAccessedAt: -1 })
      .limit(1);
    
    if (progressRecords.length > 0) {
      const progress = progressRecords[0];
      progress.activityLog.push({
        action,
        details,
        timestamp: new Date()
      });
      await progress.save();
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error logging activity', error: error.message });
  }
});

// Get all progress records for a student (for instructor viewing)
router.get('/student/:studentId', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const progressRecords = await Progress.find({ student: req.params.studentId })
      .populate('course', 'title track')
      .populate('completedLessons.lesson', 'title');
    
    res.json(progressRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student progress', error: error.message });
  }
});

// Get all students' progress for a course (instructor)
router.get('/course/:courseId/students', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user owns the course
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this data' });
    }
    
    const progressRecords = await Progress.find({ course: req.params.courseId })
      .populate('student', 'firstName lastName email')
      .populate('completedLessons.lesson', 'title');
    
    res.json(progressRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course progress', error: error.message });
  }
});

// Reset progress for a student (admin only)
router.delete('/reset/:courseId', protect, authorize('admin'), async (req, res) => {
  try {
    const progress = await Progress.findOne({
      student: req.user.id,
      course: req.params.courseId
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    
    progress.completedLessons = [];
    progress.totalPoints = 0;
    progress.achievements = [];
    progress.completionPercentage = 0;
    progress.certificateIssued = false;
    
    const course = await Course.findById(req.params.courseId);
    progress.currentLesson = course.lessons[0];
    
    await progress.save();
    
    res.json({
      success: true,
      message: 'Progress reset successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting progress', error: error.message });
  }
});

// Get activity log for analytics
router.get('/analytics/activity', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const { courseId, startDate, endDate } = req.query;
    
    const query = {};
    if (courseId) query.course = courseId;
    
    const progressRecords = await Progress.find(query)
      .populate('student', 'firstName lastName')
      .select('student activityLog');
    
    // Filter by date if provided
    let activities = [];
    progressRecords.forEach(record => {
      record.activityLog.forEach(activity => {
        if (startDate && new Date(activity.timestamp) < new Date(startDate)) return;
        if (endDate && new Date(activity.timestamp) > new Date(endDate)) return;
        
        activities.push({
          student: record.student,
          ...activity.toObject()
        });
      });
    });
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity data', error: error.message });
  }
});

module.exports = router;
