// Authentication functions - handles user login, registration, and session management

const API_URL = 'http://localhost:3000/api';
let currentUser = null;
let authToken = null;

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    // AUTO-LOGIN FOR DEMO - Skip authentication
    autoLoginDemo();
});

// Auto-login as demo user (bypass authentication)
function autoLoginDemo() {
    // Redirect to the complete learning hub with proper curriculum
    window.location.href = 'learning-hub-complete.html';
}

// Check if user is already logged in
function checkAuthStatus() {
    authToken = localStorage.getItem('authToken');
    if (authToken) {
        validateToken();
    } else {
        showSection('auth-section');
    }
}

// Validate stored token
async function validateToken() {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            currentUser = data.user;
            showDashboard();
        } else {
            logout();
        }
    } catch (error) {
        console.error('Token validation error:', error);
        logout();
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            showMessage('Welcome back!', 'success');
            showDashboard();
        } else {
            showMessage(data.message || 'Login failed. Please check your credentials.', 'error');
        }
    } catch (error) {
        showMessage('Connection error. Please try again.', 'error');
        console.error('Login error:', error);
    }
}

// Handle registration form submission
async function handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('register-firstname').value;
    const lastName = document.getElementById('register-lastname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    const role = document.getElementById('register-role').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            showMessage('Account created successfully!', 'success');
            showDashboard();
        } else {
            showMessage(data.message || 'Registration failed. Please try again.', 'error');
        }
    } catch (error) {
        showMessage('Connection error. Please try again.', 'error');
        console.error('Registration error:', error);
    }
}

// Show appropriate dashboard based on user role
function showDashboard() {
    if (currentUser.role === 'student') {
        showSection('student-dashboard');
        loadModernDashboard();
    } else if (currentUser.role === 'instructor') {
        showSection('instructor-dashboard');
        loadInstructorDashboard();
    }
    updateUserSection();
}

// Load modern LinkedIn-style dashboard with sidebar
function loadModernDashboard() {
    const dashboard = document.getElementById('student-dashboard');
    dashboard.innerHTML = `
        <div style="display: flex; height: calc(100vh - 80px); overflow: hidden;">
            <!-- Sidebar Navigation -->
            <aside style="width: 280px; background: linear-gradient(180deg, #2a5298 0%, #1a3a6b 100%); color: white; overflow-y: auto; box-shadow: 2px 0 10px rgba(0,0,0,0.1);">
                <div style="padding: 2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <h2 style="margin: 0 0 0.5rem 0; font-size: 1.3rem;">AI Certification</h2>
                    <p style="margin: 0; opacity: 0.9; font-size: 0.9rem;">10-Day Program</p>
                    <div style="margin-top: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="font-size: 0.85rem;">Progress</span>
                            <span style="font-size: 0.85rem; font-weight: 600;">0%</span>
                        </div>
                        <div style="background: rgba(0,0,0,0.2); height: 6px; border-radius: 3px; overflow: hidden;">
                            <div id="sidebarProgress" style="background: #FFD700; height: 100%; width: 0%; transition: width 0.3s;"></div>
                        </div>
                    </div>
                </div>
                
                <nav id="daysList" style="padding: 1rem 0;">
                    <!-- Days will be populated here -->
                </nav>
            </aside>
            
            <!-- Main Content -->
            <main id="mainContent" style="flex: 1; overflow-y: auto; background: #f5f7fa;">
                <!-- Content will be loaded here -->
            </main>
        </div>
    `;
    
    loadDaysNavigation();
    showWelcomeScreen();
}

