# ACCN-Hub LMS Testing Guide

## ✅ Server Status
**Server Running**: http://localhost:3000  
**Database**: MongoDB Atlas Connected  
**Course Loaded**: AI Fundamentals Certification (40 lessons)

---

## 🧪 Test Scenarios

### 1. Authentication Testing

#### Test 1.1: Instructor Login
**Credentials**:
- Email: `dawitlg@gmail.com`
- Password: `dawit123`

**Steps**:
1. Go to http://localhost:3000
2. Click "Login" or navigate to login page
3. Enter credentials
4. Click "Sign In"

**Expected**:
- ✅ Successful login
- ✅ Redirected to instructor dashboard
- ✅ Activity logged (login_success)

#### Test 1.2: Student Registration
**Steps**:
1. Click "Sign Up" or "Register"
2. Fill form:
   - First Name: `Test`
   - Last Name: `Student`
   - Email: `student@test.com`
   - Password: `Test123!`
   - Role: `student`
3. Submit

**Expected**:
- ✅ Account created
- ✅ Auto-login
- ✅ Redirected to student dashboard

#### Test 1.3: Failed Login (Security)
**Steps**:
1. Try logging in with wrong password
2. Check activity logs

**Expected**:
- ❌ Login fails with error message
- ✅ Activity logged (login_failed with reason)

---

### 2. Course Enrollment & Access

#### Test 2.1: View Available Courses
**As Student**:
1. Login as student
2. Navigate to "Courses" or "Browse Courses"
3. Find "AI Fundamentals Certification"

**Expected**:
- ✅ Course visible with description
- ✅ Shows 40 lessons
- ✅ Duration: 30 hours
- ✅ Difficulty: Beginner

#### Test 2.2: Enroll in Course
**Steps**:
1. Click "Enroll" on AI Fundamentals course
2. Confirm enrollment

**Expected**:
- ✅ Enrollment successful
- ✅ Course appears in "My Courses"
- ✅ Activity logged (course_enrolled)
- ✅ Progress record created

#### Test 2.3: Access First Lesson
**Steps**:
1. Go to "My Courses"
2. Click "AI Fundamentals Certification"
3. Click "Day 1 Session 1: What is AI?"

**Expected**:
- ✅ Lesson content loads
- ✅ Video player shows YouTube embed
- ✅ Resources listed
- ✅ Quiz available at bottom
- ✅ Activity logged (lesson_viewed)

---

### 3. Video Tracking & Progress

#### Test 3.1: Watch Video
**Steps**:
1. Open any lesson with video
2. Play YouTube video
3. Watch for at least 30 seconds
4. Pause and resume
5. Skip to different position

**Expected**:
- ✅ Video progress saved every 10 seconds
- ✅ Last position remembered
- ✅ Watch percentage calculated
- ✅ Activity logged (video_started, video_progress)
- ✅ When >80% watched → video_completed logged

**API Test** (use Postman/Thunder Client):
```javascript
POST http://localhost:3000/api/tracking/video/progress
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "lessonId": "LESSON_ID",
  "watchedDuration": 120,
  "totalDuration": 600,
  "lastPosition": 120
}
```

---

### 4. Quiz System

#### Test 4.1: Take Quiz (First Attempt)
**Steps**:
1. Complete lesson content
2. Scroll to quiz section
3. Answer all questions
4. Submit quiz

**Expected**:
- ✅ Questions displayed WITHOUT correct answers visible
- ✅ Submit button enabled
- ✅ Results shown after submission
- ✅ Score calculated
- ✅ Explanations shown (if enabled in quizSettings)
- ✅ Activity logged (quiz_submitted, quiz_passed OR quiz_failed)
- ✅ Quiz history updated in Progress

#### Test 4.2: Quiz Attempt Limiting
**Steps**:
1. Take quiz and fail (score < 70%)
2. Retry quiz (2nd attempt)
3. Retry quiz (3rd attempt)
4. Try 4th attempt

**Expected**:
- ✅ First 3 attempts allowed
- ❌ 4th attempt blocked
- ✅ Message: "Maximum attempts reached"
- ✅ Shows attempts remaining

**API Test**:
```javascript
POST http://localhost:3000/api/lessons/:lessonId/quiz
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "answers": [0, 1, 2, 0],  // Your answer indices
  "timeSpent": 300  // seconds
}
```

---

### 5. Resource Tracking

#### Test 5.1: Click External Resources
**Steps**:
1. Open lesson with resources
2. Click YouTube video link
3. Click Kaggle dataset link
4. Click Google Colab link
5. Click documentation link

**Expected**:
- ✅ Each click logged as activity (resource_clicked)
- ✅ Details include: resourceType, resourceUrl, resourceTitle
- ✅ Visible in instructor analytics

