require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');

async function checkEnrollment() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check course
    const course = await Course.findOne({ title: 'AI Fundamentals Certification' })
      .populate('lessons');
    
    if (!course) {
      console.log('❌ AI Course not found in database!\n');
      process.exit(1);
    }
    
    console.log('📚 Course Status:');
    console.log(`   Title: ${course.title}`);
    console.log(`   ID: ${course._id}`);
    console.log(`   Published: ${course.isPublished}`);
    console.log(`   Lessons: ${course.lessons.length}`);
    console.log(`   Enrolled Students: ${course.enrolledStudents.length}`);
    console.log('');

    // Check user
    const user = await User.findOne({ email: 'dawitlg@gmail.com' });
    
    if (!user) {
      console.log('❌ User not found!\n');
      process.exit(1);
    }
    
    console.log('👤 User Status:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Enrolled Courses: ${user.enrolledCourses.length}`);
    console.log('');

    // Check if enrolled
    const isEnrolled = user.enrolledCourses.some(
      id => id.toString() === course._id.toString()
    );
    
    console.log('📋 Enrollment Status:');
    if (isEnrolled) {
      console.log('   ✅ User IS enrolled in AI course');
      
      // Check progress
      const progress = await Progress.findOne({
        student: user._id,
        course: course._id
      });
      
      if (progress) {
        console.log('   ✅ Progress record exists');
        console.log(`   Completed Lessons: ${progress.completedLessons.length}`);
        console.log(`   Completion: ${progress.completionPercentage}%`);
      } else {
        console.log('   ⚠️  No progress record found');
        console.log('   Creating progress record...');
        
        await Progress.create({
          student: user._id,
          course: course._id,
          currentLesson: course.lessons[0]._id
        });
        
        console.log('   ✅ Progress record created');
      }
    } else {
      console.log('   ❌ User is NOT enrolled');
      console.log('\n🔧 Fixing enrollment...');
      
      // Add course to user's enrolled courses
      user.enrolledCourses.push(course._id);
      await user.save();
      console.log('   ✅ Added course to user enrolledCourses');
      
      // Add user to course's enrolled students
      if (!course.enrolledStudents.includes(user._id)) {
        course.enrolledStudents.push(user._id);
        await course.save();
        console.log('   ✅ Added user to course enrolledStudents');
      }
      
      // Create progress record
      await Progress.create({
        student: user._id,
        course: course._id,
        currentLesson: course.lessons[0]._id
      });
      console.log('   ✅ Created progress record');
      
      console.log('\n✨ Enrollment fixed! Refresh your browser.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkEnrollment();
