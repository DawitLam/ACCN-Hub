# Quick Start Guide - New Features

## 🚀 Getting Started

### 1. Start Your Enhanced Server
```bash
cd d:\ACCN-Hub
node backend/server.js
```

You should see:
```
✅ MongoDB Connected: clusterlms.nfwnumn.mongodb.net
Server started on port 3000
Access at http://localhost:3000
```

---

## 🎓 For Instructors: AI Course Setup

### Step 1: Create the AI Certification Course
```javascript
// Via instructor dashboard or API
POST /api/courses
{
  "title": "AI Fundamentals Certification",
  "description": "10-day intensive AI course with hands-on projects",
  "track": "Coding",
  "duration": "10 days × 3 hours",
  "difficulty": "Beginner",
  "tags": ["AI", "Machine Learning", "Python", "Data Science"]
}
```

### Step 2: Add Lessons with Quizzes
```javascript
POST /api/lessons
{
  "courseId": "...",
  "title": "Day 1: Introduction to AI",
  "order": 1,
  "content": "Welcome to AI Fundamentals...",
  "videoUrl": "https://www.youtube.com/watch?v=aircAruvnKk",
  "quiz": [
    {
      "question": "What is the difference between AI and ML?",
      "options": [
        "AI is broader, ML is a subset",
        "They are the same",
        "ML is broader, AI is a subset",
        "They are unrelated"
      ],
      "correctAnswer": 0,
      "explanation": "AI encompasses all intelligent systems, while ML specifically learns from data",
      "points": 10
    }
  ],
  "quizSettings": {
    "maxAttempts": 3,
    "passingScore": 70,
    "showCorrectAnswers": true
  },
  "activities": [
    {
      "title": "AI Scavenger Hunt",
      "description": "Find 10 AI systems you used today",
      "type": "text",
      "required": true
    }
  ],
  "homework": {
    "title": "Python Basics",
    "description": "Complete Codecademy Python modules 1-4",
    "required": true,
    "dueDate": "2025-12-02T23:59:00Z",
    "submissionType": "link"
  }
}
```

### Step 3: Monitor Student Progress
```javascript
// View course analytics
GET /api/tracking/analytics/course/COURSE_ID

// View specific student
GET /api/tracking/analytics/student/STUDENT_ID/course/COURSE_ID
```

### Step 4: Grade Submissions
```javascript
// Get all submissions
GET /api/submissions/course/COURSE_ID

// Grade a submission
PUT /api/submissions/SUBMISSION_ID/grade
{
  "score": 85,
  "feedback": "Excellent work! Your ML model shows good understanding...",
  "rubricScores": [
    { "criterion": "Technical Implementation", "maxPoints": 30, "earnedPoints": 28 },
    { "criterion": "Data Quality", "maxPoints": 15, "earnedPoints": 14 },
    { "criterion": "Results & Analysis", "maxPoints": 20, "earnedPoints": 17 },
    { "criterion": "Ethics", "maxPoints": 15, "earnedPoints": 13 },
    { "criterion": "Presentation", "maxPoints": 20, "earnedPoints": 18 }
  ]
}
```

### Step 5: Issue Certificates
```javascript
// After Day 10, issue certificates
POST /api/certificates/issue/COURSE_ID
{
  "studentId": "STUDENT_ID"
}

// System automatically calculates tier:
// - AI Developer (🥇): 100% complete, 85%+ project, 90%+ attendance
// - AI Practitioner (🥈): 90% complete, 75%+ project, 85%+ attendance  
// - AI Literacy (🥉): 80% complete, 70%+ quizzes, 80%+ attendance
```

---

## 📚 For Students: Taking the Course

### Step 1: Enroll in Course
```javascript
POST /api/courses/COURSE_ID/enroll
```

### Step 2: Watch Videos (Automatically Tracked)
The frontend will automatically track your video progress:
```javascript
// This happens automatically when you watch videos
// Updates every 10 seconds
{
  "watchedDuration": 450,
  "totalDuration": 600,
  "watchPercentage": 75
}
```

### Step 3: Complete Activities
```javascript
// When you finish AI Scavenger Hunt
POST /api/tracking/activity/complete
{
  "lessonId": "...",
  "courseId": "...",
  "activityId": "ai-scavenger-hunt",
  "activityTitle": "AI Scavenger Hunt"
}
```

### Step 4: Take Quizzes
```javascript
POST /api/lessons/LESSON_ID/quiz
{
  "answers": [0, 2, 1, 3],
  "timeSpent": 180
}

// Response shows if you passed
{
  "score": 85,
  "passed": true,
  "attemptsUsed": 1,
  "attemptsRemaining": 2
}
```

