# ACCN Hub - Quick Start Guide

## ✅ What's Complete:

### Backend (Fully Functional):
- ✅ User authentication (register/login)
- ✅ Course management (create, edit, delete, publish)
- ✅ Lesson management (create, view, complete)
- ✅ Progress tracking (completion, points, achievements)
- ✅ Student enrollment
- ✅ Quiz system
- ✅ Activity logging
- ✅ Instructor analytics

### Frontend (Ready to Use):
- ✅ Modern, responsive design
- ✅ Student dashboard
- ✅ Instructor dashboard
- ✅ Course browser
- ✅ Lesson viewer
- ✅ Authentication forms

## 🚀 Getting Started (First Time Setup):

### Step 1: Install Dependencies
```bash
cd D:\ACCN-Hub
npm install
```

### Step 2: Set Up Database

**Option A: Local MongoDB** (Simpler for testing)
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Your connection string: `mongodb://localhost:27017/accn-hub`

**Option B: MongoDB Atlas** (Free cloud database - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Click "Build a Database" → Choose FREE tier (M0)
4. Click "Create"
5. Create database user (username/password)
6. Add your IP address (or 0.0.0.0/0 for anywhere)
7. Click "Connect" → "Connect your application"
8. Copy the connection string

### Step 3: Configure Environment
```bash
copy .env.example .env
```

Edit `.env` file:
```env
# Required settings:
MONGODB_URI=your-mongodb-connection-string-here
JWT_SECRET=any-random-long-string-here
PORT=3000

# Optional (for later):
CONTENT_API_KEY=your-key-here
YOUTUBE_API_KEY=your-key-here
```

### Step 4: Start the Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: ...
Server running on port 3000
Access at http://localhost:3000
```

### Step 5: Create First Accounts

1. Open http://localhost:3000
2. Click "Create Account"
3. Fill in details, select "Instructor" role
4. Click "Create Account"

You're in! 🎉

## 📋 What You Can Do Now:

### As Instructor:
1. ✅ Create courses
2. ✅ Add lessons to courses  
3. ✅ Publish courses
4. ✅ View student progress
5. ✅ Track engagement analytics

### As Student:
1. ✅ Browse courses
2. ✅ Enroll in courses
3. ✅ Complete lessons
4. ✅ Take quizzes
5. ✅ Earn points and achievements
6. ✅ Get certificates (automatic when course complete)

## 🔧 Common Issues:

### "Cannot connect to database"
- Check if MongoDB is running
- Verify connection string in `.env`
- For Atlas: Check IP whitelist settings

### "Port 3000 already in use"
- Change PORT in `.env` to 3001 or another number
- Or stop other applications using port 3000

### "Module not found"
- Run `npm install` again
- Delete `node_modules` folder and run `npm install`

## 📊 Testing the Platform:

### Create a Test Course:
1. Login as instructor
2. Click "Create New Course"
3. Fill in:
   - Title: "Introduction to Robotics"
   - Track: Mechanical
   - Description: "Learn the basics"
   - Difficulty: Beginner
4. Click "Create Course"

### Add a Test Lesson (Manual):
Use API testing tool (Postman) or create through code:
```bash
POST http://localhost:3000/api/lessons
Headers:
  Authorization: Bearer YOUR_TOKEN
  Content-Type: application/json
Body:
{
  "courseId": "YOUR_COURSE_ID",
  "title": "Lesson 1: Safety First",
  "order": 1,
  "content": "<h3>Welcome!</h3><p>In this lesson...</p>",
  "duration": "30 minutes",
  "objectives": ["Learn safety protocols", "Identify tools"],
  "quiz": [
    {
      "question": "Safety glasses are required in the workshop",
      "options": ["True", "False"],
      "correctAnswer": 0,
      "points": 10
    }
  ]
}
```

## 🎯 Next Steps:

### Phase 2 Features (Coming):
- 📄 Word document → lesson converter
- 🎥 Automatic video recommendations
- 📧 Email notifications
- 🏆 Advanced gamification
- 📱 Mobile app

### Current Limitations:
- Lessons must be created via API (manual for now)
- No drag-and-drop file upload yet
- Certificate generation structure ready (PDF creation pending)

## 💡 Tips:

1. **Test with multiple accounts**: Create both instructor and student accounts to test full functionality

2. **Use Postman/Insomnia**: For easier API testing while building lessons

3. **Check browser console**: Useful for debugging frontend issues

4. **MongoDB Compass**: Free GUI for viewing/editing database (https://www.mongodb.com/products/compass)

## 📞 Need Help?

The platform is fully functional! If you encounter issues:
1. Check terminal for error messages
2. Check browser console (F12)
3. Verify all environment variables are set
4. Ensure MongoDB is running and accessible

---

**Ready to build the future of learning!** 🚀
