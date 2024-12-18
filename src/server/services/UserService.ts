import { Repository } from 'typeorm';
import { User, CreateUserDTO, UpdateUserDTO } from '../entities/User';
import { generateToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async register(data: CreateUserDTO): Promise<{ user: Omit<User, 'password'>, token: string }> {
    const existingUser = await this.userRepository.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new AppError('User with this email already exists', 400);
    }

    const user = this.userRepository.create(data);
    await user.hashPassword();
    await this.userRepository.save(user);

    const token = generateToken({ userId: user.id });
    const { password, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, token };
  }

  async login(email: string, password: string): Promise<{ user: Omit<User, 'password'>, token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken({ userId: user.id });
    const { password: _, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, token };
  }

  async updateProfile(userId: number, data: UpdateUserDTO): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (data.password) {
      user.password = data.password;
      await user.hashPassword();
    }

    Object.assign(user, { ...data, password: user.password });
    await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateBalance(userId: number, amount: number): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.balance += amount;
    await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateSubscription(
    userId: number, 
    plan: string, 
    endDate: Date
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.subscriptionPlan = plan;
    user.subscriptionEndDate = endDate;
    await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserById(userId: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}