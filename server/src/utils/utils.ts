import type { IUser } from '../models/User.js';
import type { Request } from 'express';

export interface AuthRequest extends Request {
  user?: IUser | null;
}
