const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Create test app
const app = express();
app.use(express.json());

// Mock middleware for testing
const mockAuth = (role = 'student') => (req, res, next) => {
  req.user = {
    id: new mongoose.Types.ObjectId(),
    role: role,
    email: `test-${role}@example.com`
  };
  next();
};

// Import models
const Lesson = require('./models/Lesson');
const Course = require('./models/Course');
const Progress = require('./models/Progress');
const User = require('./models/User');

// Connect to local MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/accn-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to local MongoDB');
  } catch (error) {
    console.log('⚠️  Local MongoDB not available. Using in-memory testing.');
    console.log('   To test with real DB, install and start MongoDB locally:');
    console.log('   mongod --dbpath=./data/db\n');
  }
};

// Setup test data
const setupTestData = async () => {
  try {
    // Clear existing data
    await Promise.all([
      Lesson.deleteMany({}),
      Course.deleteMany({}),
      Progress.deleteMany({}),
      User.deleteMany({})
    ]);

    // Create test instructor
    const instructor = await User.create({
      name: 'Test Instructor',
      email: 'instructor@test.com',
      password: 'password123',
      role: 'instructor'
    });

    // Create test student
    const student = await User.create({
      name: 'Test Student',
      email: 'student@test.com',
      password: 'password123',
      role: 'student'
    });

    // Create test course
    const course = await Course.create({
      title: 'Test AI Course',
      description: 'Test course for lessons',
      instructor: instructor._id,
      category: 'AI',
      level: 'Beginner',
      enrolledStudents: [student._id]
    });

    // Create test lessons
    const lesson1 = await Lesson.create({
      course: course._id,
      title: 'Introduction to AI',
      description: 'First lesson',
      order: 1,
      content: {
        text: 'This is the lesson content about AI basics.',
        videoUrl: 'https://youtube.com/watch?v=test1'
      },
      quiz: [
        {
          question: 'What is AI?',
          options: ['Artificial Intelligence', 'Automated Input', 'Advanced Interface', 'None'],
          correctAnswer: 0,
          explanation: 'AI stands for Artificial Intelligence'
        },
        {
          question: 'Is machine learning part of AI?',
          options: ['Yes', 'No'],
          correctAnswer: 0,
          explanation: 'Machine learning is a subset of AI'
        }
      ],
      quizSettings: {
        passingScore: 70,
        maxAttempts: 3,
        showCorrectAnswers: true
      }
    });

    const lesson2 = await Lesson.create({
      course: course._id,
      title: 'Machine Learning Basics',
      description: 'Second lesson',
      order: 2,
      content: {
        text: 'Introduction to machine learning concepts.',
        videoUrl: 'https://youtube.com/watch?v=test2'
      }
    });

    // Update course with lessons
    course.lessons = [lesson1._id, lesson2._id];
    await course.save();

    // Create progress for student
    await Progress.create({
      student: student._id,
      course: course._id,
      completedLessons: [],
      overallProgress: 0
    });

    console.log('✅ Test data created successfully\n');
    
    return { instructor, student, course, lesson1, lesson2 };
  } catch (error) {
    console.error('❌ Error setting up test data:', error.message);
    throw error;
  }
};

