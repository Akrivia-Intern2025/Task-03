
const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Set default logging level
  format: winston.format.combine(
    winston.format.colorize(), // Add color to logs
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] - ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'app.log' }) // Log to a file
  ]
});

module.exports = logger;
