import type { NextFunction, Response } from 'express';
import { ErrorHandler } from '../middleware/error.js';
import Todo from '../models/Todo.js';
import type { AuthRequest } from '../utils/utils.js';

export const createTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description } = req.body;

    if (!req.user) return next(new ErrorHandler('Unauthorized', 401));

    await Todo.create({
      title,
      description,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Todo added successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) return next(new ErrorHandler('Unauthorized', 401));

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const query: any = { owner: req.user._id };

    if (req.query.keyword) {
      // Escaping special regex characters ensures that if a user searches for
      // a sentence with a "?" or ".", it doesn't break the query.
      const safeKeyword = (req.query.keyword as string)
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      const searchRegex = {
        $regex: safeKeyword,
        $options: 'i',
      };

      query.$or = [{ title: searchRegex }, { description: searchRegex }];
    }

    const [todos, totalTodos] = await Promise.all([
      Todo.find(query).sort({ createdAt: -1 }),
      // Todo.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip),
      Todo.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalTodos / limit);

    res.status(200).json({
      success: true,
      totalTodos,
      totalPages,
      todos,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) return next(new ErrorHandler('Unauthorized', 401));

    const todo = await Todo.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!todo) return next(new ErrorHandler('Todo not found', 404));

    const { title, description, isCompleted } = req.body;

    if (
      title === undefined &&
      description === undefined &&
      isCompleted === undefined
    ) {
      return next(new ErrorHandler('No valid fields provided for update', 400));
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (isCompleted !== undefined) todo.isCompleted = isCompleted;

    await todo.save();

    res.status(200).json({
      success: true,
      message: 'Todo Updated!',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return next(new ErrorHandler('Todo not found', 404));

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Todo Deleted!',
    });
  } catch (error) {
    next(error);
  }
};
