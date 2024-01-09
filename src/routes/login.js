const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');

router.post('/login', async (req, res) => {
  try {
    console.log("1");
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("2.1");
      return res.status(400).json({ error: 'Email and password are required' });
    }
    console.log("2.2");

    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    console.log("3");

    if (!user) {
      console.log("4.1");
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log("4.2");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("5");

    if (!isPasswordValid) {
      console.log("6.1");
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log("6.2");
    const token = jwt.sign({ userId: user.id }, "SECRET_KEY", { expiresIn: '1h' });

    console.log("7");
    console.log('User logged in successfully');
    console.log("8");
    return res.send('User logged in successfully');
  } catch (error) {
    console.log("9");
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
