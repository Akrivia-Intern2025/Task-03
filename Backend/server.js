const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const sharp = require('sharp'); 
const mysql = require('mysql2');
const logger = require('./middleware/loggers/loggers');

// Log different levels of messages
logger.info('its working yash!');
// You can also log with dynamic values
const userId = 123;
logger.info(`User with ID ${userId} has logged in`);

// const dotenv = require('dotenv');
// dotenv.config({path:'../'});
dotenv.config();
const app = express();
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })); 

const connection = mysql.createConnection({
  host: 'localhost',      // Your MySQL server address (use 'localhost' for local)
  user: 'root',           // Your MySQL username
  password: '',           // Your MySQL password (empty if there's no password)
  database: 'inventory'  // Your database name
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});
// Routes
app.use('/api', routes);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));