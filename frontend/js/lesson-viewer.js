// Lesson Viewer Functions

// Additional styles for lesson viewer (to be added to main.css if needed)
const lessonViewerStyles = `
.lesson-view {
    max-width: 900px;
    margin: 0 auto;
}

.lesson-video {
    margin: var(--spacing-lg) 0;
    border-radius: var(--radius-lg);
    overflow: hidden;
}

.lesson-body {
    line-height: 1.8;
    font-size: 1.1rem;
    margin: var(--spacing-xl) 0;
}

.lesson-body h3 {
    color: var(--primary-color);
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-sm);
}

.lesson-body p {
    margin-bottom: var(--spacing-md);
}

.lesson-objectives,
.lesson-materials {
    background: var(--bg-light);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    margin: var(--spacing-lg) 0;
}

.lesson-objectives h3,
.lesson-materials h3 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
}

.lesson-objectives ul,
.lesson-materials ul {
    list-style-position: inside;
    padding-left: var(--spacing-sm);
}

.lesson-objectives li,
.lesson-materials li {
    margin-bottom: var(--spacing-xs);
}

.lesson-quiz {
    background: var(--bg-white);
    padding: var(--spacing-xl);
    border-radius: var(--radius-xl);
    border: 2px solid var(--primary-color);
    margin: var(--spacing-xl) 0;
}

.lesson-quiz h3 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-lg);
}

.quiz-question {
    margin-bottom: var(--spacing-xl);
}

.quiz-question h4 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
}

.quiz-options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.quiz-option {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--bg-light);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.3s ease;
}

.quiz-option:hover {
    background: var(--primary-color);
    color: white;
}

.quiz-option input[type="radio"] {
    cursor: pointer;
}

.lesson-actions {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-xl);
    border-top: 2px solid var(--border-color);
}

.course-detail {
    background: var(--bg-white);
    padding: var(--spacing-xl);
    border-radius: var(--radius-xl);
}

.course-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
    margin: var(--spacing-lg) 0;
    padding: var(--spacing-lg);
    background: var(--bg-light);
    border-radius: var(--radius-lg);
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.info-item strong {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: var(--bg-white);
    padding: var(--spacing-xl);
    border-radius: var(--radius-xl);
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-content.large {
    max-width: 900px;
}

.modal-content h2 {
    color: var(--primary-color);
    margin-bottom: var(--spacing-lg);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-lg);
}

.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
}

.course-actions {
    display: flex;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-md);
    flex-wrap: wrap;
}

.course-status {
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: 600;
}

.course-status.published {
    background: var(--success-color);
    color: white;
}

.course-status.draft {
    background: var(--warning-color);
    color: var(--text-primary);
}
`;

// Apply styles if not already in CSS
if (!document.querySelector('#lesson-viewer-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'lesson-viewer-styles';
    styleSheet.textContent = lessonViewerStyles;
    document.head.appendChild(styleSheet);
}
