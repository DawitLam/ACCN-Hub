const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');
const Progress = require('../models/Progress');
const { protect, authorize } = require('../middleware/auth');

// Track video progress
router.post('/video/progress', protect, authorize('student'), async (req, res) => {
  try {
    const { lessonId, courseId, watchedDuration, totalDuration, currentPosition } = req.body;
    
    const progress = await Progress.findOne({
      student: req.user.id,
      course: courseId
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    
    let lessonProgress = progress.completedLessons.find(
      cl => cl.lesson.toString() === lessonId
    );
    
    if (!lessonProgress) {
      lessonProgress = {
        lesson: lessonId,
        videoProgress: {}
      };
      progress.completedLessons.push(lessonProgress);
    }
    
    const watchPercentage = Math.round((watchedDuration / totalDuration) * 100);
    
    lessonProgress.videoProgress = {
      watchedDuration,
      totalDuration,
      watchPercentage,
      lastPosition: currentPosition,
      completedAt: watchPercentage >= 80 ? new Date() : lessonProgress.videoProgress?.completedAt
    };
    
    await progress.save();
    
    // Log video completion
    if (watchPercentage >= 80 && watchPercentage < 85) {
      await ActivityLog.logActivity({
        user: req.user.id,
        activityType: 'video_completed',
        course: courseId,
        lesson: lessonId,
        details: { watchPercentage, duration: watchedDuration },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
    }
    
    res.json({
      success: true,
      watchPercentage,
      completed: watchPercentage >= 80
    });
  } catch (error) {
    res.status(500).json({ message: 'Error tracking video progress', error: error.message });
  }
});

// Track resource click
router.post('/resource/click', protect, authorize('student'), async (req, res) => {
  try {
    const { lessonId, courseId, resourceUrl, resourceType, resourceTitle } = req.body;
    
    await ActivityLog.logActivity({
      user: req.user.id,
      activityType: 'resource_clicked',
      course: courseId,
      lesson: lessonId,
      details: { resourceUrl, resourceType, resourceTitle },
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error tracking resource click', error: error.message });
  }
});

// Track activity completion
router.post('/activity/complete', protect, authorize('student'), async (req, res) => {
  try {
    const { lessonId, courseId, activityId, activityTitle } = req.body;
    
    const progress = await Progress.findOne({
      student: req.user.id,
      course: courseId
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    
    let lessonProgress = progress.completedLessons.find(
      cl => cl.lesson.toString() === lessonId
    );
    
    if (!lessonProgress) {
      lessonProgress = {
        lesson: lessonId,
        activitiesCompleted: []
      };
      progress.completedLessons.push(lessonProgress);
    }
    
    // Check if already completed
    const alreadyCompleted = lessonProgress.activitiesCompleted?.some(
      ac => ac.activityId === activityId
    );
    
    if (!alreadyCompleted) {
      if (!lessonProgress.activitiesCompleted) {
        lessonProgress.activitiesCompleted = [];
      }
      lessonProgress.activitiesCompleted.push({
        activityId,
        completedAt: new Date()
      });
      
      await progress.save();
      
      await ActivityLog.logActivity({
        user: req.user.id,
        activityType: 'activity_completed',
        course: courseId,
        lesson: lessonId,
        details: { activityId, activityTitle },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error tracking activity', error: error.message });
  }
});

// Record attendance (for live sessions)
router.post('/attendance', protect, authorize('student'), async (req, res) => {
  try {
    const { courseId, duration, lessonsCovered } = req.body;
    
    const progress = await Progress.findOne({
      student: req.user.id,
      course: courseId
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    
    progress.attendance = progress.attendance || [];
    progress.attendance.push({
      date: new Date(),
      present: true,
      duration,
      lessonsCovered
    });
    
    // Calculate attendance percentage
    // For 10-day course
    const totalExpectedDays = 10;
    const attendedDays = progress.attendance.filter(a => a.present).length;
    progress.attendancePercentage = Math.round((attendedDays / totalExpectedDays) * 100);
    
    await progress.save();
    
    res.json({
      success: true,
      attendancePercentage: progress.attendancePercentage,
      daysAttended: attendedDays
    });
  } catch (error) {
    res.status(500).json({ message: 'Error recording attendance', error: error.message });
  }
});

// Get analytics for instructor
router.get('/analytics/course/:courseId', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const { startDate, endDate, activityType } = req.query;
    
    const query = { course: req.params.courseId };
    if (activityType) query.activityType = activityType;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    
    const activities = await ActivityLog.find(query)
      .populate('user', 'firstName lastName email')
      .sort({ timestamp: -1 })
      .limit(1000);
    
    // Calculate summary statistics
    const summary = {
      totalActivities: activities.length,
      uniqueStudents: [...new Set(activities.map(a => a.user?._id?.toString()))].length,
      byType: {}
    };
    
    activities.forEach(activity => {
      summary.byType[activity.activityType] = (summary.byType[activity.activityType] || 0) + 1;
    });
    
    res.json({ activities, summary });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

// Get student engagement report
router.get('/analytics/student/:studentId/course/:courseId', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const activities = await ActivityLog.find({
      user: req.params.studentId,
      course: req.params.courseId
    }).sort({ timestamp: 1 });
    
    const progress = await Progress.findOne({
      student: req.params.studentId,
      course: req.params.courseId
    });
    
    // Calculate engagement metrics
    const metrics = {
      totalActivities: activities.length,
      videosWatched: activities.filter(a => a.activityType === 'video_completed').length,
      resourcesAccessed: activities.filter(a => a.activityType === 'resource_clicked').length,
      quizzesTaken: activities.filter(a => a.activityType === 'quiz_submitted').length,
      activitiesCompleted: activities.filter(a => a.activityType === 'activity_completed').length,
      totalTimeSpent: progress?.completedLessons.reduce((sum, cl) => sum + (cl.timeSpent || 0), 0) || 0,
      lastActive: activities[activities.length - 1]?.timestamp,
      attendancePercentage: progress?.attendancePercentage || 0
    };
    
    res.json({ metrics, activities });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching engagement report', error: error.message });
  }
});

module.exports = router;
