# ACCN Hub - Setup Guide

## Quick Start

### 1. Install Node.js
Download and install from: https://nodejs.org/ (version 16 or higher)

### 2. Install MongoDB
**Option A: Local Installation**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: Cloud Database (Recommended)**
- Create free account at: https://www.mongodb.com/cloud/atlas
- Create a cluster and get connection string

### 3. Install Project Dependencies
Open terminal in project folder and run:
```bash
npm install
```

### 4. Configure Environment
1. Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

2. Edit `.env` file with your settings:
- Set your MongoDB connection string
- Set a secure JWT secret
- Add your OpenAI API key (for lesson generation feature)

### 5. Start the Server
```bash
npm run dev
```

The platform will be available at: http://localhost:3000

## First Time Setup

### Create First Instructor Account:
1. Open http://localhost:3000
2. Click "Create Account"
3. Fill in your details
4. Select "Instructor" role
5. Click "Create Account"

### Create First Course:
1. Log in as instructor
2. Click "Create New Course"
3. Fill in course details
4. Add lessons manually or upload Word documents

## Features Overview

### Current Features (Phase 1):
✅ User authentication (login/register)
✅ Role-based access (student/instructor)
✅ Course management
✅ Lesson tracking
✅ Progress monitoring
✅ Basic dashboard

### Coming Soon (Phase 2):
🔄 Lesson content upload from Word documents
🔄 Automatic question generation
🔄 Video content suggestions
🔄 Enhanced gamification

### Future (Phase 3):
📅 Certificate generation
📅 Advanced analytics
📅 Email notifications
📅 Mobile responsive improvements

## Troubleshooting

### Cannot connect to database:
- Check if MongoDB is running
- Verify connection string in `.env` file
- Check firewall settings

### Port already in use:
- Change PORT in `.env` file
- Or stop other applications using port 3000

### Login not working:
- Clear browser cache and cookies
- Check browser console for errors
- Verify server is running

## Need Help?

Contact: ACCN's Programs

---

Happy Learning! 🚀
