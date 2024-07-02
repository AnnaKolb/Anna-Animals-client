const { Sequelize } = require("sequelize");

require('dotenv').config();

console.log(`DB_NAME: ${process.env.DB_NAME}`);
console.log(`DB_USERNAME: ${process.env.DB_USERNAME}`);
console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');

    // You can synchronize models here if needed
    // sequelize.sync();

    // If you want to create the database if it doesn't exist, you need raw SQL commands
    sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`)
      .then(() => {
        console.log('Database created or already exists.');
      })
      .catch(err => {
        console.error('Error creating database:', err);
      });

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
