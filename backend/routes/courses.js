const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const Progress = require('../models/Progress');
const { protect, authorize } = require('../middleware/auth');

// Get all published courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate('instructor', 'firstName lastName')
      .populate('lessons');
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});

// Get courses by track
router.get('/track/:track', async (req, res) => {
  try {
    const courses = await Course.find({ 
      track: req.params.track,
      isPublished: true 
    })
      .populate('instructor', 'firstName lastName')
      .populate('lessons');
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});

// Get enrolled courses for current student
router.get('/enrolled', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'enrolledCourses',
        populate: [
          { path: 'instructor', select: 'firstName lastName' },
          { path: 'lessons' }
        ]
      });
    
    // Get progress for each course
    const coursesWithProgress = await Promise.all(
      user.enrolledCourses.map(async (course) => {
        const progress = await Progress.findOne({
          student: req.user.id,
          course: course._id
        });
        
        return {
          ...course.toObject(),
          progress: progress ? {
            completionPercentage: progress.completionPercentage,
            totalPoints: progress.totalPoints,
            completedLessons: progress.completedLessons.length
          } : null
        };
      })
    );
    
    res.json(coursesWithProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrolled courses', error: error.message });
  }
});

// Get courses created by instructor
router.get('/instructor/courses', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id })
      .populate('lessons')
      .populate('enrolledStudents', 'firstName lastName email');
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching instructor courses', error: error.message });
  }
});

// Get single course details
router.get('/:id', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'firstName lastName email')
      .populate('lessons');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // If student, check enrollment and get progress
    if (req.user.role === 'student' || req.user.role === 'instructor') {
      const progress = await Progress.findOne({
        student: req.user.id,
        course: course._id
      });
      
      // Mark lessons completion status (all unlocked)
      const lessonsWithStatus = course.lessons.map((lesson, index) => {
        const isCompleted = progress?.completedLessons.some(
          cl => cl.lesson.toString() === lesson._id.toString()
        );
        
        return {
          ...lesson.toObject(),
          isLocked: false,  // All lessons are accessible
          completed: isCompleted
        };
      });
      
      return res.json({
        ...course.toObject(),
        lessons: lessonsWithStatus,
        progress
      });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error: error.message });
  }
});

// Create new course (instructors only)
router.post('/', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      instructor: req.user.id
    };
    
    const course = await Course.create(courseData);
    
    // Add to instructor's created courses
    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdCourses: course._id }
    });
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
});

// Update course (instructors only)
router.put('/:id', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user owns the course
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }
    
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
});

// Delete course (instructors only)
router.delete('/:id', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user owns the course
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }
    
    await course.deleteOne();
    
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
});

// Enroll in course (allow both students and instructors to enroll)
router.post('/:id/enroll', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if already enrolled
    const user = await User.findById(req.user.id);
    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    // Add student to course
    await Course.findByIdAndUpdate(course._id, {
      $push: { enrolledStudents: req.user.id }
    });
    
    // Add course to student
    await User.findByIdAndUpdate(req.user.id, {
      $push: { enrolledCourses: course._id }
    });
    
    // Create progress record
    await Progress.create({
      student: req.user.id,
      course: course._id,
      currentLesson: course.lessons[0]
    });
    
    res.json({
      success: true,
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling in course', error: error.message });
  }
});

// Publish/Unpublish course
router.patch('/:id/publish', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user owns the course
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to publish this course' });
    }
    
    course.isPublished = !course.isPublished;
    await course.save();
    
    res.json({
      success: true,
      message: `Course ${course.isPublished ? 'published' : 'unpublished'} successfully`,
      course
    });
  } catch (error) {
    res.status(500).json({ message: 'Error publishing course', error: error.message });
  }
});

module.exports = router;
