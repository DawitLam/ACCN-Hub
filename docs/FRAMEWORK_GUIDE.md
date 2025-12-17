# ACCN Hub - Professional Learning Management System Framework

## Overview

ACCN Hub has been transformed into a professional, enterprise-grade Learning Management System similar to Canvas, Moodle, and Google Classroom. The system now supports comprehensive course management, assignments, discussions, grading, and more.

## 🎯 Key Features

### 1. Course Management
- **Modular Structure**: Courses are organized into modules and lessons
- **Multiple Instructors**: Support for co-instructors and teaching assistants
- **Flexible Enrollment**: Open enrollment, approval-required, or invite-only
- **Course Formats**: Self-paced, scheduled, or hybrid learning
- **Rich Media**: Support for videos, documents, external resources

### 2. Assignment System
- **Multiple Types**: Essays, multiple choice, file uploads, coding assignments, projects
- **Grading Rubrics**: Define detailed grading criteria
- **Late Submissions**: Configurable policies with automatic penalties
- **File Attachments**: Support for multiple file uploads
- **Automated Grading**: For quiz-based assignments
- **Feedback System**: Rich text feedback from instructors

### 3. Discussion Forums
- **Threaded Discussions**: Organized conversation threads
- **Q&A Mode**: Stack Overflow-style question/answer format
- **Announcements**: One-way communication from instructors
- **Post Moderation**: Instructors can pin, lock, or delete posts
- **Like System**: Students can like helpful posts
- **Nested Replies**: Multi-level conversation threading
- **Graded Discussions**: Option to assign points for participation

### 4. Grading & Analytics
- **Grade Book**: Comprehensive grade tracking for all students
- **Category Weights**: Different weight for assignments, quizzes, participation
- **Letter Grades**: Automatic conversion to letter grades
- **Grade History**: Track grade changes over time
- **Drop Lowest**: Automatically drop lowest n scores per category
- **Export Grades**: Download grades as CSV for external analysis
- **Student View**: Students see only their own grades

### 5. Announcements
- **Priority Levels**: Low, medium, high, urgent
- **Email Notifications**: Automatic email to enrolled students
- **Scheduled Publishing**: Schedule announcements for future dates
- **Read Tracking**: See who has read each announcement
- **File Attachments**: Attach documents, images, etc.
- **Comments**: Students can comment on announcements
- **Pin Feature**: Keep important announcements at top

### 6. Calendar & Scheduling
- **Course Events**: Assignment due dates, exams, live sessions
- **Personal Events**: Students can add personal reminders
- **Multiple Views**: Month, week, day, agenda views
- **Color Coding**: Different colors for different courses
- **Reminders**: Email/push notifications before events
- **iCal Export**: Export calendar to external apps

### 7. User Roles & Permissions
- **Admin**: Full system access, can manage all courses and users
- **Instructor**: Create/manage courses, grade assignments, moderate discussions
- **Teaching Assistant**: Limited instructor privileges, grade assignments
- **Student**: Enroll in courses, submit assignments, participate in discussions
- **Guest**: View-only access to public courses

### 8. Professional Dashboard
- **Overview Cards**: Enrolled courses, pending assignments, grades, hours learned
- **Recent Activity**: Latest announcements, discussions, submissions
- **Progress Tracking**: Visual progress bars for each course
- **Quick Access**: Sidebar navigation to all courses and sections
- **Notifications**: Real-time updates on new content, grades, replies

## 📁 File Structure

```
ACCN-Hub/
├── backend/
│   ├── models/
│   │   ├── Course.js              # Original course model
│   │   ├── CourseV2.js            # Enhanced course model
│   │   ├── User.js
│   │   ├── Lesson.js
│   │   ├── Module.js              # NEW: Course modules
│   │   ├── Assignment.js          # NEW: Assignments
│   │   ├── Discussion.js          # NEW: Discussion forums
│   │   ├── Announcement.js        # NEW: Announcements
│   │   ├── Grade.js               # NEW: Grading system
│   │   ├── Progress.js
│   │   └── ActivityLog.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── lessons.js
│   │   ├── assignments.js         # NEW: Assignment routes
│   │   ├── discussions.js         # NEW: Discussion routes
│   │   ├── announcements.js       # NEW: Announcement routes
│   │   ├── grades.js              # NEW: Grading routes
│   │   ├── progress.js
│   │   └── tracking.js
│   └── server.js                  # Updated with new routes
├── frontend/
│   ├── framework.html             # NEW: Professional LMS interface
│   ├── index.html                 # Original interface
│   ├── css/
│   │   ├── framework.css          # NEW: Professional styling
│   │   ├── main.css
│   │   ├── student.css
│   │   └── instructor.css
│   └── js/
│       ├── framework.js           # NEW: Framework functionality
│       ├── auth.js
│       ├── student-dashboard.js
│       └── instructor-dashboard.js
└── docs/
    └── FRAMEWORK_GUIDE.md         # This file
```

