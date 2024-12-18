import 'reflect-metadata';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { DEMO_CREDENTIALS } from '../../constants';

async function createDemoUser() {
  try {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(User);

    // Check if demo user exists
    const existingUser = await userRepository.findOne({
      where: { email: DEMO_CREDENTIALS.email }
    });

    if (!existingUser) {
      const user = new User();
      user.email = DEMO_CREDENTIALS.email;
      user.username = 'demo';
      user.password = DEMO_CREDENTIALS.password;
      user.balance = 50.00;

      await user.hashPassword();
      await userRepository.save(user);
      
      console.log('Demo user created successfully');
    } else {
      console.log('Demo user already exists');
    }

    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error creating demo user:', error);
    process.exit(1);
  }
}

createDemoUser();