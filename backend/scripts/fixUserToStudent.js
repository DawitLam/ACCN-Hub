require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

async function fixUserRoles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const emails = ['dawitlg@gmail.com', 'dawitlambebo@gmail.com'];
    
    console.log('📋 Current User Status:\n');
    
    for (const email of emails) {
      const user = await User.findOne({ email });
      if (user) {
        console.log(`📧 ${email}`);
        console.log(`   Current Role: ${user.role}`);
        
        // Change role to 'student' if it's currently 'instructor'
        if (user.role === 'instructor') {
          user.role = 'student';
          await user.save();
          console.log(`   ✅ Updated to: student`);
        } else {
          console.log(`   ℹ️  Already: ${user.role}`);
        }
        console.log('');
      }
    }
    
    console.log('\n✨ User roles updated!');
    console.log('You can now enroll in courses as a student.');
    console.log('\nNote: If you need instructor access later, we can create a separate instructor account.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixUserRoles();
