const db = require('./connection');

async function getAllCategories() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM categories', (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      const categories = results.map(category => ({
        ...category,
        data: JSON.parse(category.data),
        offers: category.offers ? JSON.parse(category.offers) : null,
        nowTrending: category.nowTrending ? JSON.parse(category.nowTrending) : null,
      }));

      resolve(categories);
    });
  });
}

module.exports = { getAllCategories };