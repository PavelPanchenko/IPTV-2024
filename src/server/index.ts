import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database';
import { User } from './entities/User';
import { UserService } from './services/UserService';
import { createUserRoutes } from './routes/userRoutes';
import { AppError } from './utils/AppError';

const app = express();
const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('Database connection initialized');

    const userRepository = AppDataSource.getRepository(User);
    const userService = new UserService(userRepository);

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api/users', createUserRoutes(userService));

    // Error handling
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err);

      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          status: 'error',
          message: err.message
        });
      }

      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during initialization:', error);
    process.exit(1);
  }
}

bootstrap();