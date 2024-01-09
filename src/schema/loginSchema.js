const mysql = require('../db/connection');

const usersTableDefinition = `
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL.
  phoneNumber INT
`;

const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (${usersTableDefinition})`;

mysql.query(createUsersTableQuery, (err) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Users table created or already exists');
  }
});