// Load days navigation in sidebar
function loadDaysNavigation() {
    const curriculum = [
        { day: 1, title: 'Introduction to AI', sessions: 4, icon: '🤖' },
        { day: 2, title: 'Machine Learning Basics', sessions: 4, icon: '🧠' },
        { day: 3, title: 'Neural Networks', sessions: 4, icon: '🔗' },
        { day: 4, title: 'Computer Vision', sessions: 4, icon: '👁️' },
        { day: 5, title: 'Natural Language', sessions: 4, icon: '💬' },
        { day: 6, title: 'Deep Learning', sessions: 4, icon: '🚀' },
        { day: 7, title: 'AI Ethics & Safety', sessions: 4, icon: '⚖️' },
        { day: 8, title: 'Practical Projects', sessions: 4, icon: '🛠️' },
        { day: 9, title: 'Advanced Topics', sessions: 4, icon: '⭐' },
        { day: 10, title: 'Capstone & Review', sessions: 4, icon: '🎓' }
    ];
    
    const daysList = document.getElementById('daysList');
    let html = '';
    
    curriculum.forEach(day => {
        html += `
            <div class="day-group" style="margin-bottom: 0.5rem;">
                <button onclick="toggleDay(${day.day})" 
                        style="width: 100%; text-align: left; padding: 1rem 1.5rem; background: transparent; color: white; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.75rem; font-size: 1rem; transition: all 0.2s;"
                        onmouseover="this.style.background='rgba(255,255,255,0.1)'"
                        onmouseout="this.style.background='transparent'">
                    <span style="font-size: 1.3rem;">${day.icon}</span>
                    <div style="flex: 1;">
                        <div style="font-weight: 600;">Day ${day.day}</div>
                        <div style="font-size: 0.85rem; opacity: 0.8;">${day.title}</div>
                    </div>
                    <span id="arrow${day.day}" style="font-size: 1.2rem; transition: transform 0.3s;">▶</span>
                </button>
                <div id="sessions${day.day}" style="display: none; padding: 0.5rem 0 0.5rem 3.5rem; background: rgba(0,0,0,0.1);">
                    ${generateSessions(day.day, day.sessions)}
                </div>
            </div>
        `;
    });
    
    daysList.innerHTML = html;
}

// Generate session links for a day
function generateSessions(day, count) {
    let html = '';
    for (let i = 1; i <= count; i++) {
        html += `
            <button onclick="loadSession(${day}, ${i})"
                    style="width: 100%; text-align: left; padding: 0.75rem 1rem; background: transparent; color: rgba(255,255,255,0.9); border: none; border-left: 3px solid transparent; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; display: block;"
                    onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.borderLeftColor='#FFD700'"
                    onmouseout="this.style.background='transparent'; this.style.borderLeftColor='transparent'">
                📝 Session ${i}
            </button>
        `;
    }
    return html;
}

