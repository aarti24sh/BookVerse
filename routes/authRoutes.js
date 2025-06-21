const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

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

// Routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;