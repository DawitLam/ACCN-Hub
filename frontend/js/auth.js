// Authentication functions - handles user login, registration, and session management

const API_URL = 'http://localhost:3000/api';
let currentUser = null;
let authToken = null;

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
});

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
        loadStudentDashboard();
    } else if (currentUser.role === 'instructor') {
        showSection('instructor-dashboard');
        loadInstructorDashboard();
    }
    updateUserSection();
}

// Update user info in header
function updateUserSection() {
    const userSection = document.getElementById('userSection');
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
