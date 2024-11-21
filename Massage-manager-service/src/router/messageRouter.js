const express = require('express');
const { sendMessageHandler } = require('../controllers/messageController');

const router = express.Router();

// Route for sending messages
router.post('/send', sendMessageHandler);

module.exports = router;