### Step 5: Submit Homework
```javascript
POST /api/submissions
{
  "lessonId": "...",
  "courseId": "...",
  "submissionType": "homework",
  "content": "I completed modules 1-4 on Codecademy",
  "fileUrls": ["https://codecademy.com/certificate/..."]
}
```

### Step 6: Submit Final Project
```javascript
POST /api/submissions
{
  "lessonId": "...",
  "courseId": "...",
  "submissionType": "project",
  "content": "I built a sentiment analysis model...",
  "fileUrls": [
    "https://github.com/username/ai-project",
    "https://colab.research.google.com/drive/..."
  ],
  "metadata": {
    "githubRepo": "https://github.com/username/ai-project",
    "colabNotebook": "https://colab.research.google.com/..."
  }
}
```

### Step 7: Get Your Certificate
```javascript
// View your certificates
GET /api/certificates/my-certificates

// Response
[
  {
    "course": { "title": "AI Fundamentals Certification" },
    "tier": "AI Practitioner",
    "verificationCode": "A7F3C2E8B4D19C5E6F2A3B7C8D9E0F1A",
    "certificateUrl": "/api/certificates/A7F3C2E8.../download",
    "issuedAt": "2025-12-01T10:00:00Z"
  }
]
```

---

## 🔍 For Employers: Verify Certificates

### Public Verification (No Login Required)
```bash
# Visit this URL in browser
http://localhost:3000/api/certificates/verify/A7F3C2E8B4D19C5E6F2A3B7C8D9E0F1A
```

**Response:**
```json
{
  "valid": true,
  "certificate": {
    "studentName": "John Doe",
    "courseName": "AI Fundamentals Certification",
    "tier": "AI Practitioner",
    "issuedAt": "2025-12-01T10:00:00Z",
    "organization": "ACCN Hub - ACCN's Programs",
    "skills": ["Python", "Machine Learning", "Data Science", "AI Ethics"]
  }
}
```

---

## 🛠️ Frontend Integration

### Add to `frontend/js/lesson-viewer.js`

```javascript
// Track video progress
const videoElement = document.querySelector('video');
let lastUpdate = 0;

videoElement.addEventListener('timeupdate', () => {
  const now = Date.now();
  if (now - lastUpdate > 10000) { // Every 10 seconds
    lastUpdate = now;
    
    fetch('/api/tracking/video/progress', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lessonId: currentLessonId,
        courseId: currentCourseId,
        watchedDuration: videoElement.currentTime,
        totalDuration: videoElement.duration,
        currentPosition: videoElement.currentTime
      })
    });
  }
});

// Track resource clicks
document.querySelectorAll('.resource-link').forEach(link => {
  link.addEventListener('click', (e) => {
    fetch('/api/tracking/resource/click', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lessonId: currentLessonId,
        courseId: currentCourseId,
        resourceUrl: link.href,
        resourceType: link.dataset.type || 'link',
        resourceTitle: link.textContent
      })
    });
  });
});

// Mark activity complete
async function completeActivity(activityId, activityTitle) {
  const response = await fetch('/api/tracking/activity/complete', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      lessonId: currentLessonId,
      courseId: currentCourseId,
      activityId,
      activityTitle
    })
  });
  
  if (response.ok) {
    alert('Activity marked as complete!');
  }
}

// Submit quiz with time tracking
let quizStartTime = Date.now();

async function submitQuiz(answers) {
  const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
  
  const response = await fetch(`/api/lessons/${currentLessonId}/quiz`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ answers, timeSpent })
  });
  
  const result = await response.json();
  
  if (result.passed) {
    alert(`Congratulations! You scored ${result.score}%`);
  } else {
    alert(`Score: ${result.score}%. You need ${result.passingScore}% to pass. ${result.attemptsRemaining} attempts remaining.`);
  }
}
```

### Add to `frontend/js/student-dashboard.js`

```javascript
// Display certificates
async function loadCertificates() {
  const response = await fetch('/api/certificates/my-certificates', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  
  const certificates = await response.json();
  
  const certContainer = document.getElementById('certificates');
  certContainer.innerHTML = certificates.map(cert => `
    <div class="certificate-card ${cert.tier.toLowerCase().replace(' ', '-')}">
      <h3>${cert.course.title}</h3>
      <div class="tier-badge">${getTierEmoji(cert.tier)} ${cert.tier}</div>
      <p>Issued: ${new Date(cert.issuedAt).toLocaleDateString()}</p>
      <p class="verification-code">Verification: ${cert.verificationCode}</p>
      <a href="${cert.certificateUrl}" class="btn-download">Download Certificate</a>
    </div>
  `).join('');
}

function getTierEmoji(tier) {
  const emojis = {
    'AI Developer': '🥇',
    'AI Practitioner': '🥈',
    'AI Literacy': '🥉',
    'Course Completion': '✅'
  };
  return emojis[tier] || '📜';
}
```

