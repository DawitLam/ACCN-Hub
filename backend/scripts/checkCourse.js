require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

async function checkCourse() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find AI course
    const aiCourse = await Course.findOne({ title: 'AI Fundamentals Certification' })
      .populate('instructor', 'firstName lastName email')
      .populate('lessons');
    
    if (aiCourse) {
      console.log('✅ AI Course Found!');
      console.log(`   Title: ${aiCourse.title}`);
      console.log(`   ID: ${aiCourse._id}`);
      console.log(`   Instructor: ${aiCourse.instructor.firstName} ${aiCourse.instructor.lastName} (${aiCourse.instructor.email})`);
      console.log(`   Lessons: ${aiCourse.lessons.length}`);
      console.log(`   Published: ${aiCourse.isPublished}`);
      
      if (aiCourse.lessons.length > 0) {
        console.log('\n📚 Sample Lessons:');
        aiCourse.lessons.slice(0, 5).forEach((lesson, i) => {
          console.log(`   ${i + 1}. ${lesson.title}`);
        });
      }
    } else {
      console.log('❌ AI Course NOT found!');
      console.log('\nChecking all courses in database...\n');
      
      const allCourses = await Course.find({});
      console.log(`Found ${allCourses.length} total courses:`);
      allCourses.forEach(course => {
        console.log(`   - ${course.title} (${course.lessons.length} lessons)`);
      });
      
      console.log('\n🔄 You need to run the seed script again:');
      console.log('   node backend/scripts/seedAICurriculum.js');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkCourse();
