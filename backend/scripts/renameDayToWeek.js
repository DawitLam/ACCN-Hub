require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');

async function renameDayToWeek() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find all lessons with "Day" in their title
    const lessons = await Lesson.find({ title: /Day \d+/i });
    
    console.log(`Found ${lessons.length} lessons with "Day" in title\n`);

    let updated = 0;
    for (const lesson of lessons) {
      const oldTitle = lesson.title;
      const newTitle = oldTitle.replace(/Day (\d+)/gi, 'Week $1');
      
      if (newTitle !== oldTitle) {
        lesson.title = newTitle;
        await lesson.save();
        console.log(`✅ "${oldTitle}" → "${newTitle}"`);
        updated++;
      }
    }

    console.log(`\n✨ Updated ${updated} lesson titles from Day → Week`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

renameDayToWeek();
