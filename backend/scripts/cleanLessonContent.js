/**
 * Clean lesson content markdown to separate descriptive text from code blocks
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');

function transformCodeBlock(block, lang) {
    const lines = block.split('\n');
    const segments = [];
    let codeLines = [];

    const flushCode = () => {
        if (codeLines.length > 0) {
            const trimmed = codeLines.join('\n').trim();
            if (trimmed) {
                const language = lang || 'python';
                segments.push('```' + language + '\n' + trimmed + '\n```');
            }
            codeLines = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (index === 0 && trimmed.toLowerCase() === 'python') {
            return; // skip stray first line
        }

        const hasCodeChars = /[=(){}\[\]#0-9"'`]/.test(trimmed) || /:\s*$/.test(trimmed) || /\b(print|for|while|if|elif|else|def|class|import|return|range|input)\b/.test(trimmed);
        const isHeading = trimmed && !hasCodeChars;

        if (isHeading) {
            flushCode();
            segments.push(`**${trimmed}**`);
        } else {
            codeLines.push(line);
        }
    });

    flushCode();

    return segments.join('\n\n');
}

async function cleanContent() {
    await mongoose.connect(process.env.MONGODB_URI);
    const lessons = await Lesson.find({});

    for (const lesson of lessons) {
        if (!lesson.content) continue;
        const original = lesson.content;
        let updated = original;
        const regex = /```(\w+)?\n([\s\S]*?)```/g;
        updated = updated.replace(regex, (_, lang, block) => transformCodeBlock(block, lang));

        if (updated !== original) {
            lesson.content = updated;
            await lesson.save();
            console.log(`Updated content for session ${lesson.sessionNumber || lesson.title}`);
        }
    }

    await mongoose.disconnect();
    console.log('Content cleanup complete');
}

cleanContent().catch(err => {
    console.error(err);
    mongoose.disconnect();
});
