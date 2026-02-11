import express from 'express';
import {
  deleteTodo,
  getTodo,
  createTodo,
  updateTodo,
} from '../controllers/todo.controller.js';
import { isAuthenticated } from '../middleware/auth.js';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// create todo
router.post(
  '/',
  isAuthenticated,
  [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 100 })
      .withMessage('Title must be less than 100 characters'),

    body('description')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Description too long'),
  ],
  validate,
  createTodo,
);

// get all todos for authenticated user
router.get('/', isAuthenticated, getTodo);

// update todo
router.put(
  '/:id',
  isAuthenticated,
  [param('id').isMongoId().withMessage('Invalid Todo ID')],
  validate,
  updateTodo,
);

// delete todo
router.delete(
  '/:id',
  isAuthenticated,
  [param('id').isMongoId().withMessage('Invalid Todo ID')],
  validate,
  deleteTodo,
);

export default router;