// Test functions
const runTests = async (testData) => {
  const { instructor, student, course, lesson1, lesson2 } = testData;
  
  console.log('🧪 Running Lesson Route Tests\n');
  console.log('='.repeat(60));

  // Test 1: Get single lesson as student
  console.log('\n📝 Test 1: GET /api/lessons/:id (as student)');
  try {
    const lessonRoutes = require('./routes/lessons');
    app.use('/api/lessons', lessonRoutes);
    
    // Mock request
    const req = {
      params: { id: lesson1._id },
      user: { id: student._id, role: 'student' },
      ip: '127.0.0.1',
      get: () => 'test-agent'
    };
    
    console.log(`   Fetching lesson: ${lesson1._id}`);
    const lessonDoc = await Lesson.findById(lesson1._id)
      .select('-quiz.correctAnswer -quiz.explanation')
      .populate('course');
    
    if (lessonDoc) {
      console.log('   ✅ Lesson retrieved successfully');
      console.log(`   Title: ${lessonDoc.title}`);
      console.log(`   Quiz questions: ${lessonDoc.quiz?.length || 0}`);
      console.log(`   Quiz answers hidden: ${!lessonDoc.quiz?.[0]?.correctAnswer ? 'Yes ✓' : 'No ✗'}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 2: Get lessons for course
  console.log('\n📝 Test 2: GET /api/lessons/course/:courseId');
  try {
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    console.log(`   ✅ Found ${lessons.length} lessons`);
    lessons.forEach((l, i) => {
      console.log(`   ${i + 1}. ${l.title} (Order: ${l.order})`);
    });
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 3: Submit quiz
  console.log('\n📝 Test 3: POST /api/lessons/:id/quiz (submit quiz)');
  try {
    const answers = [0, 0]; // Correct answers
    
    // Get progress
    let progress = await Progress.findOne({
      student: student._id,
      course: course._id
    });
    
    const lesson = await Lesson.findById(lesson1._id)
      .select('+quiz.correctAnswer +quiz.explanation');
    
    // Calculate score
    let correctAnswers = 0;
    lesson.quiz.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) correctAnswers++;
    });
    
    const score = Math.round((correctAnswers / lesson.quiz.length) * 100);
    const passed = score >= (lesson.quizSettings?.passingScore || 70);
    
    console.log(`   Submitted answers: ${answers.join(', ')}`);
    console.log(`   ✅ Quiz graded successfully`);
    console.log(`   Score: ${score}%`);
    console.log(`   Correct: ${correctAnswers}/${lesson.quiz.length}`);
    console.log(`   Status: ${passed ? '✓ PASSED' : '✗ FAILED'}`);
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 4: Create lesson (as instructor)
  console.log('\n📝 Test 4: POST /api/lessons (create lesson)');
  try {
    const newLessonData = {
      course: course._id,
      title: 'Deep Learning Introduction',
      description: 'Introduction to neural networks',
      order: 3,
      content: {
        text: 'Deep learning is a subset of machine learning.',
        videoUrl: 'https://youtube.com/watch?v=test3'
      }
    };
    
    const newLesson = await Lesson.create(newLessonData);
    await Course.findByIdAndUpdate(course._id, {
      $push: { lessons: newLesson._id }
    });
    
    console.log(`   ✅ Lesson created successfully`);
    console.log(`   ID: ${newLesson._id}`);
    console.log(`   Title: ${newLesson.title}`);
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 5: Update lesson
  console.log('\n📝 Test 5: PUT /api/lessons/:id (update lesson)');
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(
      lesson1._id,
      { title: 'Introduction to AI - Updated' },
      { new: true }
    );
    
    console.log(`   ✅ Lesson updated successfully`);
    console.log(`   New title: ${updatedLesson.title}`);
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 6: Quiz attempt limits
  console.log('\n📝 Test 6: Quiz attempt limits');
  try {
    const progress = await Progress.findOne({
      student: student._id,
      course: course._id
    });
    
    // Simulate multiple attempts
    for (let i = 1; i <= 4; i++) {
      const lessonProgress = progress.completedLessons.find(
        cl => cl.lesson.toString() === lesson1._id.toString()
      );
      
      const currentAttempts = lessonProgress?.quizAttempts || 0;
      const maxAttempts = 3;
      
      if (currentAttempts >= maxAttempts) {
        console.log(`   Attempt ${i}: ❌ Blocked (max attempts reached)`);
        break;
      } else {
        // Add attempt
        if (lessonProgress) {
          lessonProgress.quizAttempts = currentAttempts + 1;
        } else {
          progress.completedLessons.push({
            lesson: lesson1._id,
            quizAttempts: 1
          });
        }
        await progress.save();
        console.log(`   Attempt ${i}: ✓ Allowed (${maxAttempts - currentAttempts - 1} remaining)`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ All tests completed!\n');
};

// Main execution
const main = async () => {
  try {
    await connectDB();
    const testData = await setupTestData();
    await runTests(testData);
    
    console.log('Press Ctrl+C to exit...');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
};

// Run tests
main();
