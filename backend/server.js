const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/database');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const { authRateLimiter, apiRateLimiter } = require('./middleware/rateLimiter');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const lessonRoutes = require('./routes/lessons');
const progressRoutes = require('./routes/progress');
const submissionRoutes = require('./routes/submissions');
const certificateRoutes = require('./routes/certificates');
const trackingRoutes = require('./routes/tracking');
const assignmentRoutes = require('./routes/assignments');
const discussionRoutes = require('./routes/discussions');
const announcementRoutes = require('./routes/announcements');
const gradeRoutes = require('./routes/grades');

// Initialize Express app
const app = express();

// Security middleware
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN'); // Changed from DENY to allow YouTube embeds
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // Content Security Policy for AI course resources
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.youtube.com https://www.google.com https://colab.research.google.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https: http:; " +
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://colab.research.google.com https://teachablemachine.withgoogle.com https://playground.tensorflow.org; " +
    "connect-src 'self' https://www.kaggle.com https://colab.research.google.com; " +
    "media-src 'self' https://www.youtube.com;"
  );
  
  next();
});

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body parsing middleware with limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/auth/login', authRateLimiter);
app.use('/api/auth/register', authRateLimiter);
app.use('/api', apiRateLimiter);

// Redirect root to the main learning hub page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/curriculum-viewer.html'));
});

// Serve static files from project root
app.use(express.static(path.join(__dirname, '..')));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/grades', gradeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', message: 'ACCN Hub server is running' });
});

// Serve curriculum markdown file specifically
app.get('/AI_CERTIFICATION_CURRICULUM.md', (req, res) => {
  res.sendFile(path.join(__dirname, '../AI_CERTIFICATION_CURRICULUM.md'));
});

// Serve curriculum from curriculum folder
app.get('/curriculum/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, '../curriculum', req.params.filename));
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Initialize database connection
connectDB();

// Export app for Vercel serverless
module.exports = app;

// Start server (only for local development, not Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
    logger.info(`Access at http://localhost:${PORT}`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection', { message: err.message, stack: err.stack });
  // Don't exit in development to see more errors
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', { message: err.message, stack: err.stack });
  // Don't exit in development to see more errors
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});