// Toggle day expansion
function toggleDay(day) {
    const sessions = document.getElementById(`sessions${day}`);
    const arrow = document.getElementById(`arrow${day}`);
    
    if (sessions.style.display === 'none') {
        sessions.style.display = 'block';
        arrow.style.transform = 'rotate(90deg)';
    } else {
        sessions.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Show welcome screen
function showWelcomeScreen() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div style="padding: 3rem; max-width: 1200px; margin: 0 auto;">
            <!-- Welcome Header -->
            <div style="background: linear-gradient(135deg, #2a5298, #4a90e2); color: white; padding: 3rem; border-radius: 16px; margin-bottom: 2rem; box-shadow: 0 4px 20px rgba(42, 82, 152, 0.3);">
                <h1 style="margin: 0 0 1rem 0; font-size: 2.5rem;">Welcome to AI Certification Program! 🎓</h1>
                <p style="margin: 0; font-size: 1.2rem; opacity: 0.95;">Master Artificial Intelligence in 10 days with hands-on projects and expert guidance</p>
            </div>
            
            <!-- Dashboard Stats -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #2a5298;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📚</div>
                    <div style="font-size: 2rem; font-weight: 700; color: #2a5298; margin-bottom: 0.25rem;">10</div>
                    <div style="color: #6c757d; font-size: 0.95rem;">Days of Content</div>
                </div>
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #4a90e2;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">✅</div>
                    <div style="font-size: 2rem; font-weight: 700; color: #4a90e2; margin-bottom: 0.25rem;">40</div>
                    <div style="color: #6c757d; font-size: 0.95rem;">Total Sessions</div>
                </div>
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #FFD700;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">⭐</div>
                    <div style="font-size: 2rem; font-weight: 700; color: #e6a800; margin-bottom: 0.25rem;">0</div>
                    <div style="color: #6c757d; font-size: 0.95rem;">Points Earned</div>
                </div>
                <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #28a745;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🏆</div>
                    <div style="font-size: 2rem; font-weight: 700; color: #28a745; margin-bottom: 0.25rem;">0%</div>
                    <div style="color: #6c757d; font-size: 0.95rem;">Completion</div>
                </div>
            </div>
            
            <!-- Quick Start -->
            <div style="background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
                <h2 style="color: #2a5298; margin: 0 0 1.5rem 0; font-size: 1.8rem;">🚀 Quick Start</h2>
                <div style="display: grid; gap: 1.5rem;">
                    <div style="padding: 1.5rem; background: #f8f9fa; border-radius: 12px; border-left: 4px solid #2a5298;">
                        <h3 style="margin: 0 0 0.75rem 0; color: #2c3e50; font-size: 1.2rem;">1. Choose a Day from Sidebar</h3>
                        <p style="margin: 0; color: #6c757d; line-height: 1.6;">Navigate through the 10-day curriculum using the sidebar. Each day covers specific AI topics.</p>
                    </div>
                    <div style="padding: 1.5rem; background: #f8f9fa; border-radius: 12px; border-left: 4px solid #4a90e2;">
                        <h3 style="margin: 0 0 0.75rem 0; color: #2c3e50; font-size: 1.2rem;">2. Complete Sessions</h3>
                        <p style="margin: 0; color: #6c757d; line-height: 1.6;">Each day has 4 sessions with video lessons, interactive content, and quizzes.</p>
                    </div>
                    <div style="padding: 1.5rem; background: #f8f9fa; border-radius: 12px; border-left: 4px solid #FFD700;">
                        <h3 style="margin: 0 0 0.75rem 0; color: #2c3e50; font-size: 1.2rem;">3. Earn Achievements</h3>
                        <p style="margin: 0; color: #6c757d; line-height: 1.6;">Complete lessons to earn points, unlock badges, and track your progress.</p>
                    </div>
                </div>
                
                <div style="margin-top: 2rem; text-align: center;">
                    <button onclick="toggleDay(1)" 
                            style="padding: 1.25rem 3rem; background: linear-gradient(135deg, #2a5298, #4a90e2); color: white; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 16px rgba(42, 82, 152, 0.3); transition: all 0.3s;"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(42, 82, 152, 0.4)'"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 16px rgba(42, 82, 152, 0.3)'">
                        Start Day 1 - Introduction to AI →
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Load a specific session
function loadSession(day, session) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div style="padding: 2rem; max-width: 1000px; margin: 0 auto;">
            <button onclick="showWelcomeScreen()" 
                    style="padding: 0.75rem 1.5rem; background: white; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; margin-bottom: 2rem; font-size: 1rem; transition: all 0.2s;"
                    onmouseover="this.style.background='#f8f9fa'"
                    onmouseout="this.style.background='white'">
                ← Back to Home
            </button>
            
            <div style="background: linear-gradient(135deg, #2a5298, #4a90e2); color: white; padding: 2.5rem; border-radius: 16px; margin-bottom: 2rem;">
                <div style="font-size: 0.95rem; opacity: 0.9; margin-bottom: 0.75rem;">Day ${day}, Session ${session}</div>
                <h1 style="margin: 0; font-size: 2.2rem;">AI Fundamentals</h1>
            </div>
            
            <div style="background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
                <div style="background: #f8f9fa; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; border-left: 4px solid #2a5298;">
                    <h3 style="color: #2a5298; margin: 0 0 1rem 0; font-size: 1.3rem;">📋 Learning Objectives</h3>
                    <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8; color: #2c3e50;">
                        <li>Understand core AI concepts and principles</li>
                        <li>Apply machine learning techniques</li>
                        <li>Complete hands-on coding exercises</li>
                        <li>Build real-world AI applications</li>
                    </ul>
                </div>
                
                <div style="margin: 2.5rem 0;">
                    <h3 style="color: #2a5298; margin: 0 0 1.5rem 0; font-size: 1.3rem;">🎥 Video Lesson</h3>
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.15);">
                        <iframe width="100%" height="100%" 
                                src="https://www.youtube-nocookie.com/embed/aircAruvnKk" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
                    </div>
                </div>
                
                <div style="margin: 2.5rem 0; line-height: 1.8; color: #2c3e50;">
                    <h3 style="color: #2a5298; margin: 0 0 1rem 0; font-size: 1.3rem;">📖 Lesson Content</h3>
                    <p>This session introduces you to the fascinating world of Artificial Intelligence. You'll learn the fundamental concepts, explore real-world applications, and understand how AI is transforming industries.</p>
                    <p>Through interactive examples and hands-on exercises, you'll develop a solid foundation in AI principles that will prepare you for advanced topics in the coming days.</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #fff3e0, #ffe0b2); padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #ff9800;">
                    <h3 style="color: #e65100; margin: 0 0 1.5rem 0; font-size: 1.3rem;">❓ Knowledge Check</h3>
                    <p style="margin: 0 0 1rem 0; font-weight: 600; font-size: 1.05rem; color: #2c3e50;">What is the primary goal of Artificial Intelligence?</p>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <button onclick="this.style.background='#4caf50'; this.style.color='white'; this.style.borderColor='#4caf50'; alert('✅ Correct! AI aims to create intelligent systems. +10 points!');" 
                                style="padding: 1rem 1.5rem; background: white; border: 2px solid #e0e0e0; border-radius: 10px; cursor: pointer; text-align: left; transition: all 0.3s; font-size: 1rem;"
                                onmouseover="if(!this.style.background.includes('75')) this.style.borderColor='#4caf50'" 
                                onmouseout="if(!this.style.background.includes('75')) this.style.borderColor='#e0e0e0'">
                            <strong>A)</strong> To create systems that can perform tasks requiring human intelligence ✓
                        </button>
                        <button onclick="this.style.background='#f44336'; this.style.color='white'; this.style.borderColor='#f44336'; alert('❌ Not quite. Try again!');" 
                                style="padding: 1rem 1.5rem; background: white; border: 2px solid #e0e0e0; border-radius: 10px; cursor: pointer; text-align: left; transition: all 0.3s; font-size: 1rem;">
                            <strong>B)</strong> To replace all human workers
                        </button>
                        <button onclick="this.style.background='#f44336'; this.style.color='white'; this.style.borderColor='#f44336'; alert('❌ Incorrect. Review the lesson!');" 
                                style="padding: 1rem 1.5rem; background: white; border: 2px solid #e0e0e0; border-radius: 10px; cursor: pointer; text-align: left; transition: all 0.3s; font-size: 1rem;">
                            <strong>C)</strong> To create robots only
                        </button>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #e0e0e0;">
                    <button onclick="alert('🎉 Lesson Completed!\\n\\n✅ +10 points earned\\n⭐ Progress updated\\n\\nGreat work! Continue to the next session.'); loadSession(${day}, ${session < 4 ? session + 1 : session});" 
                            style="padding: 1.25rem 3rem; background: linear-gradient(135deg, #2a5298, #4a90e2); color: white; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 16px rgba(42, 82, 152, 0.3); transition: all 0.3s;"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(42, 82, 152, 0.4)'"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 16px rgba(42, 82, 152, 0.3)'">
                        ✓ Complete Lesson & Continue →
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Demo function to load courses without backend
async function loadStudentDashboardDemo() {
    try {
        // Try to load from backend first
        const response = await fetch(`${API_URL}/courses`);
        if (response.ok) {
            const courses = await response.json();
            displayCoursesDemo(courses);
            return;
        }
    } catch (error) {
        console.log('Backend not available, showing demo content');
    }
    
    // If backend fails, show demo content with proper styling
    const demoContent = `
        <div class="welcome-banner">
            <h2>Welcome to ACCN Hub!</h2>
            <p>Your AI Learning Journey Starts Here</p>
        </div>
        
        <div class="dashboard-stats">
            <div class="stat-card">
                <div class="stat-icon">📚</div>
                <div class="stat-info">
                    <h3>1</h3>
                    <p>Courses Enrolled</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-info">
                    <h3>0</h3>
                    <p>Lessons Completed</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">⭐</div>
                <div class="stat-info">
                    <h3>0</h3>
                    <p>Points Earned</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🏆</div>
                <div class="stat-info">
                    <h3>0</h3>
                    <p>Achievements</p>
                </div>
            </div>
        </div>
        
        <div class="courses-section">
            <h3>📖 My Courses</h3>
            <div class="courses-grid">
                <div class="course-card" onclick="loadDemoCourse()">
                    <div class="course-header" style="background: linear-gradient(135deg, #2a5298 0%, #4a90e2 100%); padding: 2rem; color: white;">
                        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;">AI Fundamentals Certification</h3>
                        <span class="course-badge" style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem;">10-Day Program</span>
                    </div>
                    <div class="course-body" style="padding: 1.5rem;">
                        <p style="color: #6c757d; margin-bottom: 1.5rem; line-height: 1.6;">Master the fundamentals of Artificial Intelligence in this comprehensive 30-hour program. Build real projects and earn your certification.</p>
                        <div class="course-stats" style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; font-size: 0.9rem; color: #6c757d;">
                            <span>📚 40 Lessons</span>
                            <span>🎯 15+ Projects</span>
                            <span>⏱️ 30 Hours</span>
                        </div>
                        <div class="progress-bar" style="background: #e9ecef; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 1rem;">
                            <div class="progress-fill" style="background: linear-gradient(90deg, #2a5298, #4a90e2); height: 100%; width: 0%;"></div>
                        </div>
                        <button class="btn btn-primary" style="width: 100%; padding: 0.75rem; background: linear-gradient(135deg, #2a5298, #4a90e2); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 1rem;">Start Learning →</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('student-dashboard').innerHTML = demoContent;
}

// Load demo course content
function loadDemoCourse() {
    const lessonList = `
        <div style="max-width: 1000px; margin: 0 auto;">
            <button onclick="loadStudentDashboardDemo()" class="btn btn-secondary" style="margin-bottom: 1.5rem; padding: 0.5rem 1.5rem; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer;">← Back to Dashboard</button>
            
            <div class="welcome-banner" style="margin-bottom: 2rem;">
                <h2>AI Fundamentals Course</h2>
                <p>Select a lesson to begin your learning journey</p>
            </div>
            
            <div style="display: grid; gap: 2rem;">
                ${generateDemoLessons()}
            </div>
        </div>
    `;
    
    document.getElementById('student-dashboard').innerHTML = lessonList;
}

function generateDemoLessons() {
    const days = [
        { title: "Day 1: AI Foundations", color: "#2a5298", sessions: ["What is AI?", "History of AI", "Types of AI", "AI Applications"] },
        { title: "Day 2: Machine Learning Basics", color: "#4a90e2", sessions: ["ML Pipeline", "Types of Learning", "Data Quality", "Bias & Fairness"] },
        { title: "Day 3: Python for AI", color: "#5856d6", sessions: ["Variables & Data", "Functions & Loops", "Data Structures", "Practice"] },
        { title: "Day 4: Build AI Models", color: "#af52de", sessions: ["Teachable Machine", "Image Classification", "Audio Models", "Custom Project"] },
        { title: "Day 5: Data Science", color: "#ff2d55", sessions: ["NumPy Basics", "Pandas DataFrames", "Data Visualization", "Analysis Project"] }
    ];
    
    let html = '';
    days.forEach((day, dayIndex) => {
        html += `
        <div class="course-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, ${day.color}, ${adjustColor(day.color)}); color: white; padding: 1.5rem;">
                <h3 style="margin: 0; font-size: 1.3rem;">${day.title}</h3>
            </div>
            <div style="padding: 1.5rem;">`;
        
        day.sessions.forEach((session, sessionIndex) => {
            html += `
                <div onclick="showDemoLesson(${dayIndex + 1}, ${sessionIndex + 1}, '${session}')" 
                     style="background: #f8f9fa; padding: 1rem; margin: 0.75rem 0; border-radius: 8px; cursor: pointer; border: 2px solid transparent; transition: all 0.3s;"
                     onmouseover="this.style.borderColor='${day.color}'; this.style.background='white';"
                     onmouseout="this.style.borderColor='transparent'; this.style.background='#f8f9fa';">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="color: ${day.color};">Session ${sessionIndex + 1}</strong>
                            <p style="margin: 0.25rem 0 0 0; color: #6c757d;">${session}</p>
                        </div>
                        <span style="font-size: 1.5rem; color: ${day.color};">▶</span>
                    </div>
                </div>`;
        });
        
        html += `</div></div>`;
    });
    
    return html;
}

function adjustColor(color) {
    // Simple color adjustment for gradient
    return color + 'dd';
}

function showDemoLesson(day, session, title) {
    const content = `
        <div style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem;">
            <button onclick="loadDemoCourse()" class="btn btn-secondary" style="margin-bottom: 1.5rem; padding: 0.5rem 1.5rem; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer;">← Back to Lessons</button>
            
            <div class="lesson-header" style="background: linear-gradient(135deg, #2a5298, #4a90e2); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                <div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 0.5rem;">Day ${day}, Session ${session}</div>
                <h1 style="margin: 0; font-size: 2rem;">${title}</h1>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div class="lesson-objectives" style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border-left: 4px solid #2a5298;">
                    <h3 style="color: #2a5298; margin: 0 0 1rem 0; font-size: 1.2rem;">📋 Learning Objectives</h3>
                    <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8; color: #2c3e50;">
                        <li>Understand the core concepts of ${title}</li>
                        <li>Apply practical techniques in real-world scenarios</li>
                        <li>Complete hands-on exercises and activities</li>
                        <li>Build foundation for advanced topics</li>
                    </ul>
                </div>
                
                <div class="lesson-video" style="margin: 2rem 0;">
                    <h3 style="color: #2a5298; margin: 0 0 1rem 0; font-size: 1.2rem;">🎥 Video Lesson</h3>
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                        <iframe width="100%" height="100%" 
                                src="https://www.youtube-nocookie.com/embed/aircAruvnKk" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
                    </div>
                </div>
                
                <div class="lesson-body" style="margin: 2rem 0; line-height: 1.8; color: #2c3e50;">
                    <h3 style="color: #2a5298; margin: 1.5rem 0 1rem 0; font-size: 1.2rem;">📖 Lesson Content</h3>
                    <p style="margin-bottom: 1rem;">This comprehensive session covers the essential aspects of ${title}. You'll learn through a combination of theory, practical examples, and hands-on activities.</p>
                    
                    <p style="margin-bottom: 1rem;">Throughout this lesson, you'll gain practical experience and develop skills that are directly applicable to real-world AI projects and challenges.</p>
                    
                    <div style="background: #e3f2fd; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; border-left: 4px solid #2196f3;">
                        <p style="margin: 0; color: #1565c0;"><strong>💡 Pro Tip:</strong> Take notes as you watch the video and try the exercises immediately after learning each concept.</p>
                    </div>
                </div>
                
                <div class="lesson-materials" style="background: #f0f4f8; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; border-left: 4px solid #4a90e2;">
                    <h3 style="color: #2a5298; margin: 0 0 1rem 0; font-size: 1.2rem;">🎯 Hands-On Activities</h3>
                    <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8; color: #2c3e50;">
                        <li>Interactive exercise: Explore ${title} concepts</li>
                        <li>Build a mini-project applying what you've learned</li>
                        <li>Complete the knowledge check quiz below</li>
                        <li>Share your project with classmates for feedback</li>
                    </ul>
                </div>
                
                <div class="lesson-quiz" style="background: linear-gradient(135deg, #fff3e0, #ffe0b2); padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid #ff9800;">
                    <h3 style="color: #e65100; margin: 0 0 1.5rem 0; font-size: 1.3rem;">❓ Knowledge Check</h3>
                    <div class="quiz-question" style="margin-bottom: 1.5rem;">
                        <p style="margin: 0 0 1rem 0; font-weight: 600; font-size: 1.1rem; color: #2c3e50;">What is the main purpose of ${title}?</p>
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            <button onclick="alert('✅ Correct! Excellent work! 🎉'); this.style.background='#4caf50'; this.style.color='white';" 
                                    style="padding: 1rem 1.5rem; background: white; border: 2px solid #e0e0e0; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.3s; font-size: 1rem;"
                                    onmouseover="if(this.style.background !== 'rgb(76, 175, 80)') this.style.borderColor='#4caf50'" 
                                    onmouseout="if(this.style.background !== 'rgb(76, 175, 80)') this.style.borderColor='#e0e0e0'">
                                <strong>A)</strong> To build foundational understanding of AI concepts ✓
                            </button>
                            <button onclick="alert('❌ Not quite. Try again!'); this.style.background='#f44336'; this.style.color='white';" 
                                    style="padding: 1rem 1.5rem; background: white; border: 2px solid #e0e0e0; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.3s; font-size: 1rem;"
                                    onmouseover="if(this.style.background !== 'rgb(244, 67, 54)') this.style.borderColor='#ff9800'" 
                                    onmouseout="if(this.style.background !== 'rgb(244, 67, 54)') this.style.borderColor='#e0e0e0'">
                                <strong>B)</strong> To memorize formulas without understanding
                            </button>
                            <button onclick="alert('❌ That\\'s not correct. Review the lesson and try again!'); this.style.background='#f44336'; this.style.color='white';" 
                                    style="padding: 1rem 1.5rem; background: white; border: 2px solid #e0e0e0; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.3s; font-size: 1rem;"
                                    onmouseover="if(this.style.background !== 'rgb(244, 67, 54)') this.style.borderColor='#ff9800'" 
                                    onmouseout="if(this.style.background !== 'rgb(244, 67, 54)') this.style.borderColor='#e0e0e0'">
                                <strong>C)</strong> To replace human intelligence completely
                            </button>
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #e0e0e0;">
                    <button onclick="alert('🎉 Lesson Completed!\\n\\n✅ You\\'ve earned 10 points\\n⭐ Progress: ${session}/40 lessons\\n\\nKeep up the great work!'); loadDemoCourse();" 
                            class="btn btn-primary"
                            style="padding: 1rem 3rem; background: linear-gradient(135deg, #2a5298, #4a90e2); color: white; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; font-weight: 600; box-shadow: 0 4px 12px rgba(42, 82, 152, 0.3); transition: all 0.3s;"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(42, 82, 152, 0.4)'"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(42, 82, 152, 0.3)'">
                        ✓ Complete Lesson & Continue
                    </button>
                    <p style="margin-top: 1rem; color: #6c757d; font-size: 0.9rem;">You'll earn 10 points and unlock the next lesson</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('student-dashboard').innerHTML = content;
}

