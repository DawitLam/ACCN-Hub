const fs = require('fs');

const content = fs.readFileSync('AI_CERTIFICATION_CURRICULUM.md', 'utf8');
const lines = content.split('\n');

let structure = {};
let currentDay = null;
let currentSession = null;
let sessionCount = 0;

for (let line of lines) {
    if (line.match(/^# DAY \d+:/)) {
        currentDay = line.replace('# ', '').trim();
        structure[currentDay] = [];
    } else if (line.match(/^## Session \d+\.\d+:/)) {
        sessionCount++;
        currentSession = {
            title: line.replace('## ', '').trim(),
            sections: [],
            sessionNumber: sessionCount
        };
        if (currentDay) structure[currentDay].push(currentSession);
    } else if (line.match(/^### Section \d+:/)) {
        if (currentSession) {
            currentSession.sections.push(line.replace('### ', '').trim());
        }
    }
}

console.log(JSON.stringify(structure, null, 2));
