import { Router } from 'express';
import { register, login, logout } from '../controllers/user.controller.js';
import { validate } from '../middleware/validate.js';
import { body } from 'express-validator';

const router = Router();

// Register new user
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Valid email is required'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  validate,
  register,
);

// Login user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),

    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  login,
);

// Logout user
router.get('/logout', logout);

export default router;
