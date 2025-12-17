# MongoDB Atlas Connection Issue - Quick Fix

## Problem
The server cannot connect to MongoDB Atlas because your IP address is not whitelisted.

## Solution Options

### Option 1: Fix MongoDB Atlas IP Whitelist (RECOMMENDED)

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Login** with your account
3. **Select your cluster** (ClusterLMS)
4. Click **"Network Access"** in the left sidebar
5. Click **"Add IP Address"**
6. Choose one of:
   - **"Add Current IP Address"** (for your specific IP)
   - **"Allow Access from Anywhere"** (0.0.0.0/0) - for testing only

7. Click **"Confirm"**
8. Wait 1-2 minutes for the change to propagate

### Option 2: Check Your Current IP

Run this in PowerShell to see your current IP:
```powershell
(Invoke-WebRequest -Uri "https://api.ipify.org").Content
```

Then add this IP to MongoDB Atlas Network Access.

### Option 3: Use Local MongoDB (If Available)

If you have MongoDB installed locally:

1. Update `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/accn-hub
```

2. Start local MongoDB service
3. Run server again

## After Fixing

Once you've whitelisted your IP in MongoDB Atlas, run:

```powershell
cd d:\ACCN-Hub\backend
node server.js
```

The server should connect successfully and you'll see:
```
✅ MongoDB Connected: ac-2hs68yc-shard-00-02.nfwnumn.mongodb.net
[INFO] Server started on port 3000 {}
[INFO] Access at http://localhost:3000 {}
```

## Verify It's Working

1. Open browser: http://localhost:3000
2. Login with: dawitlg@gmail.com / dawit123
3. You should see your courses

## Testing the Framework

Once connected, access the new framework at:
```
http://localhost:3000/framework
```

---

**Note**: The new framework features (assignments, discussions, announcements, grades) are all ready - they just need the database connection to work!
