const db = require('./connection'); // Adjust the path based on your actual structure

async function getAllCategories() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM categories', (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = { getAllCategories };