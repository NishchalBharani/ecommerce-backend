const mysql = require('../db/connection');

const createCategoriesTable = `
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  data JSON NOT NULL,
  offers JSON,
  nowTrending JSON
);
`;

mysql.query(createCategoriesTable, (err) => {
  if (err) {
    console.error('Error creating categories table:', err);
  } else {
    console.log('Categories table created or already exists');
  }
});