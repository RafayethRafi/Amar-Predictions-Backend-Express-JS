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
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Define the data directory
const dataDir = path.join(__dirname, 'data');

// CORS configuration
const corsOptions = {
  origin: ['https://sports.amarpredictions.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

// Serve static files from the data directory
app.use('/data', express.static(dataDir));

// Debugging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`${new Date().toISOString()} - Error:`, err.stack);
  res.status(500).send('Something broke!');
});

// HTTPS configuration
const httpsOptions = {
  key: fs.readFileSync('/path/to/your/private-key.pem'),
  cert: fs.readFileSync('/path/to/your/certificate.pem')
};

// Create HTTPS server
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});

module.exports = { app };