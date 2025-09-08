const db = require('../db');

const createTables = async () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const transactionsTable = `
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type VARCHAR(50) NOT NULL, -- 'income' or 'expense'
      amount NUMERIC(12, 2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const savingGoalsTable = `
    CREATE TABLE IF NOT EXISTS saving_goals (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      goal_name VARCHAR(255) NOT NULL,
      target_amount NUMERIC(12, 2),
      current_amount NUMERIC(12, 2) DEFAULT 0,
      target_date DATE,
      status VARCHAR(50) DEFAULT 'In Progress', -- e.g., 'In Progress', 'Completed'
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    console.log('Creating tables...');
    await db.query(usersTable);
    await db.query(transactionsTable);
    await db.query(savingGoalsTable);
    console.log('Tables created successfully!');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    // In a real script, you might want to end the pool connection if it's a one-off script
    // For now, we'll leave it open as the app will use it.
  }
};

createTables();
