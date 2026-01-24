/**
 * Seed AI Certification Curriculum into Database
 * Parses the markdown curriculum and creates courses, modules, and lessons
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const User = require('../models/User');

// Parse markdown curriculum
function parseCurriculum(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    const curriculum = {
        title: 'AI Fundamentals Certification',
        description: '10-Day Intensive Program | 30 Contact Hours',
        days: []
    };
    
    let currentDay = null;
    let currentSession = null;
    let currentContent = [];
    let inCodeBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Detect code blocks
        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            currentContent.push(line);
            continue;
        }
        
        // Day headers (# DAY 1:, # DAY 2:, etc.)
        if (line.match(/^# DAY \d+:/)) {
            // Save previous session
            if (currentSession && currentDay) {
                currentSession.content = currentContent.join('\n');
                currentDay.sessions.push(currentSession);
                currentContent = [];
            }
            
            // Save previous day
            if (currentDay) {
                curriculum.days.push(currentDay);
            }
            
            // Start new day
            const dayMatch = line.match(/^# DAY (\d+): (.+)/);
            currentDay = {
                dayNumber: parseInt(dayMatch[1]),
                title: dayMatch[2].trim(),
                sessions: [],
                duration: '3 hours',
                focus: ''
            };
            currentSession = null;
        }
        // Session headers (## Session X.X:)
        else if (line.match(/^## Session \d+\.\d+:/)) {
            // Save previous session
            if (currentSession && currentDay) {
                currentSession.content = currentContent.join('\n');
                currentDay.sessions.push(currentSession);
                currentContent = [];
            }
            
            // Start new session
            const sessionMatch = line.match(/^## Session (\d+\.\d+): (.+)/);
            currentSession = {
                sessionNumber: sessionMatch[1],
                title: sessionMatch[2].trim(),
                content: '',
                learningObjectives: [],
                activities: []
            };
        }
        // Focus line
        else if (line.startsWith('**Focus:**') && currentDay && !currentDay.focus) {
            currentDay.focus = line.replace('**Focus:**', '').trim();
        }
        // Learning objectives
        else if (line.startsWith('### Learning Objectives') && currentSession) {
            // Next few lines are objectives
            let j = i + 1;
            while (j < lines.length && lines[j].startsWith('-')) {
                currentSession.learningObjectives.push(lines[j].substring(2).trim());
                j++;
            }
        }
        // Add to current content
        else if (currentSession) {
            currentContent.push(line);
        }
    }
    
    // Save last session and day
    if (currentSession && currentDay) {
        currentSession.content = currentContent.join('\n');
        currentDay.sessions.push(currentSession);
    }
    if (currentDay) {
        curriculum.days.push(currentDay);
    }
    
    return curriculum;
}

// Create lessons from curriculum
async function seedCurriculum() {
    try {
        console.log('🚀 Starting AI Curriculum Seed...\n');
        
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');
        
        // Find or create instructor
        let instructor = await User.findOne({ email: 'instructor@accn.edu' });
        if (!instructor) {
            instructor = await User.create({
                name: 'AI Instructor',
                email: 'instructor@accn.edu',
                password: 'instructor123',
                role: 'instructor'
            });
            console.log('✅ Created instructor account\n');
        }
        
        // Parse curriculum
        const curriculumPath = path.join(__dirname, '../../curriculum/AI_CERTIFICATION_CURRICULUM.md');
        console.log(`📖 Parsing curriculum from: ${curriculumPath}\n`);
        
        const curriculum = parseCurriculum(curriculumPath);
        console.log(`✅ Parsed ${curriculum.days.length} days of curriculum\n`);
        
        // Delete existing AI course if any
        await Course.deleteOne({ title: curriculum.title });
        await Lesson.deleteMany({ course: { $exists: true } }); // Clean up orphaned lessons
        
        // Create main course
        const course = await Course.create({
            title: curriculum.title,
            description: curriculum.description,
            instructor: instructor._id,
            category: 'Artificial Intelligence',
            level: 'Beginner',
            duration: '30 hours',
            syllabus: 'Complete 10-day intensive program covering AI fundamentals, machine learning, deep learning, and practical applications.',
            prerequisites: ['Basic computer literacy', 'No coding experience required'],
            learningOutcomes: [
                'Define AI, Machine Learning, and Deep Learning',
                'Build machine learning models using Python',
                'Analyze datasets with Pandas',
                'Train neural networks with TensorFlow',
                'Apply ethical AI principles',
                'Create portfolio-worthy AI projects',
                'Deploy AI applications'
            ],
            isPublished: true,
            lessons: []
        });
        
        console.log(`✅ Created course: ${course.title}\n`);
        console.log('📝 Creating lessons...\n');
        
        let lessonOrder = 0;
        
        // Create lessons for each day and session
        for (const day of curriculum.days) {
            console.log(`   Day ${day.dayNumber}: ${day.title}`);
            
            for (const session of day.sessions) {
                lessonOrder++;
                
                const lessonTitle = `Day ${day.dayNumber}.${session.sessionNumber}: ${session.title}`;
                
                const lesson = await Lesson.create({
                    course: course._id,
                    title: lessonTitle,
                    description: session.learningObjectives.join('; ') || `Session ${session.sessionNumber} content`,
                    order: lessonOrder,
                    duration: 45, // Default 45 minutes per session
                    content: {
                        text: session.content,
                        videoUrl: '', // Videos are linked in content
                        resources: []
                    },
                    learningObjectives: session.learningObjectives,
                    activities: session.activities,
                    isPublished: true
                });
                
                course.lessons.push(lesson._id);
                console.log(`      ✓ ${lessonTitle}`);
            }
            
            console.log('');
        }
        
        // Save course with all lessons
        await course.save();
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ AI Curriculum Seeded Successfully!');
        console.log('='.repeat(60));
        console.log(`\n📊 Summary:`);
        console.log(`   Course: ${course.title}`);
        console.log(`   Days: ${curriculum.days.length}`);
        console.log(`   Total Lessons: ${course.lessons.length}`);
        console.log(`   Instructor: ${instructor.email}`);
        console.log(`\n🌐 Access the course in the LMS at:`);
        console.log(`   http://localhost:3000`);
        console.log(`   Login as instructor: instructor@accn.edu / instructor123`);
        console.log('');
        
        // Display lesson breakdown
        console.log('\n📚 Lesson Breakdown:\n');
        let currentDayNum = 0;
        for (let i = 0; i < course.lessons.length; i++) {
            const lesson = await Lesson.findById(course.lessons[i]);
            const dayNum = parseInt(lesson.title.match(/Day (\d+)/)[1]);
            
            if (dayNum !== currentDayNum) {
                currentDayNum = dayNum;
                const dayInfo = curriculum.days.find(d => d.dayNumber === dayNum);
                console.log(`\n📅 Day ${dayNum}: ${dayInfo.title}`);
                console.log(`   Focus: ${dayInfo.focus}`);
            }
            
            console.log(`   ${i + 1}. ${lesson.title.replace(/^Day \d+\./, '   Session ')}`);
        }
        
        console.log('\n✨ Ready to explore your AI curriculum!\n');
        
    } catch (error) {
        console.error('❌ Error seeding curriculum:', error);
        console.error(error.stack);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('👋 Database connection closed\n');
    }
}

// Run the seed
seedCurriculum();
