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
      required: true,
      select: false // Hide from default queries
    },
    explanation: {
      type: String,
      select: false // Only show after submission
    },
    points: {
      type: Number,
      default: 10
    }
  }],
  quizSettings: {
    maxAttempts: {
      type: Number,
      default: 3
    },
    timeLimit: {
      type: Number, // in minutes
      default: null
    },
    shuffleQuestions: {
      type: Boolean,
      default: false
    },
    shuffleOptions: {
      type: Boolean,
      default: true
    },
    showCorrectAnswers: {
      type: Boolean,
      default: true // Show after submission
    },
    passingScore: {
      type: Number,
      default: 70
    }
  },
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['video', 'document', 'link', 'other', 'colab', 'kaggle', 'interactive']
    },
    description: String
  }],
  // Coding exercises for hands-on practice
  codingExercises: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    starterCode: String,
    solution: {
      type: String,
      select: false // Hidden from students
    },
    testCases: [{
      input: String,
      expectedOutput: String,
      description: String
    }],
    hints: [String],
    colabNotebookUrl: String,
    points: {
      type: Number,
      default: 20
    }
  }],
  // Interactive tools integration
  interactiveTools: [{
    name: {
      type: String,
      enum: ['teachable_machine', 'tensorflow_playground', 'kaggle_notebook', 'colab', 'hugging_face', 'other']
    },
    url: String,
    description: String,
    instructions: String
  }],
  activities: [{
    title: String,
    description: String,
    type: {
      type: String,
      enum: ['individual', 'group', 'hands-on', 'discussion', 'project']
    },
    duration: String,
    required: {
      type: Boolean,
      default: false
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
    watchPercentage: {
      type: Number,
      default: 80 // % of video to watch
    },
    passQuiz: {
      type: Boolean,
      default: true
    },
    minimumScore: {
      type: Number,
      default: 70
    },
    completeActivities: {
      type: Boolean,
      default: false
    }
  },
  homework: {
    title: String,
    description: String,
    required: Boolean,
    dueDate: Date,
    submissionType: {
      type: String,
      enum: ['text', 'file', 'link', 'code']
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
