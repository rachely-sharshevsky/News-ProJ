const whatsappService = require('../services/whatsappService');
const logger = require('../utils/logger');

/**
 * Controller for handling WhatsApp messaging requests.
 */
const sendWhatsAppMessage = async (req, res) => {
    try {
        logger.info('Controller: Received request to send WhatsApp message');
        const { phoneNumber, message } = req.body;

        // Validate input fields
        if (!phoneNumber || !message) {
            logger.error('Controller: Missing required fields: phoneNumber or message');
            return res.status(400).json({ error: 'Missing required fields: phoneNumber or message' });
        }

        // Call the service to send the WhatsApp message
        await whatsappService.sendMessage({ phoneNumber, message });
        logger.info('Controller: WhatsApp message sent successfully');
        res.status(200).json({ message: 'WhatsApp message sent successfully' });
    } catch (error) {
        logger.error(`Controller: Error sending WhatsApp message - ${error.message}`);
        res.status(500).json({ error: 'Failed to send WhatsApp message' });
    }
};

module.exports = { sendWhatsAppMessage };