## 🚀 Getting Started

### 1. Database Migration

The system uses enhanced models but maintains backward compatibility. To migrate existing data:

```bash
cd backend/scripts
node migrateToFramework.js
```

This will:
- Add new fields to existing courses
- Create grade records for enrolled students
- Initialize module structures

### 2. Access the New Interface

Two interfaces are available:

**Classic Interface** (Original):
- URL: `http://localhost:3000/`
- File: `frontend/index.html`
- Simple student/instructor views

**Framework Interface** (NEW):
- URL: `http://localhost:3000/framework`  
- File: `frontend/framework.html`
- Professional LMS experience

### 3. Server Configuration

The server automatically loads all new routes. No configuration needed.

## 🎓 Usage Guide

### For Instructors

#### Creating a Course
```javascript
POST /api/courses
{
  "title": "Advanced Machine Learning",
  "courseCode": "CS401",
  "description": "Deep dive into ML algorithms",
  "track": "AI/ML",
  "category": "academic",
  "format": "scheduled",
  "startDate": "2025-01-15",
  "endDate": "2025-05-15",
  "gradingScheme": "percentage",
  "features": {
    "discussions": true,
    "assignments": true,
    "liveClasses": true
  }
}
```

#### Creating an Assignment
```javascript
POST /api/assignments
{
  "course": "courseId",
  "title": "Neural Networks Project",
  "description": "Build a CNN for image classification",
  "type": "project",
  "points": 100,
  "dueDate": "2025-02-15T23:59:00Z",
  "allowLateSubmission": true,
  "lateSubmissionPenalty": 10,
  "rubric": [
    {
      "criterion": "Code Quality",
      "points": 30,
      "description": "Clean, documented code"
    },
    {
      "criterion": "Model Performance",
      "points": 40,
      "description": "Accuracy above 90%"
    },
    {
      "criterion": "Documentation",
      "points": 30,
      "description": "Clear README and report"
    }
  ]
}
```

#### Creating a Discussion
```javascript
POST /api/discussions
{
  "course": "courseId",
  "title": "Week 1: Introduction Discussion",
  "description": "Introduce yourself and share your AI experience",
  "type": "threaded",
  "graded": true,
  "points": 10,
  "requirePostBeforeViewing": true
}
```

#### Posting an Announcement
```javascript
POST /api/announcements
{
  "course": "courseId",
  "title": "Office Hours This Week",
  "content": "I'll be available...",
  "priority": "high",
  "isPinned": true,
  "sendEmail": true
}
```

### For Students

#### Submitting an Assignment
```javascript
POST /api/assignments/:id/submit
{
  "content": "My project submission...",
  "files": [
    {
      "name": "model.py",
      "url": "https://storage.../model.py",
      "type": "text/python"
    },
    {
      "name": "report.pdf",
      "url": "https://storage.../report.pdf",
      "type": "application/pdf"
    }
  ]
}
```

#### Posting in Discussion
```javascript
POST /api/discussions/:id/posts
{
  "content": "Great question! Here's my approach...",
  "attachments": [
    {
      "name": "example.png",
      "url": "https://storage.../example.png"
    }
  ]
}
```

#### Viewing Grades
```javascript
GET /api/grades/course/:courseId/my-grades

Response:
{
  "student": { "firstName": "John", "lastName": "Doe" },
  "gradeItems": [
    {
      "title": "Assignment 1",
      "points": 95,
      "maxPoints": 100,
      "category": "Assignments",
      "feedback": "Great work!",
      "gradedAt": "2025-01-20T..."
    }
  ],
  "overallGrade": {
    "points": 450,
    "percentage": 90,
    "letterGrade": "A-"
  }
}
```

