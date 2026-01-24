# MongoDB Connection Guide

## Current Issue
❌ **IP Address Not Whitelisted** - Your current IP address is not authorized to access MongoDB Atlas cluster.

## Solutions

### Option 1: Whitelist Your IP in MongoDB Atlas (Recommended for Cloud)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in with your credentials
3. Select your cluster: **clusterlms**
4. Click **Network Access** in the left sidebar
5. Click **Add IP Address**
6. Choose one of:
   - **Add Current IP Address** (for your current network)
   - **Allow Access from Anywhere** (0.0.0.0/0) - ⚠️ Less secure, use for testing only
7. Click **Confirm**
8. Wait 1-2 minutes for changes to take effect
9. Restart the server: `node server.js`

### Option 2: Install and Use Local MongoDB

#### Windows Installation:
```powershell
# Using Chocolatey
choco install mongodb

# Or download from: https://www.mongodb.com/try/download/community
```

#### After Installation:
1. Start MongoDB:
```powershell
# Create data directory
New-Item -ItemType Directory -Path "D:\ACCN-Hub\data\db" -Force

# Start MongoDB
mongod --dbpath="D:\ACCN-Hub\data\db"
```

2. Update `.env` file:
```env
# Comment out Atlas connection
# MONGODB_URI=mongodb+srv://accn_Admin:accn_Admin@clusterlms.nfwnumn.mongodb.net/accn-hub

# Use local connection
MONGODB_URI=mongodb://localhost:27017/accn-hub
```

3. Restart server:
```powershell
cd D:\ACCN-Hub\backend
node server.js
```

### Option 3: Use MongoDB Docker Container

```powershell
# Pull and run MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Update .env to use local connection
# MONGODB_URI=mongodb://localhost:27017/accn-hub
```

## Testing Connection

Once connected successfully, you should see:
```
✅ MongoDB Connected: clusterlms.nfwnumn.mongodb.net
Server running on port 3000
```

## Current Connection String
- **Atlas**: `mongodb+srv://accn_Admin:accn_Admin@clusterlms.nfwnumn.mongodb.net/accn-hub`
- **Local**: `mongodb://localhost:27017/accn-hub`

## Next Steps After Connection

1. Test the lessons API endpoints
2. Seed the database with test data
3. Run the curriculum seed script: `node scripts/seedAICurriculum.js`