**API Test**:
```javascript
POST http://localhost:3000/api/tracking/resource/click
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "lessonId": "LESSON_ID",
  "resourceType": "video",
  "resourceUrl": "https://youtube.com/watch?v=...",
  "resourceTitle": "3Blue1Brown Neural Networks"
}
```

---

### 6. Activity Completion

#### Test 6.1: Complete Hands-on Activity
**Steps**:
1. Open lesson with activities (e.g., "AI Scavenger Hunt")
2. Complete the activity
3. Mark as complete

**Expected**:
- ✅ Activity marked complete in Progress
- ✅ Activity logged (activity_completed)
- ✅ Timestamp recorded

**API Test**:
```javascript
POST http://localhost:3000/api/tracking/activity/complete
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "lessonId": "LESSON_ID",
  "activityId": "ACTIVITY_ID"
}
```

---

### 7. Homework Submission

#### Test 7.1: Submit Homework
**Steps**:
1. Open lesson with homework (e.g., Day 2 Session 4)
2. Complete homework assignment
3. Submit via submission form

**Expected**:
- ✅ Submission created
- ✅ Status: "submitted"
- ✅ Student can view submission
- ✅ Instructor notified (if notifications enabled)

**API Test**:
```javascript
POST http://localhost:3000/api/submissions
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "lessonId": "LESSON_ID",
  "courseId": "COURSE_ID",
  "submissionType": "homework",
  "content": "My homework answers...",
  "fileUrls": ["https://drive.google.com/file/..."]
}
```

#### Test 7.2: Instructor Grades Homework
**Steps** (As Instructor):
1. Navigate to "Submissions" or "Grading"
2. Find student submission
3. Grade with rubric (5 criteria)
4. Provide feedback
5. Submit grade

**Expected**:
- ✅ Score calculated from rubric
- ✅ Status changed to "graded"
- ✅ Student can view grade & feedback
- ✅ Activity logged (submission_graded)

**API Test**:
```javascript
PUT http://localhost:3000/api/submissions/:submissionId/grade
Authorization: Bearer INSTRUCTOR_JWT_TOKEN
Content-Type: application/json

{
  "score": 85,
  "feedback": "Great work! Clear explanations.",
  "rubricScores": [
    {
      "criterion": "Technical Implementation",
      "score": 25,
      "maxScore": 30,
      "feedback": "Good code quality"
    }
  ]
}
```

---

### 8. Attendance Tracking

#### Test 8.1: Record Attendance
**Steps** (Instructor):
1. After each session, mark attendance
2. Record which lessons were covered

**API Test**:
```javascript
POST http://localhost:3000/api/tracking/attendance
Authorization: Bearer STUDENT_JWT_TOKEN
Content-Type: application/json

{
  "courseId": "COURSE_ID",
  "date": "2025-12-01",
  "present": true,
  "duration": 180,  // minutes
  "lessonsCovered": ["LESSON_ID_1", "LESSON_ID_2"]
}
```

**Expected**:
- ✅ Attendance record created
- ✅ Attendance percentage calculated
- ✅ Used for certification eligibility

---

### 9. Final Project Submission

#### Test 9.1: Submit Final Project
**Steps** (Day 9-10):
1. Complete final project
2. Submit via project submission form
3. Include: code, documentation, visualizations

**API Test**:
```javascript
POST http://localhost:3000/api/submissions
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "lessonId": "DAY_9_SESSION_4_LESSON_ID",
  "courseId": "COURSE_ID",
  "submissionType": "project",
  "content": "# Final Project: Sentiment Analyzer\n\n## Overview...",
  "fileUrls": [
    "https://colab.research.google.com/drive/...",
    "https://drive.google.com/file/presentation..."
  ]
}
```

#### Test 9.2: Instructor Grades with Rubric
**Grading Criteria** (100 points):
- Technical (30pts)
- Results (20pts)
- Ethics (15pts)
- Data Quality (15pts)
- Presentation (20pts)

**Expected**:
- ✅ Score ≥85 → Eligible for AI Developer 🥇
- ✅ Score ≥75 → Eligible for AI Practitioner 🥈
- ✅ Score ≥70 → Eligible for AI Literacy 🥉

---

### 10. Certification System

#### Test 10.1: Automatic Tier Calculation
**Scenario**: Student completes all requirements

**Criteria Check**:
```
AI Developer 🥇:
✅ 100% attendance (10/10 days)
✅ 90%+ average quiz score
✅ 85%+ final project score
→ Eligible for AI Developer

AI Practitioner 🥈:
✅ 85%+ attendance (8-9 days)
✅ 75%+ average quiz score
✅ 75%+ final project score
→ Eligible for AI Practitioner

AI Literacy 🥉:
✅ 80%+ attendance (8 days)
✅ 70%+ average quiz score
✅ Project submitted
→ Eligible for AI Literacy
```

