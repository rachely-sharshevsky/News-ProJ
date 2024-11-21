const messageService = require('../services/messageService');
const logger = require('../utils/logger');

/**
 * Handles sending messages dynamically based on channel and payload.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const sendMessageHandler = async (req, res) => {
    try {
        const { channel, payload } = req.body;

        // Validate required fields
        if (!channel || !payload) {
            logger.error('Controller: Missing required fields: channel or payload');
            return res.status(400).json({ error: 'Channel and payload are required.' });
        }

        logger.info(`Controller: Sending message via ${channel}`);
        await messageService.sendMessage(channel, payload);
        res.status(200).json({ success: true, message: `Message sent via ${channel}` });
    } catch (error) {
        logger.error(`Controller: Failed to send message - ${error.message}`);
        res.status(500).json({ error: `Failed to send message via ${error.message}` });
    }
};

module.exports = { sendMessageHandler };
