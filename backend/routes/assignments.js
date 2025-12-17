const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const User = require('../models/User');
const Grade = require('../models/Grade');
const { protect, authorize } = require('../middleware/auth');

// Get all assignments for a course
router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const assignments = await Assignment.find({ course: req.params.courseId })
      .populate('createdBy', 'firstName lastName')
      .sort('dueDate');
    
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
});

// Get single assignment
router.get('/:id', protect, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('createdBy', 'firstName lastName')
      .populate('submissions.student', 'firstName lastName email')
      .populate('submissions.gradedBy', 'firstName lastName');
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // If student, only show their own submission
    if (req.user.role === 'student') {
      const mySubmission = assignment.submissions.find(
        sub => sub.student._id.toString() === req.user.id
      );
      
      return res.json({
        ...assignment.toObject(),
        submissions: mySubmission ? [mySubmission] : []
      });
    }
    
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignment', error: error.message });
  }
});

// Create assignment (instructors only)
router.post('/', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const assignment = await Assignment.create({
      ...req.body,
      createdBy: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      assignment
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment', error: error.message });
  }
});

// Update assignment (instructors only)
router.put('/:id', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Check ownership
    if (assignment.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this assignment' });
    }
    
    const updated = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Assignment updated successfully',
      assignment: updated
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating assignment', error: error.message });
  }
});

// Delete assignment (instructors only)
router.delete('/:id', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Check ownership
    if (assignment.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this assignment' });
    }
    
    await assignment.deleteOne();
    
    res.json({
      success: true,
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting assignment', error: error.message });
  }
});

// Submit assignment (students)
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      sub => sub.student.toString() === req.user.id
    );
    
    if (existingSubmission) {
      return res.status(400).json({ message: 'Assignment already submitted' });
    }
    
    // Check if late
    const now = new Date();
    const isLate = now > assignment.dueDate;
    
    if (isLate && !assignment.allowLateSubmission) {
      return res.status(400).json({ message: 'Late submissions are not allowed for this assignment' });
    }
    
    // Create submission
    assignment.submissions.push({
      student: req.user.id,
      submittedAt: now,
      files: req.body.files || [],
      content: req.body.content,
      status: isLate ? 'late' : 'submitted'
    });
    
    await assignment.save();
    
    res.json({
      success: true,
      message: 'Assignment submitted successfully',
      isLate
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting assignment', error: error.message });
  }
});

// Grade assignment (instructors only)
router.post('/:id/grade/:submissionId', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    const submission = assignment.submissions.id(req.params.submissionId);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    // Update submission grade
    submission.grade = req.body.grade;
    submission.feedback = req.body.feedback;
    submission.gradedAt = Date.now();
    submission.gradedBy = req.user.id;
    submission.status = 'graded';
    
    await assignment.save();
    
    // Update grade record
    let gradeRecord = await Grade.findOne({
      course: assignment.course,
      student: submission.student
    });
    
    if (!gradeRecord) {
      gradeRecord = await Grade.create({
        course: assignment.course,
        student: submission.student,
        gradeItems: []
      });
    }
    
    // Add or update grade item
    const existingItem = gradeRecord.gradeItems.find(
      item => item.itemId && item.itemId.toString() === assignment._id.toString()
    );
    
    if (existingItem) {
      existingItem.points = req.body.grade;
      existingItem.gradedAt = Date.now();
      existingItem.feedback = req.body.feedback;
    } else {
      gradeRecord.gradeItems.push({
        type: 'assignment',
        itemId: assignment._id,
        title: assignment.title,
        points: req.body.grade,
        maxPoints: assignment.points,
        category: 'Assignments',
        gradedAt: Date.now(),
        feedback: req.body.feedback
      });
    }
    
    gradeRecord.calculateOverallGrade();
    await gradeRecord.save();
    
    res.json({
      success: true,
      message: 'Assignment graded successfully',
      submission,
      overallGrade: gradeRecord.overallGrade
    });
  } catch (error) {
    res.status(500).json({ message: 'Error grading assignment', error: error.message });
  }
});

module.exports = router;
