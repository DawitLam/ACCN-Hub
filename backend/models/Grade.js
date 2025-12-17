const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gradeItems: [{
    type: {
      type: String,
      enum: ['assignment', 'quiz', 'discussion', 'attendance', 'participation', 'exam', 'project'],
      required: true
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'gradeItems.type'
    },
    title: String,
    points: Number,
    maxPoints: Number,
    weight: {
      type: Number,
      default: 1
    },
    category: String,
    submittedAt: Date,
    gradedAt: Date,
    feedback: String,
    isExcused: {
      type: Boolean,
      default: false
    }
  }],
  categoryWeights: [{
    name: String,
    weight: Number
  }],
  overallGrade: {
    points: Number,
    percentage: Number,
    letterGrade: String
  },
  gradeHistory: [{
    date: Date,
    percentage: Number,
    letterGrade: String,
    note: String
  }],
  comments: String,
  lastCalculated: {
    type: Date,
    default: Date.now
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

gradeSchema.methods.calculateOverallGrade = function() {
  // Calculate based on category weights
  let totalPoints = 0;
  let totalMaxPoints = 0;
  
  this.gradeItems.forEach(item => {
    if (!item.isExcused && item.points !== undefined) {
      totalPoints += item.points * (item.weight || 1);
      totalMaxPoints += item.maxPoints * (item.weight || 1);
    }
  });
  
  const percentage = totalMaxPoints > 0 ? (totalPoints / totalMaxPoints) * 100 : 0;
  
  // Convert to letter grade
  let letterGrade = 'F';
  if (percentage >= 93) letterGrade = 'A';
  else if (percentage >= 90) letterGrade = 'A-';
  else if (percentage >= 87) letterGrade = 'B+';
  else if (percentage >= 83) letterGrade = 'B';
  else if (percentage >= 80) letterGrade = 'B-';
  else if (percentage >= 77) letterGrade = 'C+';
  else if (percentage >= 73) letterGrade = 'C';
  else if (percentage >= 70) letterGrade = 'C-';
  else if (percentage >= 67) letterGrade = 'D+';
  else if (percentage >= 63) letterGrade = 'D';
  else if (percentage >= 60) letterGrade = 'D-';
  
  this.overallGrade = {
    points: totalPoints,
    percentage: Math.round(percentage * 100) / 100,
    letterGrade
  };
  
  this.lastCalculated = Date.now();
  this.updatedAt = Date.now();
  
  return this.overallGrade;
};

gradeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Grade', gradeSchema);
