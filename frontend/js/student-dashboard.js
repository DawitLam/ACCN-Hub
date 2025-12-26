// Student Dashboard Functions

// Ensure code editor is available
if (typeof codeEditor === 'undefined') {
    console.error('Code editor not loaded! Check if code-editor.js is included before this script.');
}

// Track current view state
let currentViewState = {
    course: null,
    lesson: null
};

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
    // Store course in current view state for navigation
    currentViewState.course = course;
    
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

// Convert YouTube URL to embed format
function getEmbedUrl(videoUrl) {
    if (!videoUrl) return null;
    
    // Already embed format
    if (videoUrl.includes('/embed/')) {
        return videoUrl;
    }
    
    // Extract video ID from various YouTube URL formats
    let videoId = null;
    
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    if (videoUrl.includes('youtube.com/watch')) {
        const match = videoUrl.match(/[?&]v=([^&]+)/);
        if (match) videoId = match[1];
    }
    // Format: https://youtu.be/VIDEO_ID
    else if (videoUrl.includes('youtu.be/')) {
        const match = videoUrl.match(/youtu\.be\/([^?]+)/);
        if (match) videoId = match[1];
    }
    
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : videoUrl;
}

// Simple markdown to HTML converter (fallback if marked.js fails)
function simpleMarkdownToHtml(markdown) {
    let html = markdown;
    const escapeHtml = (str) => str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    // Convert fenced code blocks ```lang
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const languageClass = lang ? `language-${lang}` : 'language-text';
        return `<pre><code class="${languageClass}">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Convert inline code `code`
    html = html.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);
    
    // Replace --- separators
    html = html.replace(/\s*---\s*/g, '<br><br>');
    
    // Convert headers (must be done in order from most # to least)
    html = html.replace(/####\s+(.+?)(?=\n|$)/g, '<h4>$1</h4>');
    html = html.replace(/###\s+(.+?)(?=\n|$)/g, '<h3>$1</h3>');
    html = html.replace(/##\s+(.+?)(?=\n|$)/g, '<h2>$1</h2>');
    html = html.replace(/#\s+(.+?)(?=\n|$)/g, '<h1>$1</h1>');
    
    // Convert bold text
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Convert italic text
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Convert line breaks to paragraphs
    html = html.split('\n\n').map(para => {
        para = para.trim();
        if (!para) return '';
        if (para.startsWith('<h') || para.startsWith('<br') || para.startsWith('<pre') || para.startsWith('<ul') || para.startsWith('<ol')) {
            return para;
        }
        return `<p>${para}</p>`;
    }).join('\n');
    
    // Convert single line breaks to <br>
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// Current lesson page state
let currentLessonPage = 0;
let lessonSections = [];
let currentLesson = null;

// Display lesson content with pagination
function displayLesson(lesson) {
    const lessonContent = document.getElementById('lesson-content');
    currentLesson = lesson;
    currentLessonPage = 0;
    
    // Convert video URL to embed format
    const embedUrl = getEmbedUrl(lesson.videoUrl);
    
    // Build lesson sections for pagination
    lessonSections = [];
    
    // Section 1: Video & Overview
    if (embedUrl || lesson.objectives) {
        lessonSections.push({
            title: 'Overview',
            content: `
                ${embedUrl ? `
                    <div class="lesson-video">
                        <iframe width="100%" height="450" 
                                src="${embedUrl}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen></iframe>
                    </div>
                ` : ''}
                ${lesson.objectives && lesson.objectives.length > 0 ? `
                    <div class="lesson-objectives">
                        <h3>Learning Objectives</h3>
                        <ul>
                            ${lesson.objectives.map(obj => `<li>${obj}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            `
        });
    }
    
    // Section 2: Main Content
    if (lesson.content) {
        // Preprocess markdown content to ensure proper formatting
        let formattedContent = lesson.content;
        
        // Replace --- separators with double line breaks
        formattedContent = formattedContent.replace(/\s*---\s*/g, '\n\n');
        
        // Add line breaks before all # headers
        formattedContent = formattedContent.replace(/\s*(#{1,6})\s+/g, '\n\n$1 ');
        
        // Add line breaks before #### markers (used as section dividers)
        formattedContent = formattedContent.replace(/\s*(####)\s+/g, '\n\n$1 ');
        
        // Fix bold text - ensure proper spacing around **text**
        formattedContent = formattedContent.replace(/\*\*([^*]+)\*\*/g, '**$1**');
        
        // Add line breaks after sentences (period followed by space and capital letter/number)
        formattedContent = formattedContent.replace(/\.\s+(?=[A-Z#])/g, '.\n\n');
        
        // Clean up multiple consecutive line breaks
        formattedContent = formattedContent.replace(/\n{3,}/g, '\n\n');
        
        // Trim and parse
        formattedContent = formattedContent.trim();
        
        // Use marked.js if available, otherwise use simple converter
        let htmlContent;
        if (typeof marked !== 'undefined') {
            try {
                htmlContent = marked.parse(formattedContent);
            } catch (e) {
                console.warn('Marked.js failed, using fallback converter', e);
                htmlContent = simpleMarkdownToHtml(formattedContent);
            }
        } else {
            htmlContent = simpleMarkdownToHtml(formattedContent);
        }
        
        lessonSections.push({
            title: 'Content',
            content: `
                <div class="lesson-body">
                    ${htmlContent}
                </div>
            `
        });
    }
    
    // Section 3: Coding Exercises
    if (lesson.codingExercises && lesson.codingExercises.length > 0) {
        lessonSections.push({
            title: 'Coding Practice',
            content: `
                <div class="lesson-coding-exercises">
                    <h3>💻 Interactive Coding Exercises</h3>
                    <p style="color: #666; margin-bottom: 20px;">Practice Python directly in your browser - no setup required! Write code, run it, and see results instantly.</p>
                    ${lesson.codingExercises.map((exercise, index) => {
                        const exerciseId = `lesson${lesson.sessionNumber || index}-exercise${index}`;
                        const editorHtml = codeEditor.createEditor(
                            exerciseId,
                            exercise.starterCode || '# Write your Python code here\nprint("Hello, World!")\n',
                            exercise.hints || [],
                            exercise.solution || ''
                        );
                        return `
                        <div class="coding-exercise" style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-left: 4px solid #28a745; border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                                <h4 style="margin: 0; color: #28a745;">
                                    Exercise ${index + 1}: ${exercise.title}
                                    <span style="display: inline-block; padding: 4px 10px; background: ${exercise.difficulty === 'beginner' ? '#28a745' : exercise.difficulty === 'intermediate' ? '#ffc107' : '#dc3545'}; color: white; border-radius: 4px; font-size: 0.75em; margin-left: 10px; text-transform: uppercase;">
                                        ${exercise.difficulty}
                                    </span>
                                </h4>
                                <span style="font-weight: 700; color: #28a745; font-size: 1.1em;">⭐ ${exercise.points} points</span>
                            </div>
                            <p style="margin: 10px 0; line-height: 1.6; color: #555;">${exercise.description}</p>
                            
                            ${editorHtml}
                        </div>
                        `;
                    }).join('')}
                </div>
            `
        });
    }
    
    // Section 4: Interactive Tools
    if (lesson.interactiveTools && lesson.interactiveTools.length > 0) {
        lessonSections.push({
            title: 'Interactive Tools',
            content: `
                <div class="lesson-interactive-tools">
                    <h3>🎮 Hands-On AI Tools</h3>
                    <p style="color: #666; margin-bottom: 20px;">Experiment with these interactive AI platforms - no coding required!</p>
                    ${lesson.interactiveTools.map((tool, index) => `
                        <div class="interactive-tool" style="margin: 20px 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                            <h4 style="margin: 0 0 10px 0; color: white;">
                                ${index + 1}. ${tool.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </h4>
                            <p style="margin: 10px 0; opacity: 0.95;">${tool.description}</p>
                            
                            ${tool.instructions ? `
                                <details style="margin: 15px 0;">
                                    <summary style="cursor: pointer; font-weight: 500; opacity: 0.95;">📋 Step-by-Step Instructions</summary>
                                    <div style="margin-top: 10px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px; white-space: pre-line;">
                                        ${tool.instructions}
                                    </div>
                                </details>
                            ` : ''}
                            
                            <a href="${tool.url}" target="_blank" class="btn" style="background: white; color: #667eea; margin-top: 15px; text-decoration: none; display: inline-block; padding: 10px 20px; border-radius: 6px; font-weight: 600;">
                                🔗 Launch ${tool.name.replace(/_/g, ' ')}
                            </a>
                        </div>
                    `).join('')}
                </div>
            `
        });
    }
    
    // Section 5: Activities
    if (lesson.activities && lesson.activities.length > 0) {
        lessonSections.push({
            title: 'Activities',
            content: `
                <div class="lesson-activities">
                    <h3>Activities</h3>
                    ${lesson.activities.map((activity, index) => `
                        <div class="activity-item" style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                            <h4>${index + 1}. ${activity.title} ${activity.required ? '<span style="color: #dc3545; font-size: 0.9em;">(Required)</span>' : ''}</h4>
                            <p>${activity.description}</p>
                            ${activity.duration ? `<p style="color: #666; font-size: 0.9em;">⏱️ Duration: ${activity.duration}</p>` : ''}
                            <span style="display: inline-block; padding: 4px 12px; background: #007bff; color: white; border-radius: 4px; font-size: 0.85em;">
                                ${activity.type}
                            </span>
                        </div>
                    `).join('')}
                </div>
            `
        });
    }
    
    // Section 6: Resources
    if (lesson.resources && lesson.resources.length > 0) {
        lessonSections.push({
            title: 'Resources',
            content: `
                <div class="lesson-resources">
                    <h3>Additional Resources</h3>
                    <ul>
                        ${lesson.resources.map(res => `
                            <li><a href="${res.url}" target="_blank">${res.title} (${res.type})</a></li>
                        `).join('')}
                    </ul>
                </div>
            `
        });
    }
    
    // Section 5: Quiz
    if (lesson.quiz && lesson.quiz.length > 0) {
        lessonSections.push({
            title: 'Knowledge Check',
            content: `
                <div class="lesson-quiz">
                    <h3>Knowledge Check</h3>
                    <div id="quiz-container">
                        ${renderQuiz(lesson.quiz, lesson._id)}
                    </div>
                </div>
            `
        });
    }
    
    // Get lesson navigation context
    let prevLesson = null;
    let nextLesson = null;
    
    if (currentViewState.course && currentViewState.course.lessons) {
        const lessons = currentViewState.course.lessons;
        const currentIndex = lessons.findIndex(l => l._id === lesson._id);
        
        if (currentIndex > 0) {
            prevLesson = lessons[currentIndex - 1];
        }
        if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
            nextLesson = lessons[currentIndex + 1];
        }
    }
    
    // Build the complete layout with sidebar and content
    lessonContent.innerHTML = `
        <div class="lesson-viewer">
            <div class="lesson-sidebar">
                <h3 style="padding: 15px; margin: 0; border-bottom: 2px solid #e9ecef; font-size: 1.1rem;">
                    ${lesson.title}
                </h3>
                <p style="padding: 10px 15px; color: #666; border-bottom: 1px solid #e9ecef; margin: 0; font-size: 0.9rem;">
                    Duration: ${lesson.duration || 'N/A'}
                </p>
                <nav class="lesson-nav">
                    ${lessonSections.map((section, index) => `
                        <a href="#" 
                           class="lesson-nav-item ${index === 0 ? 'active' : ''}" 
                           data-page="${index}"
                           onclick="navigateToPage(${index}); return false;">
                            <span class="nav-number">${index + 1}</span>
                            <span class="nav-title">${section.title}</span>
                            <span class="nav-check">✓</span>
                        </a>
                    `).join('')}
                </nav>
                <div style="padding: 15px; border-top: 1px solid #e9ecef; margin-top: auto;">
                    ${prevLesson ? `
                        <button class="btn btn-secondary btn-sm" onclick="openLesson('${prevLesson._id}')" style="width: 100%; margin-bottom: 8px;">
                            ← Previous Lesson
                        </button>
                    ` : ''}
                    ${nextLesson ? `
                        <button class="btn btn-primary btn-sm" onclick="openLesson('${nextLesson._id}')" style="width: 100%;">
                            Next Lesson →
                        </button>
                    ` : ''}
                </div>
            </div>
            
            <div class="lesson-main-content">
                <div class="lesson-page-content" id="lessonPageContent">
                    ${lessonSections[0].content}
                </div>
                
                <div class="lesson-page-navigation">
                    <button class="btn btn-secondary" id="prevPageBtn" onclick="navigatePage(-1)" disabled>
                        ← Previous
                    </button>
                    <span class="page-indicator">
                        <span id="currentPageNum">1</span> of ${lessonSections.length}
                    </span>
                    <button class="btn btn-primary" id="nextPageBtn" onclick="navigatePage(1)">
                        Next →
                    </button>
                </div>
                
                <div class="lesson-complete-section" style="text-align: center; margin-top: 30px; padding-top: 30px; border-top: 2px solid #e9ecef;">
                    <button class="btn btn-success" onclick="completeLesson('${lesson._id}')" style="min-width: 200px;">
                        ✓ Mark as Complete
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Log activity
    logActivity('lesson_view', { lessonId: lesson._id });
    updatePageNavigation();
}

// Navigate to specific page
function navigateToPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= lessonSections.length) return;
    
    currentLessonPage = pageIndex;
    const contentDiv = document.getElementById('lessonPageContent');
    contentDiv.innerHTML = lessonSections[pageIndex].content;
    
    // Update sidebar active state
    document.querySelectorAll('.lesson-nav-item').forEach((item, index) => {
        if (index === pageIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    updatePageNavigation();
    
    // Scroll to top of content
    contentDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Navigate by offset (-1 or +1)
function navigatePage(offset) {
    const newPage = currentLessonPage + offset;
    navigateToPage(newPage);
}

// Update page navigation buttons
function updatePageNavigation() {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageNum = document.getElementById('currentPageNum');
    
    if (prevBtn) prevBtn.disabled = currentLessonPage === 0;
    if (nextBtn) nextBtn.disabled = currentLessonPage === lessonSections.length - 1;
    if (pageNum) pageNum.textContent = currentLessonPage + 1;
}

// Show/hide exercise solution
function showExerciseSolution(index) {
    const solutionDiv = document.getElementById(`solution-${index}`);
    if (solutionDiv) {
        if (solutionDiv.style.display === 'none') {
            solutionDiv.style.display = 'block';
        } else {
            solutionDiv.style.display = 'none';
        }
    }
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
            <button class="btn btn-primary" onclick="showSection('browse-courses'); loadAllCourses();">Browse Courses</button>
        </div>
    `;
}

// Load all available courses
async function loadAllCourses() {
    try {
        const response = await fetch(`${API_URL}/courses`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            const courses = await response.json();
            displayBrowseCourses(courses);
        } else {
            showMessage('Error loading courses', 'error');
        }
    } catch (error) {
        console.error('Error loading all courses:', error);
        showMessage('Error loading courses', 'error');
    }
}

// Display courses in browse section
function displayBrowseCourses(courses) {
    const container = document.getElementById('all-courses');
    
    if (!courses || courses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No courses available</h3>
                <p>Check back later for new courses!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = courses.map(course => `
        <div class="course-card">
            <img src="${course.thumbnail || '/assets/images/default-course.png'}" 
                 alt="${course.title}" 
                 class="course-thumbnail">
            <div class="course-content">
                <div class="course-header">
                    <span class="course-track">${course.track || 'General'}</span>
                    <span class="course-difficulty">${course.difficulty || 'Beginner'}</span>
                </div>
                <h4 class="course-title">${course.title}</h4>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span>📚 ${course.lessons ? course.lessons.length : 0} Lessons</span>
                    <span>⏱️ ${course.duration || 'Self-paced'}</span>
                </div>
                <div class="course-instructor">
                    <span>👨‍🏫 ${course.instructor ? course.instructor.firstName + ' ' + course.instructor.lastName : 'ACCN Hub'}</span>
                </div>
                <button class="btn btn-primary" onclick="enrollInCourse('${course._id}')">
                    Enroll Now
                </button>
            </div>
        </div>
    `).join('');
}

// Enroll in a course
async function enrollInCourse(courseId) {
    try {
        const response = await fetch(`${API_URL}/courses/${courseId}/enroll`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Successfully enrolled in course!', 'success');
            // Reload dashboard
            showSection('student-dashboard');
            loadStudentDashboard();
        } else if (response.status === 400 && data.message.includes('Already enrolled')) {
            // User is already enrolled, just view the course
            showMessage('You are already enrolled in this course', 'info');
            viewCourse(courseId);
        } else {
            showMessage(data.message || 'Enrollment failed', 'error');
        }
    } catch (error) {
        console.error('Error enrolling:', error);
        showMessage('Error enrolling in course', 'error');
    }
}

// Filter courses by track
function filterCourses(track) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        if (track === 'all' || card.querySelector('.course-track').textContent === track) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
