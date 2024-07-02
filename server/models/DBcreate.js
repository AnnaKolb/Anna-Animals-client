require('dotenv').config();
const express = require('express');
const router = express.Router();
const mysql = require("mysql2/promise"); // Use mysql2/promise for async/await support

router.use(express.json());

// Function to create database if it doesn't exist
async function createDatabase() {
  try {
    // Connecting to SQL database
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: 3306,
    });

    console.log('Connected to MySQL');

    // Create database if it doesn't exist
    await db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created or already exists`);

    await db.end(); // Close connection

  } catch (err) {
    console.error('Error creating database:', err);
  }
}

// Call the function to create the database
createDatabase();

// Export the router if needed for use in an Express app
module.exports = router;
