import express from 'express';
import {
  deleteTodo,
  getTodo,
  createTodo,
  updateTodo,
} from '../controllers/todo.controller.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/new', isAuthenticated, createTodo);

router.get('/my', isAuthenticated, getTodo);

router
  .route('/:id')
  .put(isAuthenticated, updateTodo)
  .delete(isAuthenticated, deleteTodo);

export default router;
