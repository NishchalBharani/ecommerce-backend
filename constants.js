module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL || 'mysql://root:' + encodeURIComponent('P4ssw0rd!@#1997') + '@localhost:3306/products',
    // Add other constants as needed
  };