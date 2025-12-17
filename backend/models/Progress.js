const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completedLessons: [{
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    quizScore: {
      type: Number,
      default: 0
    },
    quizAttempts: {
      type: Number,
      default: 0
    },
    quizHistory: [{
      attemptedAt: Date,
      score: Number,
      timeSpent: Number,
      answers: [Number]
    }],
    timeSpent: {
      type: Number,
      default: 0
    },
    videoProgress: {
      watchedDuration: Number, // seconds
      totalDuration: Number,
      watchPercentage: Number,
      lastPosition: Number,
      completedAt: Date
    },
    activitiesCompleted: [{
      activityId: String,
      completedAt: Date,
      submissionId: mongoose.Schema.Types.ObjectId
    }],
    homeworkSubmitted: {
      type: Boolean,
      default: false
    },
    homeworkScore: Number
  }],
  attendance: [{
    date: {
      type: Date,
      default: Date.now
    },
    present: {
      type: Boolean,
      default: true
    },
    duration: Number, // minutes
    lessonsCovered: [String]
  }],
  attendancePercentage: {
    type: Number,
    default: 0
  },
  currentLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  achievements: [{
    name: String,
    earnedAt: {
      type: Date,
      default: Date.now
    },
    description: String,
    icon: String
  }],
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  completionPercentage: {
    type: Number,
    default: 0
  },
  certificate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  },
  certificateTier: {
    type: String,
    enum: ['AI Literacy', 'AI Practitioner', 'AI Developer', 'Course Completion']
  },
  finalProject: {
    submitted: Boolean,
    submissionId: mongoose.Schema.Types.ObjectId,
    score: Number,
    rubricScores: mongoose.Schema.Types.Mixed
  },
  activityLog: [{
    action: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    details: {
      type: mongoose.Schema.Types.Mixed
    }
  }]
}, {
  timestamps: true
});

// Update last accessed time on any activity
ProgressSchema.pre('save', function(next) {
  this.lastAccessedAt = Date.now();
  next();
});

// Calculate completion percentage
ProgressSchema.methods.calculateCompletion = async function() {
  const course = await mongoose.model('Course').findById(this.course).populate('lessons');
  if (course && course.lessons.length > 0) {
    this.completionPercentage = Math.round((this.completedLessons.length / course.lessons.length) * 100);
  }
  return this.completionPercentage;
};

module.exports = mongoose.model('Progress', ProgressSchema);
