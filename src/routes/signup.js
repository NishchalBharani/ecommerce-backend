const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../constants'); // Add this line with your own secret key
const db = require('../db/connection');

// Signup API endpoint
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, email, hashedPassword], (error, results) => {
      if (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: results.insertId }, SECRET_KEY, { expiresIn: '1h' });

      console.log('User signed up successfully');
      return res.status(201).json({ message: 'User signed up successfully', token });
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
