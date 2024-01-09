const mariadb = require('mariadb');

const poolConfig = {
  host: 'localhost',
  user: 'kali',
  password: 'P4ssw0rd!@#',
  database: 'ecommerce',
  port: 3306,
  connectionLimit: 100,
  acquireTimeout: 100000,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

console.log("Connection details:", poolConfig);

const connection = mariadb.createPool(poolConfig);

module.exports = connection;