require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

async function fixActivityTypes() {
  try {
    // Connect without strict validation temporarily
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const course = await Course.findOne({ title: /AI Fundamentals/i });
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    
    console.log('🔧 Fixing invalid activity types...\n');
    
    let fixed = 0;
    for (const lesson of lessons) {
      if (lesson.activities && lesson.activities.length > 0) {
        let changed = false;
        lesson.activities.forEach(activity => {
          if (activity.type === 'interactive' || activity.type === 'text' || activity.type === 'reading') {
            activity.type = 'hands-on';
            changed = true;
          } else if (!['individual', 'group', 'hands-on', 'discussion', 'project'].includes(activity.type)) {
            activity.type = 'individual';
            changed = true;
          }
        });
        
        if (changed) {
          await lesson.save();
          console.log(`✅ Fixed: ${lesson.title}`);
          fixed++;
        }
      }
    }
    
    console.log(`\n🎉 Fixed ${fixed} lessons\n`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixActivityTypes();
