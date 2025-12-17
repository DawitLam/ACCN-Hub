const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const Progress = require('../models/Progress');
const Course = require('../models/Course');
const ActivityLog = require('../models/ActivityLog');
const { protect, authorize } = require('../middleware/auth');

// Calculate certification tier based on performance
function calculateCertificationTier(progress, courseData) {
  const { attendancePercentage, completedLessons, totalPoints, finalProject } = progress;
  const totalLessons = courseData.lessons.length;
  const completionRate = (completedLessons.length / totalLessons) * 100;
  
  // Calculate average quiz score
  let totalQuizScore = 0;
  let quizCount = 0;
  completedLessons.forEach(cl => {
    if (cl.quizScore) {
      totalQuizScore += cl.quizScore;
      quizCount++;
    }
  });
  const avgQuizScore = quizCount > 0 ? totalQuizScore / quizCount : 0;
  
  // Determine tier based on AI curriculum criteria
  if (completionRate === 100 && finalProject?.score >= 85 && avgQuizScore >= 85 && attendancePercentage >= 90) {
    return 'AI Developer';
  } else if (completionRate >= 90 && finalProject?.score >= 75 && avgQuizScore >= 75 && attendancePercentage >= 85) {
    return 'AI Practitioner';
  } else if (completionRate >= 80 && avgQuizScore >= 70 && attendancePercentage >= 80) {
    return 'AI Literacy';
  } else if (completionRate === 100) {
    return 'Course Completion';
  }
  
  return null; // Not eligible for certification
}

// Issue certificate
router.post('/issue/:courseId', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const { studentId } = req.body;
    const courseId = req.params.courseId;
    
    // Get progress and course data
    const progress = await Progress.findOne({
      student: studentId,
      course: courseId
    });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    
    const course = await Course.findById(courseId)
      .populate('lessons')
      .populate('instructor', 'firstName lastName');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Calculate tier
    const tier = calculateCertificationTier(progress, course);
    
    if (!tier) {
      return res.status(400).json({ 
        message: 'Student does not meet certification requirements',
        details: {
          completionPercentage: progress.completionPercentage,
          attendancePercentage: progress.attendancePercentage,
          finalProjectScore: progress.finalProject?.score
        }
      });
    }
    
    // Check if certificate already exists
    const existingCert = await Certificate.findOne({
      student: studentId,
      course: courseId
    });
    
    if (existingCert && existingCert.isValid) {
      return res.status(400).json({ 
        message: 'Certificate already issued',
        certificate: existingCert
      });
    }
    
    // Create certificate
    const certificate = await Certificate.create({
      student: studentId,
      course: courseId,
      tier,
      criteria: {
        attendancePercentage: progress.attendancePercentage,
        finalScore: progress.finalProject?.score,
        projectScore: progress.finalProject?.score,
        totalPoints: progress.totalPoints,
        completedLessons: progress.completedLessons.length,
        totalLessons: course.lessons.length
      },
      metadata: {
        instructorName: `${course.instructor.firstName} ${course.instructor.lastName}`,
        courseDuration: course.duration,
        skills: course.tags,
        issuerOrganization: 'ACCN Hub - Umoja Robotics'
      }
    });
    
    // Generate URL
    certificate.generateUrl();
    await certificate.save();
    
    // Update progress
    progress.certificate = certificate._id;
    progress.certificateTier = tier;
    await progress.save();
    
    // Log activity
    await ActivityLog.logActivity({
      user: req.user.id,
      activityType: 'certificate_earned',
      course: courseId,
      targetUser: studentId,
      details: { certificateId: certificate._id, tier, verificationCode: certificate.verificationCode },
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });
    
    res.status(201).json({
      success: true,
      message: 'Certificate issued successfully',
      certificate
    });
  } catch (error) {
    res.status(500).json({ message: 'Error issuing certificate', error: error.message });
  }
});

// Verify certificate (public endpoint)
router.get('/verify/:verificationCode', async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ 
      verificationCode: req.params.verificationCode.toUpperCase(),
      isValid: true 
    })
      .populate('student', 'firstName lastName')
      .populate('course', 'title description');
    
    if (!certificate) {
      return res.status(404).json({ 
        valid: false,
        message: 'Certificate not found or has been revoked' 
      });
    }
    
    res.json({
      valid: true,
      certificate: {
        studentName: `${certificate.student.firstName} ${certificate.student.lastName}`,
        courseName: certificate.course.title,
        tier: certificate.tier,
        issuedAt: certificate.issuedAt,
        verificationCode: certificate.verificationCode,
        organization: certificate.metadata.issuerOrganization,
        skills: certificate.metadata.skills
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying certificate', error: error.message });
  }
});

// Get student certificates
router.get('/my-certificates', protect, authorize('student'), async (req, res) => {
  try {
    const certificates = await Certificate.find({ 
      student: req.user.id,
      isValid: true 
    })
      .populate('course', 'title thumbnail')
      .sort({ issuedAt: -1 });
    
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificates', error: error.message });
  }
});

// Revoke certificate (admin only)
router.put('/:id/revoke', protect, authorize('admin'), async (req, res) => {
  try {
    const { reason } = req.body;
    
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    certificate.isValid = false;
    certificate.revokedAt = new Date();
    certificate.revokedReason = reason;
    await certificate.save();
    
    res.json({
      success: true,
      message: 'Certificate revoked successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error revoking certificate', error: error.message });
  }
});

module.exports = router;