// Update user info in header
function updateUserSection() {
    const mainNav = document.getElementById('mainNav');
    const userSection = document.getElementById('userSection');
    
    // Add navigation based on role
    if (currentUser.role === 'student') {
        mainNav.innerHTML = `
            <a href="#" onclick="showSection('student-dashboard'); loadStudentDashboard(); return false;" class="nav-link">Dashboard</a>
            <a href="#" onclick="showSection('browse-courses'); loadAllCourses(); return false;" class="nav-link">Browse Courses</a>
        `;
    } else if (currentUser.role === 'instructor') {
        mainNav.innerHTML = `
            <a href="#" onclick="showSection('instructor-dashboard'); loadInstructorDashboard(); return false;" class="nav-link">Dashboard</a>
            <a href="#" onclick="showSection('browse-courses'); loadAllCourses(); return false;" class="nav-link">All Courses</a>
        `;
    }
    
    userSection.innerHTML = `
        <div class="user-info">
            <img src="${currentUser.profileImage || '/assets/images/default-avatar.png'}" alt="Profile" class="user-avatar">
            <span class="user-name">${currentUser.firstName} ${currentUser.lastName}</span>
            <button class="btn btn-logout" onclick="logout()">Sign Out</button>
        </div>
    `;
}

// Logout function
function logout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    showSection('auth-section');
    showMessage('You have been logged out', 'info');
}

// Switch between login and register forms
function showAuthTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(btn => btn.classList.remove('active'));

    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Show specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Show message to user
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Forgot password (placeholder)
function showForgotPassword() {
    showMessage('Password reset feature coming soon. Please contact support.', 'info');
}
