const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false  // Optional for failed login attempts (user not found)
  },
  activityType: {
    type: String,
    enum: [
      // Student activities
      'video_started', 'video_paused', 'video_completed', 'video_progress',
      'resource_clicked', 'resource_downloaded',
      'lesson_viewed', 'lesson_completed',
      'quiz_started', 'quiz_submitted', 'quiz_passed', 'quiz_failed',
      'homework_submitted', 'project_submitted',
      'activity_started', 'activity_completed',
      'course_enrolled', 'course_completed',
      'certificate_earned',
      // Instructor activities
      'course_created', 'course_updated', 'course_deleted', 'course_published',
      'lesson_created', 'lesson_updated', 'lesson_deleted',
      'submission_graded', 'grade_modified',
      'student_progress_viewed', 'student_data_exported',
      // Security events
      'login_success', 'login_failed', 'logout',
      'permission_denied', 'suspicious_activity',
      'password_changed', 'account_updated'
    ],
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  sessionId: {
    type: String
  },
  duration: {
    type: Number // in seconds
  }
}, {
  timestamps: false
});

// Index for efficient querying
ActivityLogSchema.index({ user: 1, timestamp: -1 });
ActivityLogSchema.index({ course: 1, timestamp: -1 });
ActivityLogSchema.index({ activityType: 1, timestamp: -1 });

// Static method to log activity
ActivityLogSchema.statics.logActivity = async function(data) {
  try {
    return await this.create(data);
  } catch (error) {
    console.error('Error logging activity:', error);
    // Don't throw error - logging failure shouldn't break app
    return null;
  }
};

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
