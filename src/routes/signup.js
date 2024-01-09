const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');

router.post('/signup', async (req, res) => {
  console.log('Route is being hit!');
  res.send('Hello from signup route!');
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = 'INSERT INTO users (firstName, lastName, email, password, phoneNumber) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [firstName, lastName, email, hashedPassword, phoneNumber], (error, results, fields) => {
      console.log("Results:", results);
      console.log("Fields:", fields);

      if (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
      }

      if (results.affectedRows === 1) {
        
        const token = jwt.sign({ userId: results.insertId }, "SECRET_KEY", { expiresIn: '1h' });

        console.log('User signed up successfully');
        console.log('Sending response with token:', token);

        return res.status(201).json({ message: 'User signed up successfully', token });
      } else {
        
        console.error('User insertion failed');
        return res.status(500).json({ error: 'Internal Server Error', details: 'User insertion failed' });
      }
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
