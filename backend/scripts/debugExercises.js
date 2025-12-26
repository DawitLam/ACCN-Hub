/**
 * Debug script to check exercise data and identify issues
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');

async function debugExercises() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected\n');

        // Check a few sample lessons
        const sessions = [1, 2, 10, 27];
        
        for (const sessionNum of sessions) {
            const lesson = await Lesson.findOne({ title: new RegExp(`Session ${sessionNum}:`) });
            
            if (!lesson) {
                console.log(`⚠️ Session ${sessionNum} not found\n`);
                continue;
            }

            console.log(`\n📚 Session ${sessionNum}: ${lesson.title}`);
            console.log(`Exercises: ${lesson.codingExercises?.length || 0}`);
            
            if (lesson.codingExercises && lesson.codingExercises.length > 0) {
                lesson.codingExercises.forEach((ex, idx) => {
                    console.log(`\n  Exercise ${idx + 1}: ${ex.title}`);
                    console.log(`  - Difficulty: ${ex.difficulty}`);
                    console.log(`  - Points: ${ex.points}`);
                    console.log(`  - Has starter code: ${!!ex.starterCode} (${ex.starterCode?.length || 0} chars)`);
                    console.log(`  - Has solution: ${!!ex.solution} (${ex.solution?.length || 0} chars)`);
                    console.log(`  - Hints: ${ex.hints?.length || 0}`);
                    
                    // Show first 100 chars of starter code
                    if (ex.starterCode) {
                        console.log(`  - Starter code preview:`);
                        console.log(`    ${ex.starterCode.substring(0, 100)}...`);
                    }
                });
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log('✅ Debug complete');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

debugExercises();
