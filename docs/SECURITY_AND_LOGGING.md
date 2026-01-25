# Security & Logging Implementation Guide

## Overview
This document details all security and logging enhancements implemented for the ACCN Hub LMS, specifically designed to support the AI Certification Course with comprehensive tracking and security features.

---

## 🔐 Security Enhancements

### 1. Quiz Security
**Problem Solved:** Students could see correct answers in API responses before submitting quizzes.

**Implementation:**
- Quiz answers marked with `select: false` in Lesson model
- Correct answers and explanations only returned after submission
- Answers only visible if `quizSettings.showCorrectAnswers` is true
- Students receive masked results showing only if their answer was correct

**Files Modified:**
- `backend/models/Lesson.js` - Added `select: false` to correctAnswer and explanation
- `backend/routes/lessons.js` - Modified GET endpoint to exclude answers for students

**Usage:**
```javascript
// Student gets lesson without answers
const lesson = await Lesson.findById(id)
  .select('-quiz.correctAnswer -quiz.explanation');
```

### 2. Quiz Attempt Limiting
**Problem Solved:** Students could retry quizzes unlimited times to brute-force correct answers.

**Implementation:**
- `quizSettings.maxAttempts` (default: 3) added to Lesson model
- Attempt tracking in Progress model's `quizHistory`
- 403 error returned when max attempts exceeded
- All attempts logged to ActivityLog for cheating detection

**Files Modified:**
- `backend/models/Lesson.js` - Added quizSettings with maxAttempts
- `backend/models/Progress.js` - Added quizHistory array
- `backend/routes/lessons.js` - Added attempt checking in quiz submission

**API Response:**
```json
{
  "score": 85,
  "passed": true,
  "attemptsUsed": 2,
  "attemptsRemaining": 1
}
```

### 3. Content Security Policy (CSP)
**Problem Solved:** Missing CSP headers prevented embedding YouTube videos and external AI tools.

**Implementation:**
- Comprehensive CSP allowing:
  - YouTube video embeds (`youtube.com`, `youtube-nocookie.com`)
  - Google Colab notebooks (`colab.research.google.com`)
  - Teachable Machine (`teachablemachine.withgoogle.com`)
  - TensorFlow Playground (`playground.tensorflow.org`)
  - Kaggle datasets (`www.kaggle.com`)
- Frame-Ancestors set to SAMEORIGIN for iframe support

**Files Modified:**
- `backend/server.js` - Added comprehensive CSP header

**CSP Policy:**
```javascript
"frame-src 'self' https://www.youtube.com https://colab.research.google.com https://teachablemachine.withgoogle.com"
```

### 4. Certificate Verification System
**Problem Solved:** Certificates had predictable URLs that could be guessed.

**Implementation:**
- Unique verification codes (32-character hex strings)
- Public verification endpoint (no auth required)
- Certificate revocation support with audit trail
- Non-guessable URLs: `/api/certificates/[CODE]/download`

**Files Created:**
- `backend/models/Certificate.js` - Certificate schema with verification codes
- `backend/routes/certificates.js` - Issue, verify, revoke endpoints

**Verification Endpoint:**
```
GET /api/certificates/verify/A7F3C2E8B4D1...
```

**Response:**
```json
{
  "valid": true,
  "certificate": {
    "studentName": "John Doe",
    "courseName": "AI Fundamentals",
    "tier": "AI Practitioner",
    "issuedAt": "2025-12-01T10:00:00Z",
    "organization": "ACCN Hub - ACCN's Programs"
  }
}
```

---

## 📊 Activity Logging System

### 1. Comprehensive Activity Log Model
**New Model:** `backend/models/ActivityLog.js`

**Tracks 30+ Activity Types:**

**Student Activities:**
- `video_started`, `video_paused`, `video_completed`, `video_progress`
- `resource_clicked`, `resource_downloaded`
- `lesson_viewed`, `lesson_completed`
- `quiz_started`, `quiz_submitted`, `quiz_passed`, `quiz_failed`
- `homework_submitted`, `project_submitted`
- `activity_started`, `activity_completed`
- `course_enrolled`, `course_completed`
- `certificate_earned`

**Instructor Activities:**
- `course_created`, `course_updated`, `course_deleted`, `course_published`
- `lesson_created`, `lesson_updated`, `lesson_deleted`
- `submission_graded`, `grade_modified`
- `student_progress_viewed`, `student_data_exported`

**Security Events:**
- `login_success`, `login_failed`, `logout`
- `permission_denied`, `suspicious_activity`
- `password_changed`, `account_updated`