### Add to `frontend/js/instructor-dashboard.js`

```javascript
// View course analytics
async function loadCourseAnalytics(courseId) {
  const response = await fetch(`/api/tracking/analytics/course/${courseId}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  
  const data = await response.json();
  
  // Display summary
  document.getElementById('total-activities').textContent = data.summary.totalActivities;
  document.getElementById('unique-students').textContent = data.summary.uniqueStudents;
  
  // Display activity breakdown
  const breakdown = document.getElementById('activity-breakdown');
  breakdown.innerHTML = Object.entries(data.summary.byType)
    .map(([type, count]) => `
      <div class="stat-item">
        <span>${formatActivityType(type)}</span>
        <span class="stat-value">${count}</span>
      </div>
    `).join('');
}

// View student engagement
async function loadStudentEngagement(studentId, courseId) {
  const response = await fetch(`/api/tracking/analytics/student/${studentId}/course/${courseId}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  
  const data = await response.json();
  
  // Color code based on engagement
  const engagementLevel = getEngagementLevel(data.metrics);
  
  return `
    <div class="student-card ${engagementLevel}">
      <div class="engagement-indicator"></div>
      <h4>${data.student.firstName} ${data.student.lastName}</h4>
      <div class="stats">
        <div>Videos: ${data.metrics.videosWatched}</div>
        <div>Quizzes: ${data.metrics.quizzesTaken}</div>
        <div>Activities: ${data.metrics.activitiesCompleted}</div>
        <div>Attendance: ${data.metrics.attendancePercentage}%</div>
      </div>
      <p class="last-active">Last active: ${formatTime(data.metrics.lastActive)}</p>
    </div>
  `;
}

function getEngagementLevel(metrics) {
  const score = (
    metrics.videosWatched * 2 +
    metrics.quizzesTaken * 3 +
    metrics.activitiesCompleted * 2 +
    metrics.attendancePercentage / 10
  );
  
  if (score > 80) return 'high-engagement';
  if (score > 40) return 'medium-engagement';
  return 'low-engagement';
}

// Issue certificate
async function issueCertificate(studentId, courseId) {
  const response = await fetch(`/api/certificates/issue/${courseId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ studentId })
  });
  
  const result = await response.json();
  
  if (result.success) {
    alert(`Certificate issued! Tier: ${result.certificate.tier}\nVerification Code: ${result.certificate.verificationCode}`);
  } else {
    alert(`Cannot issue certificate: ${result.message}`);
  }
}
```

---

## 🧪 Testing Your Implementation

### Test 1: Quiz Security
```bash
# As student, get lesson
curl -H "Authorization: Bearer $STUDENT_TOKEN" \
  http://localhost:3000/api/lessons/LESSON_ID

# Verify correctAnswer is NOT in response
```

### Test 2: Activity Logging
```bash
# Perform any action, then check logs
curl -H "Authorization: Bearer $INSTRUCTOR_TOKEN" \
  http://localhost:3000/api/tracking/analytics/course/COURSE_ID

# Should see recent activities
```

### Test 3: Certificate Verification
```bash
# Issue certificate
curl -X POST -H "Authorization: Bearer $INSTRUCTOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"studentId":"STUDENT_ID"}' \
  http://localhost:3000/api/certificates/issue/COURSE_ID

# Verify (public, no auth)
curl http://localhost:3000/api/certificates/verify/VERIFICATION_CODE
```

---

## 📱 Mobile Considerations

All new endpoints work with mobile apps. Key points:

- **Video tracking:** Send updates even if app backgrounded
- **Resource clicks:** Track in-app browser opens
- **Offline mode:** Queue tracking calls, sync when online
- **Certificate display:** Render QR code for easy sharing

---

## 🎉 You're All Set!

Your LMS now has:
- ✅ Secure quizzes with attempt limiting
- ✅ Comprehensive activity logging
- ✅ Automatic certification system
- ✅ Submission and grading workflow
- ✅ Analytics and reporting
- ✅ Certificate verification

**Next Steps:**
1. Integrate frontend tracking code
2. Test with sample students
3. Create course content from curriculum
4. Deploy to production

**Need Help?**
- Review `docs/SECURITY_AND_LOGGING.md` for details
- Check `docs/API_REFERENCE.md` for endpoints
- See `IMPLEMENTATION_SUMMARY.md` for overview

---

**Happy Teaching! 🎓**
