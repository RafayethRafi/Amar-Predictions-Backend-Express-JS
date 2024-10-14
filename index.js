// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/users', require('./routes/users'));
// app.use('/', require('./routes/auth'));
// app.use('/admin', require('./routes/admin'));

// app.get('/', (req, res) => {
//   res.send('Welcome to the API');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // Export the Express API
// module.exports = app;



const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Define the data directory
const dataDir = path.join(__dirname, 'data');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the data directory
app.use('/data', express.static(dataDir));

// Routes
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };