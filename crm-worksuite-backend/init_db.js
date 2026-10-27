require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initDb() {
  try {
    // 1. Connect without database to create crm_db
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      port: parseInt(process.env.DB_PORT) || 3306,
      multipleStatements: true
    });

    console.log('Connected to MySQL server.');
    await connection.query('CREATE DATABASE IF NOT EXISTS `crm_db`;');
    console.log('Database crm_db created or already exists.');
    await connection.end();

    // 2. Connect to crm_db and import schema if needed
    const dbConn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: 'crm_db',
      port: parseInt(process.env.DB_PORT) || 3306,
      multipleStatements: true
    });

    const [tables] = await dbConn.query('SHOW TABLES;');
    if (tables.length === 0) {
      console.log('No tables found. Importing schema.sql...');
      const schemaPath = path.join(__dirname, 'schema.sql');
      if (fs.existsSync(schemaPath)) {
        const sql = fs.readFileSync(schemaPath, 'utf8');
        await dbConn.query(sql);
        console.log('schema.sql imported successfully!');
      }
    } else {
      console.log(`crm_db already contains ${tables.length} tables.`);
    }

    await dbConn.end();
    console.log('Database init complete!');
  } catch (err) {
    console.error('Database init error:', err.message);
  }
}

initDb();
