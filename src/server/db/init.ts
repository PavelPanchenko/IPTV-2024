import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { DEMO_CREDENTIALS } from '../../constants';

async function initializeDatabase() {
  const db = new Database('streamverse.db');

  // Create users table
  db.exec(`
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

  // Create demo user if not exists
  const demoUser = db.prepare('SELECT * FROM users WHERE email = ?').get(DEMO_CREDENTIALS.email);
  
  if (!demoUser) {
    const hashedPassword = await bcrypt.hash(DEMO_CREDENTIALS.password, 10);
    db.prepare(`
      INSERT INTO users (email, username, password, balance)
      VALUES (?, ?, ?, ?)
    `).run(DEMO_CREDENTIALS.email, 'demo', hashedPassword, 50.00);
    
    console.log('Demo user created');
  }

  console.log('Database initialized successfully');
  db.close();
}

initializeDatabase().catch(console.error);