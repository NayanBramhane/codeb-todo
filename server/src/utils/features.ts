import jwt from 'jsonwebtoken';
import { type Response } from 'express';
import mongoose from 'mongoose';

// sendCookie function
export const sendCookie = (
  id: mongoose.Types.ObjectId,
  res: Response,
  message: string,
  statusCode: number = 200,
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign({ id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie('token', token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
      secure: process.env.NODE_ENV === 'Development' ? false : true,
    })
    .json({
      success: true,
      message,
    });
};

// secure attribute in cookie is specified because we have set sameSite as none
