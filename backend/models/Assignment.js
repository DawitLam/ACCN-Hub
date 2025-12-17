const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['essay', 'multiple_choice', 'file_upload', 'coding', 'project', 'discussion'],
    default: 'essay'
  },
  points: {
    type: Number,
    default: 100
  },
  dueDate: {
    type: Date,
    required: true
  },
  allowLateSubmission: {
    type: Boolean,
    default: true
  },
  lateSubmissionPenalty: {
    type: Number,
    default: 10 // percentage per day
  },
  instructions: {
    type: String
  },
  rubric: [{
    criterion: String,
    points: Number,
    description: String
  }],
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    submittedAt: Date,
    files: [{
      name: String,
      url: String,
      type: String
    }],
    content: String,
    grade: Number,
    feedback: String,
    gradedAt: Date,
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['submitted', 'graded', 'returned', 'late'],
      default: 'submitted'
    }
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

assignmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Assignment', assignmentSchema);
