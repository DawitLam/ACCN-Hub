const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const { protect, authorize } = require('../middleware/auth');

// Get all announcements for a course
router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const announcements = await Announcement.find({ course: req.params.courseId })
      .populate('author', 'firstName lastName')
      .populate('comments.author', 'firstName lastName')
      .sort([['isPinned', -1], ['-createdAt']]);
    
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements', error: error.message });
  }
});

// Create announcement (instructors only)
router.post('/', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const announcement = await Announcement.create({
      ...req.body,
      author: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      announcement
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating announcement', error: error.message });
  }
});

// Mark announcement as read
router.post('/:id/read', protect, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    // Check if already read
    const alreadyRead = announcement.readBy.some(
      r => r.user.toString() === req.user.id
    );
    
    if (!alreadyRead) {
      announcement.readBy.push({
        user: req.user.id,
        readAt: Date.now()
      });
      
      await announcement.save();
    }
    
    res.json({
      success: true,
      message: 'Announcement marked as read'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error marking announcement as read', error: error.message });
  }
});

// Add comment to announcement
router.post('/:id/comments', protect, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    if (!announcement.allowComments) {
      return res.status(403).json({ message: 'Comments are not allowed on this announcement' });
    }
    
    announcement.comments.push({
      author: req.user.id,
      content: req.body.content
    });
    
    await announcement.save();
    await announcement.populate('comments.author', 'firstName lastName');
    
    res.json({
      success: true,
      message: 'Comment added successfully',
      comments: announcement.comments
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});

module.exports = router;
