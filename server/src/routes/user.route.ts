import { Router } from 'express';
import { register, login, logout } from '../controllers/user.controller.js';

const router = Router();

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Logout user
router.get('/logout', logout);

export default router;
