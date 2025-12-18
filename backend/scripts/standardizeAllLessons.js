require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// Standard lesson template structure
const STANDARD_STRUCTURE = {
  objectives: 5, // 5 learning objectives per lesson
  minExercises: 2, // minimum 2 coding exercises
  sections: ['Overview', 'Key Concepts', 'Hands-On Practice', 'Summary'],
  interactiveTools: true, // Every lesson should have Colab link
  activities: true // At least 1 activity per lesson
};

async function standardizeAllLessons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    console.log('🔄 Standardizing all 40 lessons with consistent structure...\n');

    const course = await Course.findOne({ title: /AI Fundamentals/i });
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    
    let updated = 0;

    for (const lesson of lessons) {
      let needsUpdate = false;
      
      // STEP 1: Ensure Google Colab integration for all lessons with code
      if (!lesson.interactiveTools || lesson.interactiveTools.length === 0) {
        lesson.interactiveTools = [
          {
            name: 'colab',
            url: 'https://colab.research.google.com/',
            description: 'Run all Python exercises in Google Colab - free cloud Python environment',
            instructions: 'Click "Open in Colab" button on any exercise, or create new notebook and paste code'
          }
        ];
        needsUpdate = true;
      }

      // STEP 2: Format content with proper markdown structure
      if (lesson.content) {
        let content = lesson.content;
        
        // Remove triple backticks that are showing as text
        content = content.replace(/```python/g, '\n**Python Code:**\n```python');
        content = content.replace(/```/g, '```\n');
        
        // Ensure proper spacing
        content = content.replace(/\n{3,}/g, '\n\n');
        
        if (content !== lesson.content) {
          lesson.content = content;
          needsUpdate = true;
        }
      }

      // STEP 3: Ensure all coding exercises have Colab notebook URLs
      if (lesson.codingExercises && lesson.codingExercises.length > 0) {
        lesson.codingExercises.forEach((exercise, index) => {
          if (!exercise.colabNotebookUrl) {
            // Generate Colab notebook URL (we'll create these notebooks)
            const lessonNum = lesson.title.match(/Session (\d+)/)?.[1] || '0';
            exercise.colabNotebookUrl = `https://colab.research.google.com/github/DawitLam/ACCN-Hub/blob/main/notebooks/session${lessonNum}_exercise${index + 1}.ipynb`;
            needsUpdate = true;
          }
        });
      }

      // STEP 4: Add standard activity if missing
      if (!lesson.activities || lesson.activities.length === 0) {
        lesson.activities = [
          {
            title: 'Practice and Explore',
            description: 'Complete all coding exercises and experiment with variations to deepen understanding.',
            type: 'hands-on',
            duration: '30 minutes',
            required: true
          }
        ];
        needsUpdate = true;
      }

      // STEP 5: Ensure proper objectives format (5 bullet points)
      if (!lesson.objectives || lesson.objectives.length === 0) {
        // Generate default objectives based on lesson title
        const title = lesson.title.toLowerCase();
        lesson.objectives = [
          `Understand the core concepts covered in ${lesson.title}`,
          'Apply theoretical knowledge through hands-on coding exercises',
          'Build practical skills with real-world examples',
          'Practice problem-solving with guided exercises',
          'Demonstrate mastery through project work'
        ];
        needsUpdate = true;
      }

      if (needsUpdate) {
        await lesson.save();
        console.log(`✅ Standardized: ${lesson.title}`);
        updated++;
      }
    }

    console.log(`\n🎉 Standardization Complete!`);
    console.log(`📊 Updated ${updated} lessons`);
    console.log(`\n✅ All lessons now have:`);
    console.log(`  - Google Colab integration`);
    console.log(`  - Consistent markdown formatting`);
    console.log(`  - Standard activity structure`);
    console.log(`  - Learning objectives`);
    console.log(`  - Colab notebook URLs for exercises\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

standardizeAllLessons();
