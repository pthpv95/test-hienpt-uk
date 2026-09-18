const fs = require('fs');
const path = require('path');
const { pool } = require('../db');

const sql = fs.readFileSync(path.join(__dirname, '..', 'sql', 'init.sql'), 'utf8');

async function init() {
  try {
    await pool.query(sql);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Failed to initialize database:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

init();