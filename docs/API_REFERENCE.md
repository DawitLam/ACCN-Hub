# API Reference - Security & Logging Endpoints

## Authentication Required
All endpoints require `Authorization: Bearer <token>` header unless marked as **(Public)**

---

## 📝 Submissions API

### Create Submission
```http
POST /api/submissions
Authorization: Bearer <token>
Role: student

{
  "lessonId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012",
  "submissionType": "homework|project|activity",
  "content": "My solution explanation...",
  "fileUrls": ["https://storage.example.com/project.zip"],
  "metadata": { "githubRepo": "https://github.com/..." }
}

Response: 201
{
  "success": true,
  "message": "Submission created successfully",
  "submission": { ... }
}
```

### Get My Submissions
```http
GET /api/submissions/my-submissions?courseId=...&lessonId=...
Authorization: Bearer <token>
Role: student

Response: 200
[
  {
    "_id": "...",
    "lesson": { "title": "Day 9: Final Project" },
    "submissionType": "project",
    "status": "graded",
    "score": 85,
    "submittedAt": "2025-12-01T10:00:00Z"
  }
]
```

### Get Course Submissions (Instructor)
```http
GET /api/submissions/course/:courseId
Authorization: Bearer <token>
Role: instructor, admin

Response: 200
[
  {
    "student": { "firstName": "John", "lastName": "Doe" },
    "lesson": { "title": "Day 9: Final Project" },
    "status": "submitted",
    "submittedAt": "2025-12-01T10:00:00Z"
  }
]
```

### Grade Submission
```http
PUT /api/submissions/:id/grade
Authorization: Bearer <token>
Role: instructor, admin

{
  "score": 85,
  "feedback": "Excellent work on model implementation...",
  "rubricScores": [
    {
      "criterion": "Technical Implementation",
      "maxPoints": 30,
      "earnedPoints": 28,
      "feedback": "Great code structure"
    }
  ]
}

Response: 200
{
  "success": true,
  "message": "Submission graded successfully",
  "submission": { ... }
}
```

---

## 🏆 Certificates API

### Issue Certificate
```http
POST /api/certificates/issue/:courseId
Authorization: Bearer <token>
Role: instructor, admin

{
  "studentId": "507f1f77bcf86cd799439011"
}

Response: 201
{
  "success": true,
  "message": "Certificate issued successfully",
  "certificate": {
    "_id": "...",
    "verificationCode": "A7F3C2E8B4D19C5E...",
    "tier": "AI Practitioner",
    "certificateUrl": "/api/certificates/A7F3C2E8.../download",
    "criteria": {
      "attendancePercentage": 88,
      "finalScore": 82,
      "completedLessons": 40,
      "totalLessons": 40
    }
  }
}
```

### Verify Certificate **(Public)**
```http
GET /api/certificates/verify/:verificationCode

Response: 200 (Valid)
{
  "valid": true,
  "certificate": {
    "studentName": "John Doe",
    "courseName": "AI Fundamentals Certification",
    "tier": "AI Practitioner",
    "issuedAt": "2025-12-01T10:00:00Z",
    "organization": "ACCN Hub - ACCN's Programs",
    "skills": ["Python", "Machine Learning", "Data Science"]
  }
}

Response: 404 (Invalid)
{
  "valid": false,
  "message": "Certificate not found or has been revoked"
}
```

### Get My Certificates
```http
GET /api/certificates/my-certificates
Authorization: Bearer <token>
Role: student

Response: 200
[
  {
    "course": { "title": "AI Fundamentals" },
    "tier": "AI Practitioner",
    "verificationCode": "A7F3C2E8...",
    "issuedAt": "2025-12-01T10:00:00Z"
  }
]
```

### Revoke Certificate
```http
PUT /api/certificates/:id/revoke
Authorization: Bearer <token>
Role: admin

{
  "reason": "Academic dishonesty detected"
}

Response: 200
{
  "success": true,
  "message": "Certificate revoked successfully"
}
```

---

## 📊 Activity Tracking API

