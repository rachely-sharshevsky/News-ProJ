const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const router = require('./routes/newsRouter');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Define the main route for the service
app.use('/news', router);

// Start the server
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
    logger.info(`News Manager Service is running on port ${PORT}`);
});
