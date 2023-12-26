const db = require('./connection')

function insertUserData(username, email, password) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(query, [username, email, password], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  }

module.exports = { insertUserData }