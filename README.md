# ACCN Hub - Advanced Learning Management System

## Overview
ACCN Hub is a comprehensive Learning Management System designed for Umoja Robotics and future educational programs. The platform features AI-powered lesson generation, automated progress tracking, and certificate generation.

## Features

### For Students:
- ✅ Secure login with access permissions
- 📚 Progressive lesson unlocking based on completion
- 🎯 Interactive quizzes and assessments
- 🏆 Gamification with points and badges
- 📜 Automatic certificate generation upon course completion
- 📊 Personal progress dashboard

### For Instructors:
- 🤖 AI-powered lesson generation from Word documents
- ✏️ Easy content editing and management
- 👥 Student progress monitoring
- 📈 Activity and engagement analytics
- 🎥 Automatic video content suggestions
- ❓ AI-generated quiz questions

### Technical Features:
- 🔐 JWT-based authentication
- 📱 Responsive design (mobile-friendly)
- 🗄️ MongoDB database for scalability
- 🎨 Modern, accessible UI
- 📝 Activity logging and audit trails
- 🔄 RESTful API architecture

## Tech Stack

### Frontend:
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design with Flexbox/Grid
- Fetch API for backend communication

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

### AI Integration:
- OpenAI GPT-4 API for content generation
- Mammoth.js for Word document parsing
- YouTube Data API for video recommendations

## Project Structure

```
ACCN-Hub/
├── frontend/          # Client-side application
│   ├── css/          # Stylesheets
│   ├── js/           # JavaScript modules
│   └── assets/       # Images, templates
├── backend/          # Server-side application
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   ├── middleware/   # Auth and validation
│   └── utils/        # Helper functions
├── ai-generator/     # AI lesson generation
│   └── parsers/      # Document processors
└── docs/            # Documentation
```

## Getting Started

### Prerequisites:
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- OpenAI API key (for AI features)

### Installation:

1. Clone the repository:
```bash
git clone git@github.com:DawitLam/ACCN-Hub.git
cd ACCN-Hub
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/accn-hub
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-key
PORT=3000
```

5. Start the development server:
```bash
npm run dev
```

6. Access the application:
```
http://localhost:3000
```

## Development Phases

### Phase 1: Core LMS (Weeks 1-6)
- [x] Project setup
- [ ] User authentication system
- [ ] Database models and schemas
- [ ] Student dashboard
- [ ] Instructor dashboard
- [ ] Lesson viewer with progress tracking
- [ ] Quiz system
- [ ] Certificate generation

### Phase 2: AI Lesson Generator (Weeks 7-11)
- [ ] Word document parser
- [ ] AI content analyzer
- [ ] Lesson template generator
- [ ] Automatic question generation
- [ ] Video content matcher
- [ ] Gamification engine
- [ ] Instructor review interface

### Phase 3: Advanced Features (Weeks 12-14)
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Advanced gamification
- [ ] Mobile app (optional)
- [ ] API documentation
- [ ] Testing and deployment

## API Documentation

API documentation available at `/docs/API.md`

## Contributing

This project is developed for Umoja Robotics (Team 7712). For contributions or questions, contact the development team.

## License

© 2025 Umoja Robotics. All rights reserved.

## Contact

- **Organization:** ACCN Umoja Robotics 7712
- **Repository:** https://github.com/DawitLam/ACCN-Hub
- **Issues:** https://github.com/DawitLam/ACCN-Hub/issues

---

Built with ❤️ for empowering future innovators
