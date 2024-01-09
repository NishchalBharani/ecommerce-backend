const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../db/categoryQueries'); 

router.get('/categories', async (req, res) => {
    try {
      const categories = await getAllCategories(); 
      res.json(categories);
    } catch (error) {
      console.error('Error getting categories:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });

module.exports = router;