#### Test 10.2: Issue Certificate
**Steps** (Instructor):
1. Review student progress
2. Click "Issue Certificate"
3. System calculates tier automatically
4. Certificate generated with verification code

**API Test**:
```javascript
POST http://localhost:3000/api/certificates/issue/:courseId
Authorization: Bearer INSTRUCTOR_JWT_TOKEN
Content-Type: application/json

{
  "studentId": "STUDENT_ID"
}
```

**Expected**:
- ✅ Certificate created
- ✅ 32-character verification code generated (crypto.randomBytes)
- ✅ Tier determined automatically
- ✅ Certificate URL created
- ✅ Activity logged (certificate_earned)
- ✅ Student notified

#### Test 10.3: Verify Certificate (Public)
**Steps** (Anyone - No login required):
1. Go to certificate verification page
2. Enter verification code
3. Submit

**API Test**:
```javascript
GET http://localhost:3000/api/certificates/verify/:verificationCode
// NO AUTHORIZATION REQUIRED
```

**Expected**:
- ✅ Certificate details shown:
  - Student name
  - Course name
  - Tier (🥇/🥈/🥉)
  - Issue date
  - Organization: ACCN-Hub
  - Skills acquired
- ✅ Invalid code → "Certificate not found"
- ✅ Revoked certificate → "Certificate revoked"

---

### 11. Analytics & Reporting

#### Test 11.1: Instructor Course Analytics
**Steps** (Instructor):
1. Navigate to "Analytics" or "Reports"
2. Select "AI Fundamentals Certification"
3. View metrics

**API Test**:
```javascript
GET http://localhost:3000/api/tracking/analytics/course/:courseId
Authorization: Bearer INSTRUCTOR_JWT_TOKEN
```

**Expected Metrics**:
- Total enrolled students
- Average completion rate
- Average quiz scores per lesson
- Videos watched count
- Resources clicked count
- Activities completed count
- Attendance percentage
- Submissions pending review
- Certificates issued breakdown

#### Test 11.2: Student Engagement Report
**Steps** (Instructor):
1. Select specific student
2. View engagement report

**API Test**:
```javascript
GET http://localhost:3000/api/tracking/analytics/student/:studentId/course/:courseId
Authorization: Bearer INSTRUCTOR_JWT_TOKEN
```

**Expected Data**:
- Total activities logged
- Videos watched (titles, completion %)
- Quizzes taken (scores, attempts)
- Resources clicked
- Attendance records
- Submissions status
- Current progress percentage

---

### 12. Security Testing

#### Test 12.1: Content Security Policy (CSP)
**Steps**:
1. Open lesson with YouTube embed
2. Open lesson with Google Colab link
3. Check browser console for CSP violations

**Expected**:
- ✅ YouTube embeds work (allowed in frame-src)
- ✅ Google Colab embeds work
- ✅ Kaggle embeds work
- ✅ Teachable Machine embeds work
- ❌ Unknown/untrusted sites blocked

#### Test 12.2: Quiz Answer Security
**Steps**:
1. Take quiz as student
2. Inspect network requests
3. Check API response

**Expected**:
- ❌ Correct answers NOT visible in GET /lessons/:id response
- ❌ Correct answers NOT in frontend HTML/JS
- ✅ Answers only revealed AFTER quiz submission
- ✅ select: false on correctAnswer field works

#### Test 12.3: Rate Limiting
**Test Auth Endpoints**:
```bash
# Try logging in 6 times within 15 minutes
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
done
```

**Expected**:
- ✅ First 5 attempts allowed
- ❌ 6th attempt blocked
- ✅ Response: "Too many requests, please try again later"

**Test API Endpoints**:
```bash
# Try 101 requests within 15 minutes
for i in {1..101}; do
  curl http://localhost:3000/api/courses
done
```

**Expected**:
- ✅ First 100 allowed
- ❌ 101st blocked

#### Test 12.4: Permission Denied Logging
**Steps**:
1. Try accessing instructor-only route as student
2. Check activity logs

**Expected**:
- ❌ Access denied
- ✅ Activity logged (permission_denied)
- ✅ Details: attempted action, role, resource

---

### 13. Activity Logging Verification

#### Test 13.1: Check All Activity Types Logged
**Query MongoDB** (30+ activity types):

