const mysql = require('../db/connection');

// Define the columns for the users table
const usersTableDefinition = `
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
`;

// Create or ensure the existence of the users table
const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (${usersTableDefinition})`;

mysql.query(createUsersTableQuery, (err) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Users table created or already exists');
  }
});