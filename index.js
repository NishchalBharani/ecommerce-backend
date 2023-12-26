const express = require('express');
const cors = require('cors');
const { PORT } = require('./constants');
const db = require('./src/db/connection');
const categoryRoutes = require('./src/routes/categoryRoutes');
const signupRoute = require('./src/routes/signup');
const loginRoute = require('./src/routes/login')

const app = express();

// Enable CORS for all routes
app.use(cors());

// Use middleware to parse JSON requests
app.use(express.json());

// Use category routes
app.use('/api', categoryRoutes);

// Use signup route
app.use('/api', signupRoute);

// Use login route
app.use('/api', loginRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
