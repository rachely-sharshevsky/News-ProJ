const fetch = require('node-fetch');
const logger = require('../utils/logger');

/**
 * Service for sending messages via WhatsApp.
 */
const sendMessage = async ({ phoneNumber, message }) => {
    try {
        // WhatsApp API settings
        const whatsappApiUrl = process.env.WHATSAPP_API_URL; // e.g., https://api.whatsapp.com/send
        const apiKey = process.env.WHATSAPP_API_KEY;

        logger.info('Service: Sending WhatsApp message');

        const response = await fetch(whatsappApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                to: phoneNumber,
                body: message
            }),
        });

        if (!response.ok) {
            throw new Error(`Service: Failed with status ${response.status}`);
        }

        logger.info('Service: WhatsApp message sent successfully');
    } catch (error) {
        logger.error(`Service: Error sending WhatsApp message - ${error.message}`);
        throw new Error(`Error sending WhatsApp message - ${error.message}`);
    }
};

module.exports = { sendMessage };