## 🔧 API Endpoints

### Assignments
```
GET    /api/assignments/course/:courseId    - Get all assignments for course
GET    /api/assignments/:id                 - Get single assignment
POST   /api/assignments                     - Create assignment (instructor)
PUT    /api/assignments/:id                 - Update assignment (instructor)
DELETE /api/assignments/:id                 - Delete assignment (instructor)
POST   /api/assignments/:id/submit          - Submit assignment (student)
POST   /api/assignments/:id/grade/:submissionId - Grade submission (instructor)
```

### Discussions
```
GET    /api/discussions/course/:courseId    - Get all discussions
GET    /api/discussions/:id                 - Get single discussion
POST   /api/discussions                     - Create discussion (instructor)
POST   /api/discussions/:id/posts           - Create post
POST   /api/discussions/:id/posts/:postId/replies - Reply to post
POST   /api/discussions/:id/posts/:postId/like    - Like/unlike post
PATCH  /api/discussions/:id/posts/:postId/pin     - Pin/unpin post (instructor)
```

### Announcements
```
GET    /api/announcements/course/:courseId  - Get all announcements
POST   /api/announcements                   - Create announcement (instructor)
POST   /api/announcements/:id/read          - Mark as read
POST   /api/announcements/:id/comments      - Add comment
```

### Grades
```
GET    /api/grades/course/:courseId/my-grades           - Get my grades
GET    /api/grades/course/:courseId/all                 - Get all grades (instructor)
GET    /api/grades/course/:courseId/student/:studentId  - Get student grades
PUT    /api/grades/course/:courseId/student/:studentId/item/:itemId - Update grade item
GET    /api/grades/course/:courseId/export              - Export as CSV (instructor)
```

## 🎨 Customization

### Themes
The framework uses CSS custom properties for easy theming:

```css
:root {
    --primary-color: #2563eb;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    /* ... more variables */
}
```

### Branding
Update logo and branding:

```html
<!-- In framework.html -->
<div class="navbar-brand">
    <img src="/assets/images/your-logo.png" alt="Your LMS">
    <span class="brand-name">Your LMS Name</span>
</div>
```

## 🔒 Security Features

1. **Role-Based Access Control (RBAC)**
   - Fine-grained permissions per role
   - Route-level protection
   - Data-level filtering

2. **Data Validation**
   - Input sanitization
   - MongoDB injection prevention
   - XSS protection

3. **Authentication**
   - JWT tokens with 7-day expiration
   - Secure password hashing (bcrypt)
   - Rate limiting on auth endpoints

4. **Privacy**
   - Students see only their own grades
   - Instructors see only their courses
   - Admins have full access

## 📊 Analytics & Reporting

The system tracks:
- Student engagement (logins, time spent)
- Assignment submission rates
- Discussion participation
- Grade distributions
- Course completion rates

Export options:
- Gradebook as CSV
- Activity reports
- Participation metrics

## 🔄 Migration from Original System

Your existing AI course and data are preserved! The new features are additions:

**What stays the same:**
- All existing courses, lessons, users
- Current authentication system
- Student progress and enrollments

**What's new:**
- Professional interface option
- Assignment management
- Discussion forums
- Comprehensive grading
- Announcements
- Calendar

## 🚦 Next Steps

1. **Test the framework interface**: Visit `http://localhost:3000/framework`
2. **Create a test assignment**: Use the instructor view
3. **Post an announcement**: Communicate with students
4. **Start a discussion**: Engage the class
5. **Review grades**: See the new gradebook

## 📞 Support

For issues or questions:
- Check the logs: `backend/logs/`
- Review API responses
- Test with Postman/Thunder Client

## 🎯 Roadmap

Future enhancements:
- [ ] Real-time chat/messaging
- [ ] Video conferencing integration
- [ ] Mobile app
- [ ] Plagiarism detection
- [ ] AI-powered grading assistance
- [ ] Learning analytics dashboard
- [ ] Integration with external tools (Zoom, Google Drive)
- [ ] Peer review system
- [ ] Advanced quiz builder
- [ ] Collaborative documents

---

**Congratulations!** You now have a professional LMS framework. Your existing course content works seamlessly with all the new features.
