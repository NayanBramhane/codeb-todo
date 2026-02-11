import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import type { AuthRequest } from '../utils/utils.js';
import type { NextFunction, Response } from 'express';

interface JwtPayload {
  _id: string;
}

export const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: 'Login First',
    });
  }

  try {
    // Decode the token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Find the user in the database
    req.user = await User.findById(decoded._id);

    // If the user does not exist, respond with an error
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
        
      // Handle JWT verification errors (e.g., invalid signature, expired token)
      if (error.name === 'JsonWebTokenError') {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid Token' });
      }

      // Handle token expiration errors
      if (error.name === 'TokenExpiredError') {
        return res
          .status(400)
          .json({ success: false, message: 'Token Expired' });
      }
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