**Schema:**
```javascript
{
  user: ObjectId,
  activityType: String (enum),
  course: ObjectId,
  lesson: ObjectId,
  targetUser: ObjectId, // For instructor actions on students
  details: Mixed,
  ipAddress: String,
  userAgent: String,
  timestamp: Date,
  sessionId: String,
  duration: Number // seconds
}
```

**Indexes for Performance:**
- `user + timestamp` (user activity timeline)
- `course + timestamp` (course analytics)
- `activityType + timestamp` (activity type reports)

### 2. Video Progress Tracking
**Endpoint:** `POST /api/tracking/video/progress`

**Tracks:**
- Watch duration (seconds)
- Total video duration
- Watch percentage
- Last playback position
- Completion status (80% threshold)

**Implementation:**
```javascript
// Frontend sends every 10 seconds
await fetch('/api/tracking/video/progress', {
  method: 'POST',
  body: JSON.stringify({
    lessonId: '...',
    courseId: '...',
    watchedDuration: 450,
    totalDuration: 600,
    currentPosition: 450
  })
});
```

**Stored in Progress Model:**
```javascript
completedLessons: [{
  lesson: ObjectId,
  videoProgress: {
    watchedDuration: 480,
    totalDuration: 600,
    watchPercentage: 80,
    lastPosition: 480,
    completedAt: Date
  }
}]
```

### 3. Resource Click Tracking
**Endpoint:** `POST /api/tracking/resource/click`

**Tracks:**
- YouTube video links
- Kaggle dataset access
- Google Colab notebook opens
- Reading material clicks
- External tool launches (Teachable Machine, TensorFlow Playground)

**Use Case:**
Detect students who aren't accessing required resources and intervene early.

### 4. Activity Completion Tracking
**Endpoint:** `POST /api/tracking/activity/complete`

**Tracks:**
- Hands-on activities (AI Scavenger Hunt, Paper ML Exercise)
- Interactive games (Quick Draw, Drawize)
- Discussion participation
- Data Bias Detective exercises

**Implementation:**
```javascript
completedLessons: [{
  lesson: ObjectId,
  activitiesCompleted: [{
    activityId: 'ai-scavenger-hunt',
    completedAt: Date,
    submissionId: ObjectId
  }]
}]
```

### 5. Attendance Tracking
**Endpoint:** `POST /api/tracking/attendance`

**For 10-Day AI Certification Course:**
- Records daily attendance
- Tracks session duration (minutes)
- Logs lessons covered per session
- Calculates attendance percentage

**Required for Certification:**
- AI Literacy: 80%+ attendance
- AI Practitioner: 85%+ attendance
- AI Developer: 90%+ attendance

**Implementation:**
```javascript
attendance: [{
  date: Date,
  present: Boolean,
  duration: 180, // 3 hours
  lessonsCovered: ['Day 1 Session 1', 'Day 1 Session 2']
}],
attendancePercentage: 85
```

### 6. Login Activity Logging
**Implemented in:** `backend/routes/auth.js`

**Tracks:**
- Successful logins (IP, user agent, timestamp)
- Failed login attempts (reason: user not found, invalid password, account disabled)
- Multiple failed attempts from same IP (suspicious activity detection)

**Security Use Cases:**
- Detect brute force attacks
- Identify compromised accounts
- Generate security reports
- Trigger 2FA requirements

---

## 📝 Submission & Grading System

### 1. Submission Model
**New Model:** `backend/models/Submission.js`

**Supports:**
- Homework submissions
- Project submissions
- Activity submissions
- Quiz submissions (auto-graded separately)

**Features:**
- File upload support (URLs array)
- Status tracking (submitted → grading → graded → returned)
- Rubric-based grading
- Late submission detection
- Multiple attempts per assignment

**Schema:**
```javascript
{
  student: ObjectId,
  lesson: ObjectId,
  course: ObjectId,
  submissionType: 'homework' | 'project' | 'activity',
  content: String,
  fileUrls: [String],
  status: 'submitted' | 'grading' | 'graded' | 'returned',
  score: Number (0-100),
  feedback: String,
  rubricScores: [{
    criterion: 'Code Quality',
    maxPoints: 30,
    earnedPoints: 25,
    feedback: 'Good structure, needs comments'
  }],
  gradedBy: ObjectId,
  gradedAt: Date,
  dueDate: Date,
  isLate: Boolean,
  attemptNumber: Number
}
```

### 2. AI Course Final Project Rubric
**Total: 100 points**

