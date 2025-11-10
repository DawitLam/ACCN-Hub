const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: [true, 'Lesson content is required']
  },
  videoUrl: {
    type: String
  },
  duration: {
    type: String,
    default: '30 minutes'
  },
  objectives: [{
    type: String
  }],
  materials: [{
    type: String
  }],
  quiz: [{
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number,
      required: true
    },
    explanation: {
      type: String
    },
    points: {
      type: Number,
      default: 10
    }
  }],
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['video', 'document', 'link', 'other']
    }
  }],
  isLocked: {
    type: Boolean,
    default: true
  },
  requiredCompletion: {
    readContent: {
      type: Boolean,
      default: true
    },
    watchVideo: {
      type: Boolean,
      default: false
    },
    passQuiz: {
      type: Boolean,
      default: true
    },
    minimumScore: {
      type: Number,
      default: 70
    }
  },
  points: {
    type: Number,
    default: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update timestamp on save
LessonSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Lesson', LessonSchema);
