// =====================================================
// Authentication Routes
// =====================================================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { optionalAuth } = require('../middleware/auth');

const rateLimit = require('express-rate-limit');

// Rate limiting for SSO handoffs (protect against brute force / denial of service)
const ssoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // Limit each IP to 60 SSO requests per window
  message: {
    success: false,
    error: 'Too many authentication handoff requests from this IP. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Public routes - no authentication required
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/sso', ssoLimiter, authController.ssoLogin);

// Routes that use optionalAuth - will get userId from JWT if token provided
router.get('/me', optionalAuth, authController.getCurrentUser);
router.put('/me', optionalAuth, authController.updateCurrentUser);
router.put('/change-password', optionalAuth, authController.changePassword);

module.exports = router;