### Track Video Progress
```http
POST /api/tracking/video/progress
Authorization: Bearer <token>
Role: student

{
  "lessonId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012",
  "watchedDuration": 450,
  "totalDuration": 600,
  "currentPosition": 450
}

Response: 200
{
  "success": true,
  "watchPercentage": 75,
  "completed": false
}
```

### Track Resource Click
```http
POST /api/tracking/resource/click
Authorization: Bearer <token>
Role: student

{
  "lessonId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012",
  "resourceUrl": "https://www.youtube.com/watch?v=...",
  "resourceType": "video",
  "resourceTitle": "3Blue1Brown: Neural Networks"
}

Response: 200
{ "success": true }
```

### Track Activity Completion
```http
POST /api/tracking/activity/complete
Authorization: Bearer <token>
Role: student

{
  "lessonId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012",
  "activityId": "ai-scavenger-hunt",
  "activityTitle": "AI Scavenger Hunt"
}

Response: 200
{ "success": true }
```

### Record Attendance
```http
POST /api/tracking/attendance
Authorization: Bearer <token>
Role: student

{
  "courseId": "507f1f77bcf86cd799439012",
  "duration": 180,
  "lessonsCovered": ["Day 1 Session 1", "Day 1 Session 2"]
}

Response: 200
{
  "success": true,
  "attendancePercentage": 80,
  "daysAttended": 8
}
```

### Get Course Analytics
```http
GET /api/tracking/analytics/course/:courseId?startDate=2025-12-01&endDate=2025-12-10&activityType=video_completed
Authorization: Bearer <token>
Role: instructor, admin

Response: 200
{
  "activities": [
    {
      "user": { "firstName": "John", "lastName": "Doe" },
      "activityType": "video_completed",
      "lesson": "507f1f77bcf86cd799439011",
      "timestamp": "2025-12-01T10:30:00Z",
      "details": { "watchPercentage": 95 }
    }
  ],
  "summary": {
    "totalActivities": 2547,
    "uniqueStudents": 32,
    "byType": {
      "video_completed": 450,
      "quiz_submitted": 320,
      "resource_clicked": 780
    }
  }
}
```

### Get Student Engagement Report
```http
GET /api/tracking/analytics/student/:studentId/course/:courseId
Authorization: Bearer <token>
Role: instructor, admin

Response: 200
{
  "metrics": {
    "totalActivities": 87,
    "videosWatched": 32,
    "resourcesAccessed": 24,
    "quizzesTaken": 18,
    "activitiesCompleted": 13,
    "totalTimeSpent": 10800,
    "lastActive": "2025-12-01T15:30:00Z",
    "attendancePercentage": 90
  },
  "activities": [...]
}
```

---

## 📚 Enhanced Lessons API

### Get Lesson (Secure)
```http
GET /api/lessons/:id
Authorization: Bearer <token>

Response: 200 (Student - answers hidden)
{
  "_id": "...",
  "title": "Day 2: Machine Learning Pipeline",
  "content": "...",
  "quiz": [
    {
      "question": "What is supervised learning?",
      "options": ["A", "B", "C", "D"],
      "points": 10
      // correctAnswer and explanation NOT included for students
    }
  ],
  "quizSettings": {
    "maxAttempts": 3,
    "passingScore": 70,
    "showCorrectAnswers": true
  }
}
```

### Submit Quiz (Enhanced)
```http
POST /api/lessons/:id/quiz
Authorization: Bearer <token>
Role: student

{
  "answers": [0, 2, 1, 3],
  "timeSpent": 180
}

Response: 200 (Passed)
{
  "success": true,
  "score": 85,
  "passed": true,
  "correctAnswers": 17,
  "totalQuestions": 20,
  "passingScore": 70,
  "attemptsUsed": 1,
  "attemptsRemaining": 2,
  "results": [
    {
      "questionNumber": 1,
      "correct": true,
      "correctAnswer": 0,
      "explanation": "Supervised learning uses labeled data..."
    }
  ]
}

Response: 403 (Max attempts)
{
  "message": "Maximum quiz attempts (3) exceeded",
  "attemptsRemaining": 0
}
```

