const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const usersRoutes = require('../routes/users');
const authRoutes = require('../routes/auth');
const adminRoutes = require('../routes/admin');

// Use routes
app.use('/users', usersRoutes);
app.use('/', authRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the Express API
module.exports = app;