const db = require('./connection');

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results[0]);
    });
  });
}

module.exports = {
  getUserByEmail,
};