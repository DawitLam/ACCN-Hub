// Security utilities for frontend

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} unsafe - Unsafe string from user input
 * @returns {string} - Safe HTML string
 */
function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Sanitize input by removing potentially dangerous characters
 * @param {string} input - User input
 * @returns {string} - Sanitized input
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.trim().replace(/[<>]/g, '');
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with isValid and message
 */
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    if (password.length < minLength) {
        return {
            isValid: false,
            message: `Password must be at least ${minLength} characters long`
        };
    }
    
    if (!hasUpperCase) {
        return {
            isValid: false,
            message: 'Password must contain at least one uppercase letter'
        };
    }
    
    if (!hasLowerCase) {
        return {
            isValid: false,
            message: 'Password must contain at least one lowercase letter'
        };
    }
    
    if (!hasNumbers) {
        return {
            isValid: false,
            message: 'Password must contain at least one number'
        };
    }
    
    return {
        isValid: true,
        message: 'Password is strong'
    };
}

/**
 * Safely render HTML content
 * Use this when displaying user-generated content
 * @param {string} content - Content to render
 * @returns {string} - Safe HTML
 */
function safeRenderHtml(content) {
    const div = document.createElement('div');
    div.textContent = content;
    return div.innerHTML;
}

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - True if expired
 */
function isTokenExpired(token) {
    if (!token) return true;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        return Date.now() >= expirationTime;
    } catch (error) {
        return true;
    }
}

/**
 * Validate form input before submission
 * @param {Object} formData - Form data object
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} - Validation result
 */
function validateForm(formData, requiredFields) {
    const errors = {};
    
    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            errors[field] = `${field} is required`;
        }
    });
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        escapeHtml,
        sanitizeInput,
        isValidEmail,
        validatePassword,
        safeRenderHtml,
        isTokenExpired,
        validateForm
    };
}
