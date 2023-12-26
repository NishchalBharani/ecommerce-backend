const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../constants'); // Add this line with your own secret key
const db = require('../db/connection');

// Login API endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the user exists in the database
    const selectQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(selectQuery, [email], async (error, results) => {
      if (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, results[0].password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: results[0].id }, SECRET_KEY, { expiresIn: '1h' });

      console.log('User logged in successfully');
      return res.json({ message: 'User logged in successfully', token });
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
