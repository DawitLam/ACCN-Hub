// Minimal test server
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

console.log('Starting minimal server...');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10
}).then(() => {
  console.log('✅ MongoDB Connected');
}).catch(err => {
  console.error('❌ MongoDB Error:', err.message);
});

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.get('/api/courses', async (req, res) => {
  try {
    const Course = require('./models/Course');
    const courses = await Course.find({ isPublished: true })
      .populate('instructor', 'firstName lastName')
      .select('title description instructor duration difficulty');
    res.json(courses);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
});
