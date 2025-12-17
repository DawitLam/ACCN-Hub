# ACCN Hub - Complete Setup Guide

## Quick Start (15 minutes to running)

### Step 1: Set Up MongoDB Atlas (5 minutes)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up (free, no credit card needed)

2. **Create Cluster**
   - Click "Build a Database"
   - Choose **FREE** tier (M0)
   - Select region closest to you
   - Click "Create"

3. **Create Database User**
   - Username: `accn_admin` (or your choice)
   - Password: Click "Autogenerate Secure Password" and **save it**
   - Click "Create User"

4. **Add IP Address**
   - Click "Add My Current IP Address"
   - Or add `0.0.0.0/0` (allow from anywhere - for development)
   - Click "Finish and Close"

5. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string:
   ```
   mongodb+srv://accn_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password

### Step 2: Configure Environment (2 minutes)

1. **Copy environment template**
   ```powershell
   Copy-Item .env.example .env
   ```

2. **Edit .env file** - Open `d:\ACCN-Hub\.env` and update:
   ```env
   NODE_ENV=development
   PORT=3000
   
   # Paste your MongoDB connection string here (replace <password> with actual password)
   MONGODB_URI=mongodb+srv://accn_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/accn-hub?retryWrites=true&w=majority
   
   # Generate a random string (or use: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
   JWT_SECRET=your-super-secret-random-string-here-make-it-long-and-random
   JWT_EXPIRE=7d
   
   # Optional - Leave blank for now
   CONTENT_API_KEY=
   YOUTUBE_API_KEY=
   EMAIL_HOST=
   EMAIL_PORT=
   EMAIL_USER=
   EMAIL_PASSWORD=
   
   FRONTEND_URL=http://localhost:3000
   ```

3. **Generate JWT Secret** (Run in PowerShell):
   ```powershell
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Copy the output and paste it as your JWT_SECRET

### Step 3: Install Dependencies (3 minutes)

```powershell
cd d:\ACCN-Hub
npm install
```

### Step 4: Start the Server (1 minute)

```powershell
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
Server started on port 3000
Access at http://localhost:3000
```

### Step 5: Open and Test (2 minutes)

1. Open browser: http://localhost:3000
2. Click "Create Account"
3. Fill in details:
   - First Name: Your name
   - Last Name: Your last name
   - Email: your@email.com
   - Password: Test1234 (or stronger)
   - Role: **Instructor** (to create courses)
4. Click "Create Account"

**You're in!** 🎉

---

## What You Can Do Now

### As Instructor:
1. **Create a Course**
   - Click "Create New Course"
   - Fill in course details
   - Click "Create Course"

2. **Publish Course**
   - Click "Publish" on your course card
   - Now students can enroll

3. **Create Lessons** (Currently via API - UI coming soon)
   - Use the API endpoint or wait for lesson creation UI

### As Student:
1. Create another account with "Student" role
2. Browse available courses
3. Enroll in courses
4. Complete lessons
5. Earn points and achievements

---

## Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Check connection string in .env has correct password
- ✅ Verify IP address is whitelisted in MongoDB Atlas
- ✅ Ensure cluster is active (not paused)

### "Port 3000 already in use"
- Change PORT in .env to 3001
- Or stop other process using port 3000

### "Module not found"
- Run `npm install` again
- Delete node_modules folder: `Remove-Item -Recurse -Force node_modules`
- Then `npm install`

### "JWT secret missing"
- Make sure JWT_SECRET is set in .env file
- Must be at least 32 characters

---

## Next Steps

### Immediate:
- [ ] Create your first course
- [ ] Test student enrollment flow
- [ ] Review instructor dashboard

### Phase 2 - Content Generation:
- [ ] Add lesson creation UI
- [ ] Implement Word document upload
- [ ] Add quiz generator
- [ ] Video content recommendations

### Phase 3 - Production:
- [ ] Deploy to production server
- [ ] Set up domain name
- [ ] Configure SSL certificate
- [ ] Set up email notifications
- [ ] Review security checklist

---

## Quick Reference

### Start Server
```powershell
npm run dev
```

### Check Logs
Watch the terminal for errors and status messages

### View Database
- MongoDB Atlas Dashboard: https://cloud.mongodb.com
- Or install MongoDB Compass: https://www.mongodb.com/products/compass

### API Endpoints
- POST `/api/auth/register` - Create account
- POST `/api/auth/login` - Login
- GET `/api/courses` - Get all courses
- POST `/api/courses` - Create course (instructor)
- GET `/api/courses/:id` - Get course details
- POST `/api/courses/:id/enroll` - Enroll in course (student)

---

## Support Files

- **Security Guide**: `docs/SECURITY.md`
- **Deployment Guide**: `docs/DEPLOYMENT.md`
- **Improvements Log**: `docs/IMPROVEMENTS.md`
- **Quick Start**: `QUICKSTART.md`

---

**Ready to build the future of learning!** 🚀
