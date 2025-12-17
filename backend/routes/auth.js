const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../middleware/validation');

const router = express.Router();

// Register new user
router.post('/register', registerValidation, async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    // Hash password with 12 salt rounds for enhanced security
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'student'
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error: error.message });
  }
});

// Login user
router.post('/login', loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    const ActivityLog = require('../models/ActivityLog');

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      // Log failed login attempt
      await ActivityLog.logActivity({
        user: null,
        activityType: 'login_failed',
        details: { email, reason: 'User not found' },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
      
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if account is active
    if (!user.isActive) {
      await ActivityLog.logActivity({
        user: user._id,
        activityType: 'login_failed',
        details: { email, reason: 'Account disabled' },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
      
      return res.status(403).json({ message: 'Your account has been disabled. Please contact support.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Log failed login attempt
      await ActivityLog.logActivity({
        user: user._id,
        activityType: 'login_failed',
        details: { email, reason: 'Invalid password' },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
      
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();
    
    // Log successful login
    await ActivityLog.logActivity({
      user: user._id,
      activityType: 'login_success',
      details: { email },
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { 
        expiresIn: process.env.JWT_EXPIRE || '7d',
        issuer: 'accn-hub',
        audience: 'accn-hub-users'
      }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

// Get current user profile
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorized. Please log in.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'accn-hub',
      audience: 'accn-hub-users'
    });
    const user = await User.findById(decoded.id)
      .populate('enrolledCourses')
      .populate('createdCourses');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        enrolledCourses: user.enrolledCourses,
        createdCourses: user.createdCourses
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile', error: error.message });
  }
});

// Logout (client-side token removal, server logs activity)
router.post('/logout', async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
