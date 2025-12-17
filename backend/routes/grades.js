const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const { protect, authorize } = require('../middleware/auth');

// Get grades for a student in a course
router.get('/course/:courseId/student/:studentId', protect, async (req, res) => {
  try {
    // Students can only view their own grades
    if (req.user.role === 'student' && req.user.id !== req.params.studentId) {
      return res.status(403).json({ message: 'Not authorized to view these grades' });
    }
    
    let gradeRecord = await Grade.findOne({
      course: req.params.courseId,
      student: req.params.studentId
    }).populate('student', 'firstName lastName email');
    
    if (!gradeRecord) {
      gradeRecord = await Grade.create({
        course: req.params.courseId,
        student: req.params.studentId,
        gradeItems: []
      });
    }
    
    // Calculate current grade
    gradeRecord.calculateOverallGrade();
    await gradeRecord.save();
    
    res.json(gradeRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grades', error: error.message });
  }
});

// Get my grades for a course
router.get('/course/:courseId/my-grades', protect, async (req, res) => {
  try {
    let gradeRecord = await Grade.findOne({
      course: req.params.courseId,
      student: req.user.id
    });
    
    if (!gradeRecord) {
      gradeRecord = await Grade.create({
        course: req.params.courseId,
        student: req.user.id,
        gradeItems: []
      });
    }
    
    // Calculate current grade
    gradeRecord.calculateOverallGrade();
    await gradeRecord.save();
    
    res.json(gradeRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grades', error: error.message });
  }
});

// Get all grades for a course (instructors only)
router.get('/course/:courseId/all', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const grades = await Grade.find({ course: req.params.courseId })
      .populate('student', 'firstName lastName email')
      .sort('student.lastName');
    
    // Calculate grades for all
    for (const grade of grades) {
      grade.calculateOverallGrade();
      await grade.save();
    }
    
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grades', error: error.message });
  }
});

// Update grade item (instructors only)
router.put('/course/:courseId/student/:studentId/item/:itemId', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const gradeRecord = await Grade.findOne({
      course: req.params.courseId,
      student: req.params.studentId
    });
    
    if (!gradeRecord) {
      return res.status(404).json({ message: 'Grade record not found' });
    }
    
    const item = gradeRecord.gradeItems.id(req.params.itemId);
    
    if (!item) {
      return res.status(404).json({ message: 'Grade item not found' });
    }
    
    // Update fields
    if (req.body.points !== undefined) item.points = req.body.points;
    if (req.body.feedback !== undefined) item.feedback = req.body.feedback;
    if (req.body.isExcused !== undefined) item.isExcused = req.body.isExcused;
    
    item.gradedAt = Date.now();
    
    // Recalculate overall grade
    gradeRecord.calculateOverallGrade();
    await gradeRecord.save();
    
    res.json({
      success: true,
      message: 'Grade updated successfully',
      gradeRecord
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating grade', error: error.message });
  }
});

// Export grades as CSV (instructors only)
router.get('/course/:courseId/export', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const grades = await Grade.find({ course: req.params.courseId })
      .populate('student', 'firstName lastName email')
      .sort('student.lastName');
    
    // Generate CSV
    let csv = 'Student Name,Email,Overall Percentage,Letter Grade,Total Points\n';
    
    for (const grade of grades) {
      grade.calculateOverallGrade();
      csv += `"${grade.student.firstName} ${grade.student.lastName}",`;
      csv += `${grade.student.email},`;
      csv += `${grade.overallGrade.percentage},`;
      csv += `${grade.overallGrade.letterGrade},`;
      csv += `${grade.overallGrade.points}\n`;
    }
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=grades.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting grades', error: error.message });
  }
});

module.exports = router;
