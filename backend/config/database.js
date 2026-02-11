const mongoose = require('mongoose');

/**
 * MongoDB Connection Configuration
 *
 * Deployment Modes:
 * - LOCAL (curriculum viewer only): MongoDB optional, works without database
 * - PRODUCTION (full LMS): MongoDB required for user accounts, progress tracking, certificates
 *
 * Environment Variables:
 * - MONGODB_URI: MongoDB connection string (Atlas or local)
 * - MONGODB_OPTIONAL: Set to 'true' for local curriculum viewing without LMS features
 */

const connectDB = async (retries = 3) => {
  // Check if MongoDB is optional (curriculum viewer mode)
  const isOptional = process.env.MONGODB_OPTIONAL === 'true';
  const mongoURI = process.env.MONGODB_URI;

  // If no URI provided and MongoDB is optional, skip connection
  if (!mongoURI && isOptional) {
    console.log('📚 Running in curriculum viewer mode (MongoDB optional)');
    console.log('ℹ️  LMS features (login, progress, certificates) disabled');
    console.log('ℹ️  To enable full LMS: Set MONGODB_URI in .env file\n');
    return null;
  }

  // If no URI but MongoDB is required (production), error
  if (!mongoURI) {
    console.error('\n❌ MONGODB_URI not found in environment variables');
    console.error('For local development: Set MONGODB_OPTIONAL=true in .env');
    console.error('For production: Set MONGODB_URI to your MongoDB Atlas connection string\n');
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    return null;
  }

  // Attempt MongoDB connection
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting MongoDB connection... (attempt ${i + 1}/${retries})`);

      const conn = await mongoose.connect(mongoURI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });

      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      console.log(`✅ Full LMS features enabled\n`);

      // Handle connection errors
      mongoose.connection.on('error', (err) => {
        console.error('Database connection error:', err.message);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('Database disconnected');
      });

      return conn;
    } catch (error) {
      console.error(`MongoDB connection failed (attempt ${i + 1}/${retries}): ${error.message}`);

      if (i === retries - 1) {
        console.error('\n❌ Could not connect to MongoDB after multiple attempts.');
        console.error('\nPossible issues:');
        console.error('1. Check your internet connection');
        console.error('2. Verify MongoDB Atlas IP whitelist includes your current IP (0.0.0.0/0 for all)');
        console.error('3. Check if MongoDB Atlas cluster is running');
        console.error('4. Verify MONGODB_URI format: mongodb+srv://username:password@cluster.mongodb.net/dbname');
        console.error('5. Ensure database user has read/write permissions\n');

        if (isOptional) {
          console.log('⚠️  Continuing without MongoDB (curriculum viewer mode only)\n');
          return null;
        } else {
          process.exit(1);
        }
      }

      // Wait before retry
      console.log(`Waiting 2 seconds before retry...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

module.exports = connectDB;
