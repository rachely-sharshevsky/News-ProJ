const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const emailController = require('./controllers/emailController');

dotenv.config();

const app = express();
app.use(express.json());

// API Endpoint for email service

app.post('/send-email', emailController.sendEmail);

const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
    logger.info(`Email Accessor Service is running on port ${PORT}`);
});
