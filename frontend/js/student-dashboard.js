// Student Dashboard Functions

// Load student dashboard data
async function loadStudentDashboard() {
    try {
        // Update student name
        document.getElementById('student-name').textContent = currentUser.firstName;
        
        // Load enrolled courses
        await loadEnrolledCourses();
        
        // Load stats
        await loadStudentStats();
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showMessage('Error loading dashboard data', 'error');
    }
}

// Load student statistics
async function loadStudentStats() {
    try {
        const response = await fetch(`${API_URL}/progress/stats`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            const stats = await response.json();
            document.getElementById('enrolled-count').textContent = stats.enrolledCourses || 0;
            document.getElementById('completed-count').textContent = stats.completedLessons || 0;
            document.getElementById('points-count').textContent = stats.totalPoints || 0;
            document.getElementById('achievements-count').textContent = stats.achievements || 0;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load enrolled courses
async function loadEnrolledCourses() {
    try {
        const response = await fetch(`${API_URL}/courses/enrolled`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            const courses = await response.json();
            displayCourses(courses, 'student-courses');
        }
    } catch (error) {
        console.error('Error loading courses:', error);
        showEmptyState('student-courses', 'No courses enrolled yet', 'Browse available courses to get started!');
    }
}

// Display courses in grid
function displayCourses(courses, containerId) {
    const container = document.getElementById(containerId);
    
    if (!courses || courses.length === 0) {
        showEmptyState(containerId, 'No courses found', 'Check back later for new courses!');
        return;
    }
    
    container.innerHTML = courses.map(course => `
        <div class="course-card" onclick="viewCourse('${course._id}')">
            <img src="${course.thumbnail || '/assets/images/default-course.png'}" 
                 alt="${course.title}" 
                 class="course-thumbnail">
            <div class="course-content">
                <div class="course-header">
                    <span class="course-track">${course.track}</span>
                </div>
                <h4 class="course-title">${course.title}</h4>
                <p class="course-description">${course.description}</p>
                ${course.progress ? `
                    <div class="course-progress">
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" style="width: ${course.progress.completionPercentage}%"></div>
                        </div>
                        <span class="progress-text">${course.progress.completionPercentage}% Complete</span>
                    </div>
                ` : ''}
                <div class="course-meta">
                    <span>📚 ${course.lessons ? course.lessons.length : 0} Lessons</span>
                    <span>${course.difficulty || 'Beginner'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// View course details
async function viewCourse(courseId) {
    try {
        const response = await fetch(`${API_URL}/courses/${courseId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            const course = await response.json();
            displayCourseView(course);
        }
    } catch (error) {
        console.error('Error loading course:', error);
        showMessage('Error loading course details', 'error');
    }
}

// Display course view with lessons
function displayCourseView(course) {
    const lessonViewer = document.getElementById('lesson-viewer');
    const lessonContent = document.getElementById('lesson-content');
    
    lessonContent.innerHTML = `
        <div class="course-detail">
            <h2>${course.title}</h2>
            <p class="course-description">${course.description}</p>
            
            <div class="course-info-grid">
                <div class="info-item">
                    <strong>Track:</strong> ${course.track}
                </div>
                <div class="info-item">
                    <strong>Difficulty:</strong> ${course.difficulty}
                </div>
                <div class="info-item">
                    <strong>Duration:</strong> ${course.duration}
                </div>
                <div class="info-item">
                    <strong>Instructor:</strong> ${course.instructor.firstName} ${course.instructor.lastName}
                </div>
            </div>
            
            <h3>Course Lessons</h3>
            <ul class="lesson-list">
                ${course.lessons.map((lesson, index) => `
                    <li class="lesson-item ${lesson.isLocked ? 'locked' : ''} ${lesson.completed ? 'completed' : ''}" 
                        onclick="${!lesson.isLocked ? `openLesson('${lesson._id}')` : ''}">
                        <div class="lesson-icon">
                            ${lesson.completed ? '✅' : lesson.isLocked ? '🔒' : '📖'}
                        </div>
                        <div class="lesson-info">
                            <div class="lesson-title">Lesson ${index + 1}: ${lesson.title}</div>
                            <div class="lesson-meta-info">
                                ${lesson.duration} ${lesson.isLocked ? '• Locked' : lesson.completed ? '• Completed' : '• Available'}
                            </div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    showSection('lesson-viewer');
}

// Open specific lesson
async function openLesson(lessonId) {
    try {
        const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            const lesson = await response.json();
            displayLesson(lesson);
        }
    } catch (error) {
        console.error('Error loading lesson:', error);
        showMessage('Error loading lesson', 'error');
    }
}

// Display lesson content
function displayLesson(lesson) {
    const lessonContent = document.getElementById('lesson-content');
    
    lessonContent.innerHTML = `
        <div class="lesson-view">
            <h2>${lesson.title}</h2>
            
            ${lesson.videoUrl ? `
                <div class="lesson-video">
                    <iframe width="100%" height="450" 
                            src="${lesson.videoUrl}" 
                            frameborder="0" allowfullscreen></iframe>
                </div>
            ` : ''}
            
            <div class="lesson-body">
                ${lesson.content}
            </div>
            
            ${lesson.objectives && lesson.objectives.length > 0 ? `
                <div class="lesson-objectives">
                    <h3>Learning Objectives</h3>
                    <ul>
                        ${lesson.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${lesson.materials && lesson.materials.length > 0 ? `
                <div class="lesson-materials">
                    <h3>Required Materials</h3>
                    <ul>
                        ${lesson.materials.map(mat => `<li>${mat}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${lesson.quiz && lesson.quiz.length > 0 ? `
                <div class="lesson-quiz">
                    <h3>Knowledge Check</h3>
                    <div id="quiz-container">
                        ${renderQuiz(lesson.quiz, lesson._id)}
                    </div>
                </div>
            ` : ''}
            
            <div class="lesson-actions">
                <button class="btn btn-primary" onclick="completeLesson('${lesson._id}')">
                    Mark as Complete
                </button>
            </div>
        </div>
    `;
    
    // Log activity
    logActivity('lesson_view', { lessonId: lesson._id });
}

// Render quiz questions
function renderQuiz(questions, lessonId) {
    return questions.map((q, index) => `
        <div class="quiz-question" data-question="${index}">
            <h4>Question ${index + 1}: ${q.question}</h4>
            <div class="quiz-options">
                ${q.options.map((option, optIndex) => `
                    <label class="quiz-option">
                        <input type="radio" name="q${index}" value="${optIndex}">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('') + `
        <button class="btn btn-primary" onclick="submitQuiz('${lessonId}')">
            Submit Quiz
        </button>
    `;
}

// Submit quiz
async function submitQuiz(lessonId) {
    const questions = document.querySelectorAll('.quiz-question');
    const answers = [];
    
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        answers.push(selected ? parseInt(selected.value) : null);
    });
    
    try {
        const response = await fetch(`${API_URL}/lessons/${lessonId}/quiz`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answers })
        });
        
        if (response.ok) {
            const result = await response.json();
            showMessage(`Quiz submitted! Score: ${result.score}%`, 'success');
            
            if (result.passed) {
                completeLesson(lessonId);
            }
        }
    } catch (error) {
        console.error('Error submitting quiz:', error);
        showMessage('Error submitting quiz', 'error');
    }
}

// Complete lesson
async function completeLesson(lessonId) {
    try {
        const response = await fetch(`${API_URL}/progress/complete/${lessonId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            showMessage('Lesson completed! 🎉', 'success');
            
            // Refresh dashboard
            loadStudentStats();
            
            // Check for achievements
            if (result.newAchievements && result.newAchievements.length > 0) {
                showAchievements(result.newAchievements);
            }
        }
    } catch (error) {
        console.error('Error completing lesson:', error);
        showMessage('Error completing lesson', 'error');
    }
}

// Show achievements popup
function showAchievements(achievements) {
    achievements.forEach(achievement => {
        showMessage(`🏆 New Achievement: ${achievement.name}!`, 'success');
    });
}

// Log student activity
async function logActivity(action, details) {
    try {
        await fetch(`${API_URL}/progress/activity`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action, details })
        });
    } catch (error) {
        console.error('Error logging activity:', error);
    }
}

// Back to course
function backToCourse() {
    showSection('student-dashboard');
    loadStudentDashboard();
}

// Show empty state
function showEmptyState(containerId, title, message) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">📚</div>
            <h3>${title}</h3>
            <p>${message}</p>
            <button class="btn btn-primary" onclick="showSection('browse-courses')">Browse Courses</button>
        </div>
    `;
}
