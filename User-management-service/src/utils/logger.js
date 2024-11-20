const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

// Define log directory
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Create a Winston logger instance
const logger = createLogger({
    level: 'info', // Default log level
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        // Log to the console
        new transports.Console(),
        // Log to a file
        new transports.File({ filename: path.join(logDir, 'app.log') }),
    ],
});

module.exports = logger;