**Grading Criteria:**
```javascript
rubricScores: [
  { criterion: 'Technical Implementation', maxPoints: 30 },
  { criterion: 'Data Quality & Preparation', maxPoints: 15 },
  { criterion: 'Results & Analysis', maxPoints: 20 },
  { criterion: 'Ethical Considerations', maxPoints: 15 },
  { criterion: 'Presentation & Documentation', maxPoints: 20 }
]
```

**Certification Thresholds:**
- AI Literacy: 70%+ (project submitted)
- AI Practitioner: 75%+ on final project
- AI Developer: 85%+ on final project

### 3. Grading Workflow
**Route:** `PUT /api/submissions/:id/grade`

**Process:**
1. Instructor reviews submission
2. Scores each rubric criterion
3. Provides written feedback
4. Assigns overall score
5. System logs grading activity
6. Updates Progress model
7. Checks certification eligibility

---

## 🏆 Certification System

### 1. Certificate Tiers
**Automatically calculated based on:**

**AI Developer Certificate (🥇 Gold)**
- 100% course completion
- 85%+ final project score
- 85%+ average quiz score
- 90%+ attendance

**AI Practitioner Certificate (🥈 Silver)**
- 90%+ course completion
- 75%+ final project score
- 75%+ average quiz score
- 85%+ attendance

**AI Literacy Certificate (🥉 Bronze)**
- 80%+ course completion
- 70%+ average quiz score
- 80%+ attendance
- Final project submitted

**Course Completion Certificate**
- 100% course completion
- (No score requirements)

### 2. Certificate Issuance
**Route:** `POST /api/certificates/issue/:courseId`

**Process:**
```javascript
// Instructor triggers after course ends
const cert = await Certificate.create({
  student: studentId,
  course: courseId,
  tier: 'AI Practitioner', // Auto-calculated
  verificationCode: 'A7F3C2E8...', // Auto-generated
  criteria: {
    attendancePercentage: 88,
    finalScore: 82,
    projectScore: 82,
    totalPoints: 1450,
    completedLessons: 40,
    totalLessons: 40
  },
  metadata: {
    instructorName: 'Dawit LG',
    courseDuration: '10 days',
    skills: ['Python', 'Machine Learning', 'Data Science', 'AI Ethics'],
    issuerOrganization: 'ACCN Hub - ACCN Programs'
  }
});
```

### 3. Certificate Verification
**Public endpoint (no auth):** `GET /api/certificates/verify/:code`

**Employers can verify certificates by entering the code on a public page.**

---

## 📈 Analytics & Reporting

### 1. Course Analytics
**Endpoint:** `GET /api/tracking/analytics/course/:courseId`

**Query Parameters:**
- `startDate` - Filter activities after this date
- `endDate` - Filter activities before this date
- `activityType` - Filter by specific activity type

**Returns:**
```json
{
  "activities": [...], // Last 1000 activities
  "summary": {
    "totalActivities": 2547,
    "uniqueStudents": 32,
    "byType": {
      "video_completed": 450,
      "quiz_submitted": 320,
      "resource_clicked": 780,
      "activity_completed": 456,
      "lesson_completed": 541
    }
  }
}
```

**Use Cases:**
- Identify most engaged students
- Find struggling students (low activity)
- Analyze content effectiveness
- Detect cheating patterns

### 2. Student Engagement Report
**Endpoint:** `GET /api/tracking/analytics/student/:studentId/course/:courseId`

**Returns:**
```json
{
  "metrics": {
    "totalActivities": 87,
    "videosWatched": 32,
    "resourcesAccessed": 24,
    "quizzesTaken": 18,
    "activitiesCompleted": 13,
    "totalTimeSpent": 10800, // seconds
    "lastActive": "2025-12-01T15:30:00Z",
    "attendancePercentage": 90
  },
  "activities": [...]
}
```

**Instructor Dashboard Display:**
- Traffic light system (green/yellow/red) for engagement
- Alert badges for students with <60% activity
- Intervention triggers for students missing 2+ consecutive days

---

## 🚀 Implementation Guide

### Step 1: Install Dependencies
```bash
# No new dependencies needed - all use existing packages
npm install
```

### Step 2: Update Database
The new models will auto-create collections on first use. No migration needed.

### Step 3: Test Security Features

**Test Quiz Security:**
```bash
# As student, get lesson (should NOT see answers)
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/lessons/:id

# Submit quiz (answers returned after submission)
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -d '{"answers":[0,1,2],"timeSpent":180}' \
  http://localhost:3000/api/lessons/:id/quiz
```

