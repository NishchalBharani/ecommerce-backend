const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: 'localhost',
  user: 'root',
  password: 'P4ssw0rd!@#1997',
  database: 'products',
  port: 3306
});

module.exports = pool;