require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');

async function checkLessonContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find Session 3
    const lesson = await Lesson.findOne({ title: 'Session 3' });
    
    if (lesson) {
      console.log('✅ Lesson Found!');
      console.log(`   Title: ${lesson.title}`);
      console.log(`   Content length: ${lesson.content.length} characters`);
      console.log('\n📄 First 500 characters of content:');
      console.log('---');
      console.log(lesson.content.substring(0, 500));
      console.log('---');
    } else {
      console.log('❌ Lesson NOT found!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkLessonContent();
