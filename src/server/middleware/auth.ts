import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { UserService } from '../services/UserService';

export function auth(userService: UserService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        throw new AppError('No token provided', 401);
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);

      const user = userService.getUserById(decoded.userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }

      req.user = user;
      next();
    } catch (error) {
      next(new AppError('Invalid token', 401));
    }
  };
}