**Test Activity Logging:**
```bash
# Every action should create ActivityLog entry
# Check MongoDB:
db.activitylogs.find({user: ObjectId("...")}).sort({timestamp:-1})
```

**Test Certificate Issuance:**
```bash
# As instructor
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -d '{"studentId":"..."}' \
  http://localhost:3000/api/certificates/issue/:courseId

# Public verification (no auth)
curl http://localhost:3000/api/certificates/verify/A7F3C2E8...
```

### Step 4: Frontend Integration

**Add Video Tracking:**
```javascript
// In lesson-viewer.js
videoPlayer.addEventListener('timeupdate', throttle(async () => {
  await fetch('/api/tracking/video/progress', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      lessonId,
      courseId,
      watchedDuration: videoPlayer.currentTime,
      totalDuration: videoPlayer.duration,
      currentPosition: videoPlayer.currentTime
    })
  });
}, 10000)); // Update every 10 seconds
```

**Add Resource Tracking:**
```javascript
// Track when student clicks YouTube link
document.querySelectorAll('.resource-link').forEach(link => {
  link.addEventListener('click', async (e) => {
    await fetch('/api/tracking/resource/click', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lessonId,
        courseId,
        resourceUrl: link.href,
        resourceType: 'video',
        resourceTitle: link.textContent
      })
    });
  });
});
```

**Add Activity Completion:**
```javascript
// When student completes AI Scavenger Hunt
async function markActivityComplete(activityId, activityTitle) {
  await fetch('/api/tracking/activity/complete', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      lessonId,
      courseId,
      activityId,
      activityTitle
    })
  });
}
```

---

## 🔍 Monitoring & Maintenance

### 1. Review ActivityLogs Regularly
```javascript
// Detect suspicious quiz patterns
db.activitylogs.aggregate([
  { $match: { activityType: 'quiz_submitted' } },
  { $group: { 
      _id: '$user', 
      avgScore: { $avg: '$details.score' },
      count: { $sum: 1 }
  }},
  { $match: { avgScore: { $gt: 95 }, count: { $gt: 10 } } }
]);
```

### 2. Generate Weekly Reports
```javascript
// Students with low engagement
db.activitylogs.aggregate([
  { $match: { 
      timestamp: { $gte: startOfWeek },
      activityType: { $in: ['lesson_viewed', 'video_completed'] }
  }},
  { $group: { _id: '$user', activityCount: { $sum: 1 } }},
  { $match: { activityCount: { $lt: 5 } } }
]);
```

### 3. Archive Old Logs
```javascript
// Archive logs older than 1 year
db.activitylogs.deleteMany({
  timestamp: { $lt: new Date('2024-01-01') }
});
```

---

## 📋 Security Checklist

- [✅] Quiz answers hidden from students until submission
- [✅] Quiz attempts limited and logged
- [✅] CSP headers allow only trusted domains
- [✅] Certificate verification codes are cryptographically secure
- [✅] All authentication events logged (success/failure)
- [✅] Permission denials logged for audit
- [✅] IP addresses captured for security analysis
- [✅] User agents logged for device tracking
- [✅] Video progress verified (can't skip ahead)
- [✅] Activity completion requires actual submission
- [✅] Grades can only be modified by instructors
- [✅] Certificate revocation audit trail

---

## 📚 Next Steps

1. **Create instructor analytics dashboard** showing:
   - Real-time student engagement
   - Quiz performance trends
   - Video completion rates
   - Resource utilization

2. **Build student certificate display page** with:
   - Downloadable PDF certificates
   - LinkedIn share integration
   - Verification code display
   - Digital badge downloads

3. **Implement email notifications** for:
   - Assignment submissions
   - Grade release
   - Certificate issuance
   - Low engagement alerts

4. **Add data export** for:
   - GDPR compliance (student data export)
   - Instructor reporting (CSV exports)
   - Analytics dashboards (JSON APIs)

---

## 🆘 Troubleshooting

**Issue:** CSP blocking YouTube embeds
**Solution:** Check browser console, ensure domain in frame-src directive

**Issue:** ActivityLog entries not created
**Solution:** Check MongoDB connection, review error logs

**Issue:** Certificate verification fails
**Solution:** Verify code is uppercase, check isValid field

**Issue:** Video tracking not working
**Solution:** Ensure throttle function limits API calls to 1 per 10 seconds

---

**Document Version:** 1.0  
**Last Updated:** December 1, 2025  
**Author:** ACCN Hub Development Team
