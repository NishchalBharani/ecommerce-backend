const express = require('express');
const cors = require('cors');
const { PORT } = require('./constants');
const db = require('./src/db/connection');
const categoryRoutes = require('./src/routes/categoryRoutes');
const signupRoute = require('./src/routes/signup');
const loginRoute = require('./src/routes/login')

const app = express();

app.use(cors());

app.use(express.json());

// app.use('/api', categoryRoutes);

app.use('/api', signupRoute);

app.use('/api', loginRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
