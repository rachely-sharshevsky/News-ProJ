const fetch = require('node-fetch');
const logger = require('../utils/logger');

// Map channels to their respective services, endpoints, and Dapr ports
const channelConfig = {
    email: {
        serviceId: 'email-accessor-service',
        method: 'send-email',
        daprPort: 3513, // Dapr port for Email Accessor Service
        requiredFields: ['emailAddress', 'subject', 'emailBody'], // Required fields for email
    },
    whatsapp: {
        serviceId: 'whatsapp-accessor-service',
        method: 'send-whatsapp',
        daprPort: 3514, // Dapr port for WhatsApp Accessor Service
        requiredFields: ['phoneNumber', 'message'], // Required fields for WhatsApp
    },
};

/**
 * Sends a message via the specified channel (Email or WhatsApp).
 * Dynamically connects to the appropriate Accessor service using Dapr.
 * @param {string} channel - The communication channel (e.g., "email", "whatsapp").
 * @param {Object} payload - The payload containing fields specific to the channel.
 * @throws Will throw an error if the channel is invalid, the request fails, or required fields are missing.
 */
const sendMessage = async (channel, payload) => {
    try {
        const config = channelConfig[channel];

        // Validate the provided channel
        if (!config) {
            throw new Error(`Invalid channel specified: ${channel}`);
        }

        // Validate required fields for the channel
        const missingFields = config.requiredFields.filter((field) => !payload[field]);
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields for ${channel}: ${missingFields.join(', ')}`);
        }

        // Build the URL dynamically based on the channel configuration and Dapr port
        const url = `http://localhost:${config.daprPort}/v1.0/invoke/${config.serviceId}/method/${config.method}`;
        logger.info(`Service: Invoking ${config.serviceId} to send message via ${channel}`);
        logger.info(`Payload: ${JSON.stringify(payload)}`);

        // Perform the HTTP request to the Accessor service
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        // Handle errors in the response
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Service: Failed to send message via ${channel} - Status ${response.status}, Response: ${errorBody}`);
        }

        // Parse the response from the Accessor service
        const responseData = await response.json();
        logger.info(`Service: Message sent successfully via ${channel}. Response: ${JSON.stringify(responseData)}`);

        return responseData;
    } catch (error) {
        logger.error(`Service: Error sending message via ${channel} - ${error.message}`);
        throw new Error(`Error sending message via ${channel} - ${error.message}`);
    }
};

module.exports = { sendMessage };
