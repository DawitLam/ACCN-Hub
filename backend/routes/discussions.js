const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');
const { protect, authorize } = require('../middleware/auth');

// Get all discussions for a course
router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const discussions = await Discussion.find({ course: req.params.courseId })
      .populate('createdBy', 'firstName lastName')
      .populate('posts.author', 'firstName lastName')
      .populate('posts.replies.author', 'firstName lastName')
      .sort('-createdAt');
    
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discussions', error: error.message });
  }
});

// Get single discussion
router.get('/:id', protect, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate('createdBy', 'firstName lastName')
      .populate('posts.author', 'firstName lastName')
      .populate('posts.replies.author', 'firstName lastName');
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discussion', error: error.message });
  }
});

// Create discussion (instructors only)
router.post('/', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const discussion = await Discussion.create({
      ...req.body,
      createdBy: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Discussion created successfully',
      discussion
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating discussion', error: error.message });
  }
});

// Create post in discussion
router.post('/:id/posts', protect, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    if (discussion.isLocked) {
      return res.status(403).json({ message: 'Discussion is locked' });
    }
    
    discussion.posts.push({
      author: req.user.id,
      content: req.body.content,
      attachments: req.body.attachments || []
    });
    
    await discussion.save();
    await discussion.populate('posts.author', 'firstName lastName');
    
    const newPost = discussion.posts[discussion.posts.length - 1];
    
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: newPost
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

// Reply to post
router.post('/:id/posts/:postId/replies', protect, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    if (discussion.isLocked) {
      return res.status(403).json({ message: 'Discussion is locked' });
    }
    
    const post = discussion.posts.id(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.replies.push({
      author: req.user.id,
      content: req.body.content
    });
    
    await discussion.save();
    await discussion.populate('posts.replies.author', 'firstName lastName');
    
    res.json({
      success: true,
      message: 'Reply added successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding reply', error: error.message });
  }
});

// Like post
router.post('/:id/posts/:postId/like', protect, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    const post = discussion.posts.id(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Toggle like
    const likeIndex = post.likes.indexOf(req.user.id);
    
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(req.user.id);
    }
    
    await discussion.save();
    
    res.json({
      success: true,
      likes: post.likes.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error: error.message });
  }
});

// Pin post (instructors only)
router.patch('/:id/posts/:postId/pin', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    const post = discussion.posts.id(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.isPinned = !post.isPinned;
    await discussion.save();
    
    res.json({
      success: true,
      message: `Post ${post.isPinned ? 'pinned' : 'unpinned'} successfully`
    });
  } catch (error) {
    res.status(500).json({ message: 'Error pinning post', error: error.message });
  }
});

module.exports = router;
