const Database = require("better-sqlite3");

const db = new Database("users.db");

db.prepare(`
 CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fullName TEXT,
  contact TEXT,
  identity TEXT,
  pin TEXT,
  createdAt TEXT
 )
`).run();

module.exports = db;
