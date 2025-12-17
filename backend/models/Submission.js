const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  submissionType: {
    type: String,
    enum: ['homework', 'project', 'activity', 'quiz'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  fileUrls: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['submitted', 'grading', 'graded', 'returned'],
    default: 'submitted'
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: {
    type: String
  },
  rubricScores: [{
    criterion: String,
    maxPoints: Number,
    earnedPoints: Number,
    feedback: String
  }],
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  gradedAt: {
    type: Date
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date
  },
  isLate: {
    type: Boolean,
    default: false
  },
  attemptNumber: {
    type: Number,
    default: 1
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Check if submission is late
SubmissionSchema.pre('save', function(next) {
  if (this.dueDate && this.submittedAt > this.dueDate) {
    this.isLate = true;
  }
  next();
});

module.exports = mongoose.model('Submission', SubmissionSchema);
