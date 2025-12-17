require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

async function updateLessonTitles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find the AI course
    const course = await Course.findOne({ title: 'AI Fundamentals Certification' });
    if (!course) {
      console.log('❌ AI Course not found');
      process.exit(1);
    }

    console.log('📚 Found course:', course.title);
    console.log('   Course ID:', course._id);
    console.log('\n🔄 Updating lesson titles...\n');

    // Get all lessons for this course
    const lessons = await Lesson.find({ course: course._id }).sort('order');
    
    let updated = 0;
    for (const lesson of lessons) {
      const oldTitle = lesson.title;
      
      // Remove "Day X Session Y: " pattern and replace with "Session Y: "
      // Examples:
      // "Day 1 Session 1: What is AI?" -> "Session 1: What is AI?"
      // "Day 5 Session 3: Deep Learning" -> "Session 19: Deep Learning"
      
      let newTitle = oldTitle;
      const daySessionMatch = oldTitle.match(/Day (\d+) Session (\d+):/);
      
      if (daySessionMatch) {
        const day = parseInt(daySessionMatch[1]);
        const sessionOfDay = parseInt(daySessionMatch[2]);
        
        // Calculate overall session number: (day - 1) * 4 + sessionOfDay
        const overallSession = (day - 1) * 4 + sessionOfDay;
        
        // Replace with "Session X: "
        newTitle = oldTitle.replace(/Day \d+ Session \d+:/, `Session ${overallSession}:`);
        
        lesson.title = newTitle;
        await lesson.save();
        
        console.log(`✅ Lesson ${lesson.order}: "${oldTitle}" -> "${newTitle}"`);
        updated++;
      } else {
        console.log(`ℹ️  Lesson ${lesson.order}: "${oldTitle}" (no change needed)`);
      }
    }

    console.log(`\n✨ Updated ${updated} lesson titles!`);
    console.log('All lessons are now numbered as "Session 1", "Session 2", etc.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateLessonTitles();
