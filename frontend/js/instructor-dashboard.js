// Instructor Dashboard Functions

// Load instructor dashboard
async function loadInstructorDashboard() {
    try {
        await loadInstructorCourses();
    } catch (error) {
        console.error('Error loading instructor dashboard:', error);
        showMessage('Error loading dashboard', 'error');
    }
}

// Load instructor's courses
async function loadInstructorCourses() {
    try {
        const response = await fetch(`${API_URL}/courses/instructor/courses`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            const courses = await response.json();
            displayInstructorCourses(courses);
        }
    } catch (error) {
        console.error('Error loading courses:', error);
        showEmptyState('instructor-courses', 'No courses yet', 'Create your first course to get started!');
    }
}

// Display instructor courses
function displayInstructorCourses(courses) {
    const container = document.getElementById('instructor-courses');
    
    if (!courses || courses.length === 0) {
        showEmptyState('instructor-courses', 'No courses yet', 'Create your first course to get started!');
        return;
    }
    
    container.innerHTML = courses.map(course => `
        <div class="course-card">
            <img src="${course.thumbnail || '/assets/images/default-course.png'}" 
                 alt="${course.title}" 
                 class="course-thumbnail">
            <div class="course-content">
                <div class="course-header">
                    <span class="course-track">${course.track}</span>
                    <span class="course-status ${course.isPublished ? 'published' : 'draft'}">
                        ${course.isPublished ? '✅ Published' : '📝 Draft'}
                    </span>
                </div>
                <h4 class="course-title">${course.title}</h4>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span>📚 ${course.lessons ? course.lessons.length : 0} Lessons</span>
                    <span>👥 ${course.enrolledStudents ? course.enrolledStudents.length : 0} Students</span>
                </div>
                <div class="course-actions">
                    <button class="btn btn-primary btn-sm" onclick="editCourse('${course._id}')">Edit</button>
                    <button class="btn btn-secondary btn-sm" onclick="viewStudentProgress('${course._id}')">Progress</button>
                    <button class="btn btn-secondary btn-sm" onclick="togglePublish('${course._id}', ${course.isPublished})">
                        ${course.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show create course modal
function showCreateCourse() {
    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <h2>Create New Course</h2>
                <form onsubmit="createCourse(event)">
                    <div class="form-group">
                        <label>Course Title</label>
                        <input type="text" id="course-title" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="course-description" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Track</label>
                        <select id="course-track" required>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Coding">Coding</option>
                            <option value="CAD">CAD</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Difficulty</label>
                        <select id="course-difficulty">
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Duration</label>
                        <input type="text" id="course-duration" placeholder="e.g., 4 weeks" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Create Course</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Create course
async function createCourse(event) {
    event.preventDefault();
    
    const courseData = {
        title: document.getElementById('course-title').value,
        description: document.getElementById('course-description').value,
        track: document.getElementById('course-track').value,
        difficulty: document.getElementById('course-difficulty').value,
        duration: document.getElementById('course-duration').value
    };
    
    try {
        const response = await fetch(`${API_URL}/courses`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        });
        
        if (response.ok) {
            showMessage('Course created successfully!', 'success');
            closeModal();
            loadInstructorCourses();
        } else {
            const error = await response.json();
            showMessage(error.message || 'Error creating course', 'error');
        }
    } catch (error) {
        console.error('Error creating course:', error);
        showMessage('Error creating course', 'error');
    }
}

// Toggle publish status
async function togglePublish(courseId, currentStatus) {
    try {
        const response = await fetch(`${API_URL}/courses/${courseId}/publish`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            showMessage(`Course ${currentStatus ? 'unpublished' : 'published'} successfully`, 'success');
            loadInstructorCourses();
        }
    } catch (error) {
        console.error('Error toggling publish status:', error);
        showMessage('Error updating course', 'error');
    }
}

// View student progress
async function viewStudentProgress(courseId) {
    try {
        const response = await fetch(`${API_URL}/progress/course/${courseId}/students`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            const progressData = await response.json();
            displayProgressModal(progressData);
        }
    } catch (error) {
        console.error('Error fetching student progress:', error);
        showMessage('Error loading student progress', 'error');
    }
}

// Display progress modal
function displayProgressModal(progressData) {
    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content large" onclick="event.stopPropagation()">
                <h2>Student Progress</h2>
                <table class="student-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Completion</th>
                            <th>Points</th>
                            <th>Lessons Completed</th>
                            <th>Last Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${progressData.map(progress => `
                            <tr>
                                <td>
                                    <div class="student-name">
                                        <img src="${progress.student.profileImage || '/assets/images/default-avatar.png'}" 
                                             class="student-avatar-small" alt="${progress.student.firstName}">
                                        <span>${progress.student.firstName} ${progress.student.lastName}</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="progress-badge ${
                                        progress.completionPercentage >= 75 ? 'high' : 
                                        progress.completionPercentage >= 40 ? 'medium' : 'low'
                                    }">
                                        ${progress.completionPercentage}%
                                    </span>
                                </td>
                                <td>${progress.totalPoints || 0}</td>
                                <td>${progress.completedLessons.length}</td>
                                <td>${new Date(progress.lastAccessedAt).toLocaleDateString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <button class="btn btn-secondary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Show upload lesson modal
function showUploadLesson() {
    showMessage('Lesson content upload feature coming soon! You can create lessons manually for now.', 'info');
}

// Edit course
function editCourse(courseId) {
    showMessage('Course editing interface coming soon!', 'info');
}

// Close modal
function closeModal() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => modal.remove());
}
