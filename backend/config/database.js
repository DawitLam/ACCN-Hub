const mongoose = require('mongoose');

const connectDB = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting database connection... (attempt ${i + 1}/${retries})`);
      
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000, // Increased to 10 seconds
        socketTimeoutMS: 45000,
      });

      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      }
      
      // Handle connection errors
      mongoose.connection.on('error', (err) => {
        console.error('Database connection error:', err.message);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('Database disconnected');
      });

      return conn;
    } catch (error) {
      console.error(`Database connection failed (attempt ${i + 1}/${retries}): ${error.message}`);
      
      if (i === retries - 1) {
        console.error('\n❌ Could not connect to MongoDB after multiple attempts.');
        console.error('Possible issues:');
        console.error('1. Check your internet connection');
        console.error('2. Verify MongoDB Atlas IP whitelist includes your current IP');
        console.error('3. Check if MongoDB Atlas cluster is running');
        console.error('4. Verify MONGODB_URI in .env file\n');
        process.exit(1);
      }
      
      // Wait before retry
      console.log(`Waiting 2 seconds before retry...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

module.exports = connectDB;
