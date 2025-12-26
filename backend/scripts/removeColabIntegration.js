/**
 * Remove Google Colab integration and prepare for embedded code editor
 * This script:
 * 1. Removes colabNotebookUrl from all exercises
 * 2. Removes Google Colab from interactiveTools
 * 3. Keeps other interactive tools (like Teachable Machine)
 */

require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const Lesson = require('../models/Lesson');

async function removeColabIntegration() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        console.log('🧹 Cleaning up Colab integration...\n');

        // Get all lessons
        const lessons = await Lesson.find({}).sort({ sessionNumber: 1 });
        console.log(`Found ${lessons.length} lessons to process\n`);

        let updatedCount = 0;
        let exercisesUpdated = 0;
        let toolsRemoved = 0;

        for (const lesson of lessons) {
            let modified = false;

            // Remove colabNotebookUrl from exercises
            if (lesson.codingExercises && lesson.codingExercises.length > 0) {
                lesson.codingExercises.forEach(exercise => {
                    if (exercise.colabNotebookUrl) {
                        delete exercise.colabNotebookUrl;
                        exercisesUpdated++;
                        modified = true;
                    }
                });
            }

            // Remove Colab from interactiveTools, keep others
            if (lesson.interactiveTools && lesson.interactiveTools.length > 0) {
                const beforeCount = lesson.interactiveTools.length;
                lesson.interactiveTools = lesson.interactiveTools.filter(tool => 
                    tool.name !== 'colab' && !tool.url.includes('colab.research.google.com')
                );
                const afterCount = lesson.interactiveTools.length;
                
                if (beforeCount !== afterCount) {
                    toolsRemoved += (beforeCount - afterCount);
                    modified = true;
                }
            }

            // Save if modified
            if (modified) {
                await lesson.save();
                updatedCount++;
                console.log(`✓ Session ${lesson.sessionNumber}: ${lesson.title}`);
                console.log(`  - Exercises cleaned: ${lesson.codingExercises?.length || 0}`);
                console.log(`  - Interactive tools remaining: ${lesson.interactiveTools?.length || 0}\n`);
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log('📊 CLEANUP SUMMARY');
        console.log('='.repeat(60));
        console.log(`✅ Lessons updated: ${updatedCount}`);
        console.log(`🗑️ Colab URLs removed: ${exercisesUpdated}`);
        console.log(`🧹 Colab tools removed: ${toolsRemoved}`);
        console.log('='.repeat(60));
        console.log('\n✨ Database cleaned! Ready for embedded code editor.\n');

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    } finally {
        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');
    }
}

// Run the cleanup
removeColabIntegration()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
