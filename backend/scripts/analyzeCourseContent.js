require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

async function analyzeCourse() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const course = await Course.findOne({ title: /AI Fundamentals/i });
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    
    console.log('📊 COURSE CONTENT ANALYSIS\n');
    console.log(`Total Sessions: ${lessons.length}\n`);
    
    let pythonSessions = 0;
    let aiSessions = 0;
    let projectSessions = 0;
    let totalMinutes = 0;
    let totalExercises = 0;
    let totalPoints = 0;
    
    console.log('📋 SESSION BREAKDOWN:\n');
    
    lessons.forEach((lesson, index) => {
      const duration = lesson.duration || '45 minutes';
      const minutes = parseInt(duration) || 45;
      totalMinutes += minutes;
      
      const exerciseCount = lesson.codingExercises?.length || 0;
      totalExercises += exerciseCount;
      
      const points = lesson.codingExercises?.reduce((sum, ex) => sum + (ex.points || 0), 0) || 0;
      totalPoints += points;
      
      // Categorize content
      const title = lesson.title.toLowerCase();
      const content = lesson.content?.toLowerCase() || '';
      
      let category = '';
      if (title.includes('python') || title.includes('variable') || title.includes('loop') || 
          title.includes('function') || title.includes('control flow') || title.includes('quiz game')) {
        pythonSessions++;
        category = '[PYTHON]';
      } else if (title.includes('project') || title.includes('build') || title.includes('data analysis')) {
        projectSessions++;
        category = '[PROJECT]';
      } else if (title.includes('ai') || title.includes('machine learning') || title.includes('neural') ||
                 content.includes('artificial intelligence') || content.includes('machine learning')) {
        aiSessions++;
        category = '[AI]';
      }
      
      console.log(`${index + 1}. ${lesson.title}`);
      console.log(`   ${category} Duration: ${duration} | Exercises: ${exerciseCount} | Points: ${points}`);
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('📈 SUMMARY:\n');
    
    console.log(`Python Foundation Sessions: ${pythonSessions}`);
    console.log(`AI Concept Sessions: ${aiSessions}`);
    console.log(`Project-Based Sessions: ${projectSessions}`);
    console.log(`Other/Uncategorized: ${lessons.length - pythonSessions - aiSessions - projectSessions}\n`);
    
    console.log(`Total Duration: ${totalMinutes} minutes (${(totalMinutes/60).toFixed(1)} hours)`);
    console.log(`Total Coding Exercises: ${totalExercises}`);
    console.log(`Total Points Available: ${totalPoints}\n`);
    
    console.log('⏱️  TIME ESTIMATES:\n');
    console.log(`Watching Videos: ${(totalMinutes/60).toFixed(1)} hours`);
    console.log(`Coding Exercises (2x video time): ${(totalMinutes/30).toFixed(1)} hours`);
    console.log(`Projects & Practice: ~${projectSessions * 2} hours`);
    console.log(`Review & Knowledge Checks: ~${lessons.length * 0.25} hours`);
    
    const totalHours = (totalMinutes/60) + (totalMinutes/30) + (projectSessions * 2) + (lessons.length * 0.25);
    console.log(`\n🎓 TOTAL COURSE TIME: ~${Math.round(totalHours)} hours (${Math.round(totalHours/5)} weeks @ 5hrs/week)\n`);
    
    console.log('✅ COVERAGE CHECK:\n');
    console.log(`✓ Python Fundamentals: ${pythonSessions > 0 ? 'YES' : 'NO'} (${pythonSessions} sessions)`);
    console.log(`✓ AI Concepts: ${aiSessions > 0 ? 'YES' : 'NO'} (${aiSessions} sessions)`);
    console.log(`✓ Practical Projects: ${projectSessions > 0 ? 'YES' : 'NO'} (${projectSessions} sessions)`);
    console.log(`✓ Hands-on Coding: ${totalExercises > 0 ? 'YES' : 'NO'} (${totalExercises} exercises)\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

analyzeCourse();
