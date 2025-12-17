require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

async function checkUserRole() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const emails = ['dawitlg@gmail.com', 'dawitlambebo@gmail.com'];
    
    for (const email of emails) {
      const user = await User.findOne({ email });
      if (user) {
        console.log(`📧 Email: ${email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Name: ${user.firstName} ${user.lastName}`);
        console.log(`   Enrolled Courses: ${user.enrolledCourses.length}`);
        console.log('');
      } else {
        console.log(`❌ User not found: ${email}\n`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkUserRole();
