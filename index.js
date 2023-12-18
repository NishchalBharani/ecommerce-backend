const express = require('express');
const { PORT } = require('./constants');
const db = require('./src/db/connection');
const categoryRoutes = require('./src/routes/categoryRoutes'); // Adjust the path based on your actual structure

const app = express();

// Use middleware to parse JSON requests
app.use(express.json());

// Use category routes
app.use('/api', categoryRoutes);

// Use other routes or middleware here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});