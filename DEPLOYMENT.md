# ACCN Hub Deployment Guide

Complete guide for deploying ACCN Hub to production hosting platforms.

---

## Table of Contents

1. [Deployment Modes](#deployment-modes)
2. [Prerequisites](#prerequisites)
3. [MongoDB Atlas Setup](#mongodb-atlas-setup)
4. [Platform-Specific Guides](#platform-specific-guides)
   - [Vercel (Recommended for Static + Serverless)](#vercel-deployment)
   - [Railway (Recommended for Full Node.js)](#railway-deployment)
   - [Render](#render-deployment)
   - [Heroku](#heroku-deployment)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Deployment Modes

ACCN Hub supports two deployment modes:

### 🎓 **Curriculum Viewer Mode** (Simple)
- **Features:** View curriculum content only
- **Database:** Optional (MongoDB not required)
- **Best For:** Quick deployment, curriculum sharing
- **Environment:** `MONGODB_OPTIONAL=true`

### 🎯 **Full LMS Mode** (Complete)
- **Features:** User accounts, progress tracking, certificates, quizzes
- **Database:** Required (MongoDB Atlas)
- **Best For:** Production course delivery
- **Environment:** `MONGODB_URI=mongodb+srv://...`

---

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub repository with your ACCN Hub code
- [ ] MongoDB Atlas account (for Full LMS Mode)
- [ ] Hosting platform account (Vercel, Railway, Render, or Heroku)
- [ ] Domain name (optional, but recommended for production)

---

## MongoDB Atlas Setup

**Required for Full LMS Mode only**

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and create an account
3. Choose the **FREE tier** (M0 Sandbox - 512MB storage)

### Step 2: Create a Cluster

1. After login, click "Build a Database"
2. Select **M0 Free tier**
3. Choose a cloud provider and region (closest to your users)
4. Name your cluster (e.g., "accn-hub-cluster")
5. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Create credentials:
   - Username: `accn-admin` (or your choice)
   - Password: Generate strong password (save this!)
4. User Privileges: **Read and write to any database**
5. Click "Add User"

### Step 4: Configure Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. **IMPORTANT:** Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for hosting platforms with dynamic IPs
4. Confirm and add

### Step 5: Get Connection String

1. Go to "Database" in sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string, it looks like:
   ```
   mongodb+srv://accn-admin:<password>@accn-hub-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual database user password
6. Add your database name after `.mongodb.net/`:
   ```
   mongodb+srv://accn-admin:YOUR_PASSWORD@accn-hub-cluster.xxxxx.mongodb.net/accn-hub?retryWrites=true&w=majority
   ```

**Save this connection string** - you'll need it for deployment!

---

## Platform-Specific Guides

## Vercel Deployment

**Best For:** Simple curriculum viewer or static frontend

### Quick Deploy

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

3. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: **Other**
     - Build Command: `npm install`
     - Output Directory: `frontend`
     - Install Command: `npm install`

4. **Add Environment Variables**:
   Click "Environment Variables" and add:

   **For Curriculum Viewer Only:**
   ```
   NODE_ENV=production
   MONGODB_OPTIONAL=true
   ```

   **For Full LMS:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://accn-admin:YOUR_PASSWORD@cluster.mongodb.net/accn-hub
   JWT_SECRET=[generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"]
   SESSION_SECRET=[another random string]
   FRONTEND_URL=https://your-app.vercel.app
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at `https://your-project.vercel.app`

### Custom Domain (Optional)

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed

---

## Railway Deployment

**Best For:** Full Node.js applications with backend

### Deploy Steps

1. **Go to [Railway.app](https://railway.app)**
2. Click "Start a New Project"
3. Choose "Deploy from GitHub repo"
4. Select your ACCN Hub repository

5. **Configure Build Settings**:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `/` (leave default)

6. **Add Environment Variables**:
   Go to "Variables" tab and add:

   ```
   NODE_ENV=production
   PORT=${{PORT}}
   MONGODB_URI=mongodb+srv://accn-admin:YOUR_PASSWORD@cluster.mongodb.net/accn-hub
   JWT_SECRET=[generate secure random string]
   SESSION_SECRET=[another random string]
   FRONTEND_URL=https://your-app.up.railway.app
   ```

7. **Deploy**:
   - Railway auto-deploys on git push
   - Get your URL from the "Deployments" tab
   - Format: `https://your-project.up.railway.app`

### MongoDB Atlas Whitelist

Railway uses dynamic IPs, so ensure MongoDB Atlas Network Access is set to **0.0.0.0/0** (allow from anywhere).

---

## Render Deployment

**Best For:** Full-stack applications with free tier

### Deploy Steps

1. **Go to [Render.com](https://render.com)**
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: `accn-hub`
   - Environment: **Node**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: **Free** (or Starter for better performance)

5. **Environment Variables**:
   Add in the "Environment" section:

   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://accn-admin:YOUR_PASSWORD@cluster.mongodb.net/accn-hub
   JWT_SECRET=[generate secure key]
   SESSION_SECRET=[random string]
   FRONTEND_URL=https://accn-hub.onrender.com
   ```

6. **Create Service**:
   - Click "Create Web Service"
   - First deploy takes 5-10 minutes
   - URL: `https://your-service.onrender.com`

### Important Notes

- Free tier services spin down after 15 min inactivity
- First request after inactivity may take 30-60 seconds (cold start)
- Consider Starter plan ($7/month) for always-on service

---

## Heroku Deployment

**Note:** Heroku eliminated free tier in November 2022. Minimum cost: $7/month.

### Deploy Steps

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**:
   ```bash
   heroku login
   heroku create accn-hub
   ```

3. **Add Environment Variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI="mongodb+srv://accn-admin:YOUR_PASSWORD@cluster.mongodb.net/accn-hub"
   heroku config:set JWT_SECRET="$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")"
   heroku config:set SESSION_SECRET="$(openssl rand -hex 32)"
   heroku config:set FRONTEND_URL="https://accn-hub.herokuapp.com"
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

5. **Open App**:
   ```bash
   heroku open
   ```

---

## Environment Variables

### Required for All Deployments

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (auto-set by most platforms) | `3000` or `$PORT` |

### Required for Full LMS

| Variable | Description | How to Get |
|----------|-------------|------------|
| `MONGODB_URI` | MongoDB connection string | [See MongoDB Setup](#mongodb-atlas-setup) |
| `JWT_SECRET` | Secret key for authentication tokens | Run: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `SESSION_SECRET` | Secret for session management | Run: `openssl rand -hex 32` |
| `FRONTEND_URL` | Your app's URL | Your hosting platform URL |

### Optional

| Variable | Description | Required For |
|----------|-------------|--------------|
| `MONGODB_OPTIONAL` | Run without database | Curriculum viewer mode |
| `CONTENT_API_KEY` | OpenAI API key | AI lesson generation |
| `YOUTUBE_API_KEY` | YouTube API key | Video recommendations |
| `EMAIL_HOST` | SMTP server | Email notifications |
| `EMAIL_USER` | Email username | Email notifications |
| `EMAIL_PASSWORD` | Email password/app password | Email notifications |

---

## Post-Deployment

### 1. Verify Deployment

Visit your deployed URL and check:
- [ ] Homepage loads correctly
- [ ] Curriculum viewer works
- [ ] No console errors (open browser DevTools)

### 2. Test Full LMS Features (if enabled)

- [ ] User registration works
- [ ] Login/logout works
- [ ] Progress tracking saves correctly
- [ ] Quizzes submit properly
- [ ] Certificates generate

### 3. Configure Domain (Optional)

1. Purchase domain from Namecheap, Google Domains, or Cloudflare
2. Add custom domain in your hosting platform
3. Update DNS records:
   - **Vercel:** CNAME record → `cname.vercel-dns.com`
   - **Railway:** CNAME record → Provided by Railway
   - **Render:** CNAME record → Provided by Render

4. Update `FRONTEND_URL` environment variable to your custom domain

### 4. Security Checklist

- [ ] All sensitive credentials in environment variables (not in code)
- [ ] JWT_SECRET and SESSION_SECRET are strong random strings
- [ ] MongoDB Atlas has proper user permissions
- [ ] HTTPS is enabled (automatic on most platforms)
- [ ] CORS is configured properly (`FRONTEND_URL`)

---

## Troubleshooting

### MongoDB Connection Fails

**Error:** `MongooseServerSelectionError: Could not connect to any servers`

**Solutions:**
1. Check MongoDB Atlas Network Access allows `0.0.0.0/0`
2. Verify MONGODB_URI format:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/accn-hub?retryWrites=true&w=majority
   ```
3. Ensure password has no special characters requiring URL encoding
4. Check MongoDB cluster is running (not paused)

### App Crashes on Start

**Check deployment logs:**
- Vercel: Dashboard → Deployments → View Logs
- Railway: Deployments → View Logs
- Render: Logs tab
- Heroku: `heroku logs --tail`

**Common causes:**
- Missing required environment variables
- MongoDB connection issues
- Port binding errors (ensure `PORT` uses platform variable)

### 404 Errors

**Curriculum not loading:**
1. Verify files are in correct directory structure
2. Check `curriculum` folder is included in deployment
3. Ensure static file serving is configured in server.js

### Slow Performance (Render Free Tier)

- Free tier services sleep after 15 min inactivity
- First request takes 30-60 seconds (cold start)
- **Solution:** Upgrade to Starter plan ($7/month) for always-on

### Authentication Not Working

**Check:**
1. `JWT_SECRET` is set and same across deployments
2. `FRONTEND_URL` matches your actual domain
3. CORS is properly configured
4. Cookies are enabled in browser

---

## Support & Resources

### Documentation
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)

### Getting Help
- Check deployment platform logs first
- Verify all environment variables are set
- Test MongoDB connection separately
- Review this guide step-by-step

---

## Quick Reference: Platform Comparison

| Platform | Free Tier | Best For | Pros | Cons |
|----------|-----------|----------|------|------|
| **Vercel** | Yes | Static sites, serverless | Fast CDN, easy deploys | Limited server-side features |
| **Railway** | $5 free credit/month | Full Node.js apps | Easy setup, great DX | Credit-based pricing |
| **Render** | Yes (limited) | Full-stack apps | Simple, free tier | Cold starts on free tier |
| **Heroku** | No (min $7/mo) | Enterprise apps | Mature platform, addons | No free tier anymore |

---

**Last Updated:** February 2026
**Version:** 2.0.0
**Author:** ACCN Hub Team

