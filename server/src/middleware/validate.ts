import { validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstErrorMessage =
      errors.array()[0]?.msg || 'Unknown validation error';

    return res.status(400).json({
      success: false,
      // errors: errors.array().map((err) => err.msg),
      message: firstErrorMessage,
    });
  }

  next();
};
