require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

async function testCourse() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const course = await Course.findOne({ title: /AI Fundamentals/i });
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    
    console.log('🧪 TESTING COURSE STRUCTURE\n');
    console.log('=' .repeat(60));

    // Test metrics
    let testsRun = 0;
    let testsPassed = 0;
    let testsFailed = 0;
    const issues = [];

    lessons.forEach((lesson, index) => {
      const sessionNum = index + 1;
      console.log(`\n📝 Testing Session ${sessionNum}: ${lesson.title}`);
      
      // Test 1: Has Google Colab integration
      testsRun++;
      if (lesson.interactiveTools && lesson.interactiveTools.length > 0) {
        const hasColab = lesson.interactiveTools.some(tool => tool.name === 'colab');
        if (hasColab) {
          console.log('  ✅ Google Colab integration: PASS');
          testsPassed++;
        } else {
          console.log('  ❌ Google Colab integration: FAIL');
          testsFailed++;
          issues.push(`Session ${sessionNum}: No Colab tool`);
        }
      } else {
        console.log('  ❌ Google Colab integration: FAIL (no tools)');
        testsFailed++;
        issues.push(`Session ${sessionNum}: No interactive tools`);
      }

      // Test 2: Has coding exercises
      testsRun++;
      if (lesson.codingExercises && lesson.codingExercises.length > 0) {
        console.log(`  ✅ Coding exercises: PASS (${lesson.codingExercises.length} exercises)`);
        testsPassed++;
        
        // Test 3: Each exercise has required fields
        lesson.codingExercises.forEach((exercise, exIndex) => {
          testsRun++;
          const hasRequired = exercise.title && exercise.starterCode && exercise.solution && exercise.points;
          if (hasRequired) {
            console.log(`    ✅ Exercise ${exIndex + 1}: "${exercise.title}" - ${exercise.points} points`);
            testsPassed++;
          } else {
            console.log(`    ❌ Exercise ${exIndex + 1}: Missing required fields`);
            testsFailed++;
            issues.push(`Session ${sessionNum}, Exercise ${exIndex + 1}: Missing fields`);
          }
        });
      } else {
        console.log('  ❌ Coding exercises: FAIL (no exercises)');
        testsFailed++;
        issues.push(`Session ${sessionNum}: No coding exercises`);
      }

      // Test 4: Has learning objectives
      testsRun++;
      if (lesson.objectives && lesson.objectives.length >= 3) {
        console.log(`  ✅ Learning objectives: PASS (${lesson.objectives.length} objectives)`);
        testsPassed++;
      } else {
        console.log(`  ❌ Learning objectives: FAIL`);
        testsFailed++;
        issues.push(`Session ${sessionNum}: Insufficient objectives`);
      }

      // Test 5: Has activities
      testsRun++;
      if (lesson.activities && lesson.activities.length > 0) {
        console.log(`  ✅ Activities: PASS (${lesson.activities.length} activities)`);
        testsPassed++;
      } else {
        console.log(`  ❌ Activities: FAIL`);
        testsFailed++;
        issues.push(`Session ${sessionNum}: No activities`);
      }
    });

    // Calculate total points
    const totalPoints = lessons.reduce((sum, lesson) => {
      const lessonPoints = lesson.codingExercises?.reduce((s, ex) => s + (ex.points || 0), 0) || 0;
      return sum + lessonPoints;
    }, 0);

    const totalExercises = lessons.reduce((sum, lesson) => {
      return sum + (lesson.codingExercises?.length || 0);
    }, 0);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 TEST SUMMARY\n');
    console.log(`Total Tests Run: ${testsRun}`);
    console.log(`✅ Passed: ${testsPassed} (${(testsPassed/testsRun*100).toFixed(1)}%)`);
    console.log(`❌ Failed: ${testsFailed} (${(testsFailed/testsRun*100).toFixed(1)}%)`);
    
    console.log('\n📈 COURSE STATISTICS\n');
    console.log(`Total Lessons: ${lessons.length}`);
    console.log(`Total Exercises: ${totalExercises}`);
    console.log(`Total Points: ${totalPoints}`);
    console.log(`Average Exercises per Lesson: ${(totalExercises/lessons.length).toFixed(1)}`);
    console.log(`Average Points per Lesson: ${(totalPoints/lessons.length).toFixed(1)}`);

    if (issues.length > 0) {
      console.log('\n⚠️  ISSUES FOUND:\n');
      issues.forEach(issue => console.log(`  • ${issue}`));
    } else {
      console.log('\n🎉 ALL TESTS PASSED! Course is ready for students.\n');
    }

    // Quick access test
    console.log('\n🔗 QUICK ACCESS TEST\n');
    console.log('To test in browser:');
    console.log('1. Go to http://localhost:3000');
    console.log('2. Login: dawitlg@gmail.com / dawit123');
    console.log('3. Click "AI Fundamentals Certification"');
    console.log('4. Open any Session (try Session 1, 10, 27, or 35)');
    console.log('5. Check for:');
    console.log('   - Coding Practice section with exercises');
    console.log('   - "Open in Colab" buttons');
    console.log('   - Show Solution toggles');
    console.log('   - Points display');
    console.log('   - Hints (expandable)\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Test Error:', error);
    process.exit(1);
  }
}

testCourse();
