const authRouter = require('express').Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Public routes
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

// Protected routes
authRouter.get('/me', authenticate, authController.getCurrentUser);

module.exports = authRouter;
