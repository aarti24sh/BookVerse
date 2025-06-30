const express = require('express');
const router = express.Router();
const { register, login, changePassword } = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');

// Validation middlewares
const validateRegister = [
  check('username', 'Username is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6+ chars').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return errors and stop here
      return res.status(400).json({ 
        success: false,
        errors: errors.array()
      });
    }
    next(); // Important: call next() only if no errors!
  }
];

const validateLogin = [
  check('email')
    .trim()
    .isEmail()
    .withMessage('Please include a valid email'),
  check('password')
    .notEmpty()
    .withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  }
];

// Validation for change password
const validateChangePassword = [
  check('currentPassword', 'Current password is required').notEmpty(),
  check('newPassword', 'New password must be at least 6 characters and include letters, numbers, and special characters')
    .isLength({ min: 6 })
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

// Routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.put('/change-password', protect, validateChangePassword, changePassword);

module.exports = router;