```javascript
// In MongoDB Compass or shell
db.activitylogs.aggregate([
  { $group: { _id: "$activityType", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

**Expected Activity Types**:
- ✅ login_success
- ✅ login_failed
- ✅ course_enrolled
- ✅ lesson_viewed
- ✅ video_started
- ✅ video_progress
- ✅ video_completed
- ✅ resource_clicked
- ✅ activity_completed
- ✅ quiz_submitted
- ✅ quiz_passed
- ✅ quiz_failed
- ✅ submission_created
- ✅ submission_graded
- ✅ certificate_earned
- ✅ permission_denied

---

### 14. Edge Cases & Error Handling

#### Test 14.1: Quiz with 0 Attempts Remaining
**Steps**:
1. Fail quiz 3 times
2. Try 4th attempt

**Expected**:
- ❌ Quiz submission blocked
- ✅ Error: "No attempts remaining"

#### Test 14.2: Late Submission
**Steps**:
1. Submit homework after dueDate

**Expected**:
- ✅ Submission accepted
- ✅ isLate flag set to true
- ✅ Visible to instructor

#### Test 14.3: Missing Data Handling
**API Tests**:
```javascript
// Submit quiz without answers
POST /api/lessons/:id/quiz
Body: { "timeSpent": 60 }
// Expected: 400 Bad Request

// Track video without duration
POST /api/tracking/video/progress
Body: { "lessonId": "123" }
// Expected: 400 Bad Request
```

---

## 🔍 Manual Testing Checklist

### Frontend Testing
- [ ] Login/logout works
- [ ] Registration creates account
- [ ] Dashboard loads correctly
- [ ] Course list displays
- [ ] Enrollment button works
- [ ] Lesson navigation works
- [ ] Video embeds play
- [ ] Resource links open
- [ ] Quiz form submits
- [ ] Results display correctly
- [ ] Progress bar updates
- [ ] Mobile responsive

### Backend API Testing
- [ ] All POST endpoints validate input
- [ ] All protected routes require JWT
- [ ] Error responses are consistent
- [ ] Success responses include data
- [ ] Pagination works (if implemented)
- [ ] Filtering works (if implemented)

### Database Testing
- [ ] Data saves correctly
- [ ] Relationships maintained (refs)
- [ ] Indexes improve query speed
- [ ] No duplicate records
- [ ] Cascading deletes work (if any)

---

## 📊 Success Criteria

### System is PASSING if:
✅ All authentication flows work  
✅ Course enrollment successful  
✅ Video tracking saves progress  
✅ Quizzes enforce attempt limits  
✅ Quiz answers hidden from students  
✅ Activity logging captures all events  
✅ Submissions can be created & graded  
✅ Certificates issue automatically  
✅ Verification works without login  
✅ Analytics show correct metrics  
✅ Rate limiting blocks excess requests  
✅ CSP allows trusted embeds only  
✅ No console errors  
✅ Mobile responsive  

---

## 🐛 Known Issues to Check

1. **Video Tracking**: Does it work with all YouTube embed formats?
2. **Quiz Timer**: Is timeSpent accurately calculated?
3. **Attendance**: Can students manipulate attendance records?
4. **Certificate Revocation**: Does it update Progress.certificate reference?
5. **Large File Uploads**: File URLs stored, but no actual upload implemented yet
6. **Email Notifications**: Not implemented yet (grades, certificates)

---

## 🚀 Next Steps After Testing

1. **Fix any bugs found**
2. **Implement frontend tracking code** (video progress, resource clicks)
3. **Add file upload service** (AWS S3 or local storage)
4. **Implement email notifications**
5. **Create analytics dashboards UI**
6. **Add certificate PDF generation**
7. **Build admin panel**
8. **Performance testing** (load testing with many users)
9. **Security audit** (penetration testing)
10. **Deploy to production**

---

## 📝 Test Report Template

After testing, document:

```markdown
## Test Date: [DATE]
## Tester: [NAME]

### Tests Passed: X/Y
### Tests Failed: Z

### Critical Issues:
1. [Issue description]

### Minor Issues:
1. [Issue description]

### Recommendations:
1. [Recommendation]

### Screenshots:
[Attach screenshots of bugs]
```

---

## 💡 Pro Testing Tips

1. **Test with multiple browsers**: Chrome, Firefox, Edge, Safari
2. **Test mobile**: Use Chrome DevTools device emulation
3. **Test slow connections**: Throttle network in DevTools
4. **Test edge cases**: Empty data, maximum lengths, special characters
5. **Test permissions**: Try accessing routes with wrong roles
6. **Test concurrency**: Multiple users enrolling simultaneously
7. **Use browser console**: Check for JavaScript errors
8. **Monitor Network tab**: Verify API calls succeed
9. **Check MongoDB**: Verify data persists correctly
10. **Test logout**: Ensure sessions clear properly

---

**Good luck testing! 🎉**