---

## 📈 Enhanced Progress API

### Get Course Progress (Enhanced)
```http
GET /api/progress/course/:courseId
Authorization: Bearer <token>

Response: 200
{
  "_id": "...",
  "completedLessons": [
    {
      "lesson": "...",
      "quizScore": 85,
      "quizAttempts": 2,
      "quizHistory": [
        { "attemptedAt": "...", "score": 70, "timeSpent": 200 },
        { "attemptedAt": "...", "score": 85, "timeSpent": 180 }
      ],
      "videoProgress": {
        "watchedDuration": 540,
        "totalDuration": 600,
        "watchPercentage": 90,
        "completedAt": "2025-12-01T10:00:00Z"
      },
      "activitiesCompleted": [
        { "activityId": "ai-scavenger-hunt", "completedAt": "..." }
      ],
      "homeworkSubmitted": true,
      "homeworkScore": 90
    }
  ],
  "attendance": [
    {
      "date": "2025-12-01",
      "present": true,
      "duration": 180,
      "lessonsCovered": ["Day 1 Session 1", "Day 1 Session 2"]
    }
  ],
  "attendancePercentage": 90,
  "certificate": "507f1f77bcf86cd799439011",
  "certificateTier": "AI Practitioner",
  "finalProject": {
    "submitted": true,
    "score": 85,
    "rubricScores": {...}
  }
}
```

---

## 🔍 Activity Log Query Examples

### Find All Failed Login Attempts
```javascript
db.activitylogs.find({
  activityType: 'login_failed'
}).sort({ timestamp: -1 })
```

### Find Students Who Haven't Watched Videos
```javascript
db.activitylogs.aggregate([
  { $match: { 
      activityType: 'video_completed',
      course: ObjectId("...")
  }},
  { $group: { _id: '$user' } }
])
// Compare with enrolled students
```

### Detect Quiz Cheating Patterns
```javascript
db.activitylogs.find({
  activityType: 'quiz_submitted',
  'details.score': { $gt: 95 },
  'details.timeSpent': { $lt: 60 } // Suspiciously fast
})
```

### Track Resource Engagement
```javascript
db.activitylogs.aggregate([
  { $match: { activityType: 'resource_clicked' } },
  { $group: { 
      _id: '$details.resourceUrl',
      clicks: { $sum: 1 }
  }},
  { $sort: { clicks: -1 } }
])
```

---

## 📋 Certification Tier Calculation

### Algorithm
```javascript
function calculateTier(progress, course) {
  const completionRate = (progress.completedLessons.length / course.lessons.length) * 100;
  const avgQuizScore = calculateAvgQuizScore(progress);
  const projectScore = progress.finalProject?.score || 0;
  const attendance = progress.attendancePercentage || 0;
  
  if (
    completionRate === 100 &&
    projectScore >= 85 &&
    avgQuizScore >= 85 &&
    attendance >= 90
  ) {
    return 'AI Developer';
  } else if (
    completionRate >= 90 &&
    projectScore >= 75 &&
    avgQuizScore >= 75 &&
    attendance >= 85
  ) {
    return 'AI Practitioner';
  } else if (
    completionRate >= 80 &&
    avgQuizScore >= 70 &&
    attendance >= 80
  ) {
    return 'AI Literacy';
  } else if (completionRate === 100) {
    return 'Course Completion';
  }
  
  return null; // Not eligible
}
```

---

## 🚀 Testing Commands

### Test with curl
```bash
# Login and save token
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}' \
  | jq -r '.token')

# Submit quiz
curl -X POST http://localhost:3000/api/lessons/LESSON_ID/quiz \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"answers":[0,1,2,3],"timeSpent":180}'

# Track video progress
curl -X POST http://localhost:3000/api/tracking/video/progress \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"lessonId":"...","courseId":"...","watchedDuration":450,"totalDuration":600,"currentPosition":450}'

# Verify certificate (public)
curl http://localhost:3000/api/certificates/verify/A7F3C2E8B4D19C5E
```

---

**API Version:** 1.0  
**Last Updated:** December 1, 2025
