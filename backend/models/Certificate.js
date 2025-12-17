const mongoose = require('mongoose');
const crypto = require('crypto');

const CertificateSchema = new mongoose.Schema({
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
  verificationCode: {
    type: String,
    unique: true,
    required: true
  },
  tier: {
    type: String,
    enum: ['AI Literacy', 'AI Practitioner', 'AI Developer', 'Course Completion'],
    required: true
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  certificateUrl: {
    type: String
  },
  criteria: {
    attendancePercentage: Number,
    finalScore: Number,
    projectScore: Number,
    totalPoints: Number,
    completedLessons: Number,
    totalLessons: Number
  },
  metadata: {
    instructorName: String,
    courseDuration: String,
    skills: [String],
    issuerOrganization: String
  },
  isValid: {
    type: Boolean,
    default: true
  },
  revokedAt: {
    type: Date
  },
  revokedReason: {
    type: String
  }
}, {
  timestamps: true
});

// Generate verification code before saving
CertificateSchema.pre('save', function(next) {
  if (!this.verificationCode) {
    this.verificationCode = crypto.randomBytes(16).toString('hex').toUpperCase();
  }
  next();
});

// Method to generate certificate URL
CertificateSchema.methods.generateUrl = function() {
  this.certificateUrl = `/api/certificates/${this.verificationCode}/download`;
  return this.certificateUrl;
};

module.exports = mongoose.model('Certificate', CertificateSchema);
