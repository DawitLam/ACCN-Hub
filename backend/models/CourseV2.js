const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  courseCode: {
    type: String,
    unique: true,
    sparse: true,
    uppercase: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  
  // Instructional Team
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coInstructors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  teachingAssistants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Course Classification
  track: {
    type: String,
    required: [true, 'Course track is required'],
    enum: ['Mechanical', 'Electrical', 'Coding', 'CAD', 'AI/ML', 'Data Science', 'Other']
  },
  category: {
    type: String,
    enum: ['academic', 'professional', 'certification', 'hobbyist'],
    default: 'professional'
  },
  
  // Content Organization
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  
  // Students
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  enrollmentLimit: {
    type: Number,
    default: null // null = unlimited
  },
  
  // Course Settings
  format: {
    type: String,
    enum: ['self_paced', 'scheduled', 'hybrid'],
    default: 'self_paced'
  },
  prerequisites: {
    type: String,
    default: 'None'
  },
  duration: {
    type: String,
    default: 'Self-paced'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  
  // Dates
  startDate: Date,
  endDate: Date,
  enrollmentStartDate: Date,
  enrollmentEndDate: Date,
  
  // Grading
  gradingScheme: {
    type: String,
    enum: ['points', 'percentage', 'letter', 'pass_fail'],
    default: 'percentage'
  },
  gradingCategories: [{
    name: String,
    weight: Number,
    dropLowest: {
      type: Number,
      default: 0
    }
  }],
  passingGrade: {
    type: Number,
    default: 60
  },
  
  // Course Features
  features: {
    discussions: {
      type: Boolean,
      default: true
    },
    assignments: {
      type: Boolean,
      default: true
    },
    quizzes: {
      type: Boolean,
      default: true
    },
    announcements: {
      type: Boolean,
      default: true
    },
    fileSharing: {
      type: Boolean,
      default: true
    },
    liveClasses: {
      type: Boolean,
      default: false
    },
    peerReview: {
      type: Boolean,
      default: false
    },
    certificates: {
      type: Boolean,
      default: false
    }
  },
  
  // Navigation
  navigation: {
    type: String,
    enum: ['sequential', 'free', 'prerequisite_based'],
    default: 'free'
  },
  
  // Visibility
  isPublished: {
    type: Boolean,
    default: false
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'public'
  },
  enrollmentType: {
    type: String,
    enum: ['open', 'approval_required', 'invite_only'],
    default: 'open'
  },
  
  // Media
  thumbnail: {
    type: String,
    default: '/assets/images/default-course.png'
  },
  banner: String,
  
  // Additional Info
  tags: [String],
  syllabus: String,
  learningOutcomes: [String],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-update timestamp
CourseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for enrollment count
CourseSchema.virtual('enrollmentCount').get(function() {
  return this.enrolledStudents.length;
});

// Virtual for is enrollment open
CourseSchema.virtual('isEnrollmentOpen').get(function() {
  const now = new Date();
  const enrollmentStartOk = !this.enrollmentStartDate || now >= this.enrollmentStartDate;
  const enrollmentEndOk = !this.enrollmentEndDate || now <= this.enrollmentEndDate;
  const limitOk = !this.enrollmentLimit || this.enrolledStudents.length < this.enrollmentLimit;
  
  return this.isPublished && enrollmentStartOk && enrollmentEndOk && limitOk;
});

module.exports = mongoose.model('Course', CourseSchema);
