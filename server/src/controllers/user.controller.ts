import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import { sendCookie } from '../utils/features.js';
import { ErrorHandler } from '../middleware/error.js';
import type { NextFunction, Request, Response } from 'express';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler('User already exists!', 400));

    const hashedPassword = await bcryptjs.hash(password, 10);
    user = await User.create({ email, password: hashedPassword });

    // set cookies
    sendCookie(user._id, res, 'Registered Successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // we wrote this code '.select("+password")' so as to get password with whatever it is returning
    const user = await User.findOne({ email }).select('+password');

    // check if user exists
    if (!user || !user.password)
      return next(new ErrorHandler('Invalid email or password', 400));

    // check if password hashes match
    const isMatch = await bcryptjs.compare(password, user.password);

    // if password doesn't match send this json
    if (!isMatch)
      return next(new ErrorHandler('Invalid email or password', 400));

    // if password matches, then set cookies
    sendCookie(user._id, res, `Welcome back, ${user.email}`, 200);
  } catch (error) {
    next(error);
  }
};

export const logout = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(200)
      .cookie('token', '', {
        httpOnly: true,
        maxAge: 0,
        sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
        secure: process.env.NODE_ENV === 'Development' ? false : true,
      })
      .json({
        success: true,
      });
  } catch (error) {
    next(error);
  }
};
