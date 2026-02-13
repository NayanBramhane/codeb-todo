import express from 'express';
import {
  deleteTodo,
  getTodo,
  createTodo,
  updateTodo,
} from '../controllers/todo.controller.js';
import { isAuthenticated } from '../middleware/auth.js';
import { body, param, query } from 'express-validator';
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
      .isLength({ max: 50 })
      .withMessage('Title must be less than 50 characters'),

    body('description')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Description too long'),

    body('isCompleted')
      .optional()
      .isBoolean()
      .withMessage('isCompleted must be a true or false value'),
  ],
  validate,
  createTodo,
);

// get all todos for authenticated user
router.get(
  '/',
  isAuthenticated,
  [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be at least 1'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
    query('keyword')
      .optional()
      .isLength({ min: 3, max: 100 })
      .withMessage('Search term must be between 3 and 100 characters'),
  ],
  validate,
  getTodo,
);

// update todo
router.put(
  '/:id',
  isAuthenticated,
  [
    param('id').isMongoId().withMessage('Invalid Todo ID'),
    body('title')
      .optional()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 100 })
      .withMessage('Title must be less than 100 characters'),

    body('description')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Description too long'),

    body('isCompleted')
      .optional()
      .isBoolean()
      .withMessage('isCompleted must be a true or false value'),
  ],
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
