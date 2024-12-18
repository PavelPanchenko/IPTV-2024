import { Database } from 'better-sqlite3';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  subscriptionPlan: string | null;
  subscriptionEndDate: string | null;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDTO {
  email: string;
  username: string;
  password: string;
}

export interface UpdateUserDTO {
  email?: string;
  username?: string;
  password?: string;
  subscriptionPlan?: string;
  subscriptionEndDate?: string;
  balance?: number;
}

export class UserModel {
  constructor(private db: Database) {
    this.initTable();
  }

  private initTable() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        subscription_plan TEXT,
        subscription_end_date TEXT,
        balance REAL DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async create(data: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const stmt = this.db.prepare(`
      INSERT INTO users (email, username, password)
      VALUES (?, ?, ?)
      RETURNING *
    `);

    const user = stmt.get(data.email, data.username, hashedPassword) as User;
    return this.formatUser(user);
  }

  findByEmail(email: string): User | null {
    const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email) as User | null;
    return user ? this.formatUser(user) : null;
  }

  findById(id: number): User | null {
    const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(id) as User | null;
    return user ? this.formatUser(user) : null;
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const updates: string[] = [];
    const values: any[] = [];

    if (data.email) {
      updates.push('email = ?');
      values.push(data.email);
    }

    if (data.username) {
      updates.push('username = ?');
      values.push(data.username);
    }

    if (data.password) {
      updates.push('password = ?');
      values.push(await bcrypt.hash(data.password, 10));
    }

    if (data.subscriptionPlan !== undefined) {
      updates.push('subscription_plan = ?');
      values.push(data.subscriptionPlan);
    }

    if (data.subscriptionEndDate !== undefined) {
      updates.push('subscription_end_date = ?');
      values.push(data.subscriptionEndDate);
    }

    if (data.balance !== undefined) {
      updates.push('balance = ?');
      values.push(data.balance);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');

    const stmt = this.db.prepare(`
      UPDATE users 
      SET ${updates.join(', ')}
      WHERE id = ?
      RETURNING *
    `);

    const user = stmt.get(...values, id) as User;
    return this.formatUser(user);
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  private formatUser(user: any): User {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      subscriptionPlan: user.subscription_plan,
      subscriptionEndDate: user.subscription_end_date,
      balance: user.balance,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };
  }
}