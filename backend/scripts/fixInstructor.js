require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function checkAndFixUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find all users
    const users = await User.find({});
    console.log(`Found ${users.length} users:\n`);
    
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
      console.log(`  Name: ${user.firstName} ${user.lastName}`);
      console.log(`  Active: ${user.isActive}`);
      console.log('');
    });

    // Check if dawit user exists
    let instructor = await User.findOne({ email: 'dawitlg@gmail.com' });
    
    if (instructor) {
      console.log('✅ Found instructor: dawitlg@gmail.com');
      console.log('🔄 Resetting password to: dawit123\n');
      
      // Hash new password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('dawit123', salt);
      
      // Update password
      instructor.password = hashedPassword;
      instructor.isActive = true;
      await instructor.save();
      
      console.log('✅ Password reset successfully!');
      console.log('\nLogin credentials:');
      console.log('  Email: dawitlg@gmail.com');
      console.log('  Password: dawit123');
    } else {
      console.log('⚠️  Instructor not found. Creating new one...\n');
      
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('dawit123', salt);
      
      instructor = await User.create({
        firstName: 'Dawit',
        lastName: 'LG',
        email: 'dawitlg@gmail.com',
        password: hashedPassword,
        role: 'instructor',
        isActive: true
      });
      
      console.log('✅ Instructor created!');
      console.log('\nLogin credentials:');
      console.log('  Email: dawitlg@gmail.com');
      console.log('  Password: dawit123');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkAndFixUser();
