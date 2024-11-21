const fetch = require('node-fetch');
const logger = require('../utils/logger');

const sendMessage = async ({emailAddress,subject ,emailBody}) => {
    try {
            
        const daprPort = process.env.DAPR_HTTP_PORT || 3513;
        const emailServiceId = 'email-service'; // Dapr app-id for Email-Service
        
        
        const url = `http://localhost:${daprPort}/v1.0/invoke/email-accessor-service/method/send-email`;

        logger.info(`Service: Invoking ${emailServiceId} to send message`);

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  emailAddress,subject, emailBody }),
        });

        if (!response.ok) {
            throw new Error(`Service: Failed with status ${response.status}`);
        }

        logger.info('Service: Message sent successfully via email-service');
    } catch (error) {
        logger.error(`Service: Error sending message - ${error.message}`);
        throw new Error(`Error sending message - ${error.message}`);
    }
};

module.exports = { sendMessage };
