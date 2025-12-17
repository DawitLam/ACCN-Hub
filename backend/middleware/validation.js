const { body, param, validationResult } = require('express-validator');

// Validation result handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Auth validation rules
const registerValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s-']+$/).withMessage('First name contains invalid characters'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s-']+$/).withMessage('Last name contains invalid characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('role')
    .optional()
    .isIn(['student', 'instructor']).withMessage('Invalid role'),
  
  validate
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  validate
];

// Course validation rules
const courseValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Course title is required')
    .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Course description is required')
    .isLength({ min: 20, max: 1000 }).withMessage('Description must be between 20 and 1000 characters'),
  
  body('track')
    .notEmpty().withMessage('Course track is required')
    .isIn(['Mechanical', 'Electrical', 'Coding', 'CAD', 'Other']).withMessage('Invalid track'),
  
  body('difficulty')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid difficulty level'),
  
  body('prerequisites')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Prerequisites must be less than 500 characters'),
  
  validate
];

// MongoDB ObjectId validation
const objectIdValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  courseValidation,
  objectIdValidation,
  validate
};
