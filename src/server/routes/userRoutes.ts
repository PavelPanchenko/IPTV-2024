import { Router } from 'express';
import { UserService } from '../services/UserService';
import { auth } from '../middleware/auth';
import { AppError } from '../utils/AppError';

export function createUserRoutes(userService: UserService) {
  const router = Router();

  // Register new user
  router.post('/register', async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const result = await userService.register({ email, username, password });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  });

  // Login
  router.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // Protected routes
  router.use(auth(userService));

  // Get current user
  router.get('/me', (req, res) => {
    res.json(req.user);
  });

  // Update profile
  router.patch('/profile', async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const result = await userService.updateProfile(req.user.id, {
        email,
        username,
        password
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // Add balance
  router.post('/balance', async (req, res, next) => {
    try {
      const { amount } = req.body;
      if (typeof amount !== 'number' || amount <= 0) {
        throw new AppError('Invalid amount', 400);
      }

      const result = await userService.updateBalance(req.user.id, amount);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // Update subscription
  router.post('/subscription', async (req, res, next) => {
    try {
      const { plan, endDate } = req.body;
      if (!plan || !endDate) {
        throw new AppError('Plan and end date are required', 400);
      }

      const result = await userService.updateSubscription(
        req.user.id,
        plan,
        endDate
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  return router;
}