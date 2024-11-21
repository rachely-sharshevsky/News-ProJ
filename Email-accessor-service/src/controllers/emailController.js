const emailService = require('../services/emailService');
const logger = require('../utils/logger');

const sendEmail = async (req, res) => {
    try {
        logger.info('Controller: Received request to send email');
        
        const { emailAddress, emailBody, params } = req.body;

        // Validation checks
        if (!emailAddress || !emailBody) {
            logger.error('Controller: Missing required fields: emailAddress or emailBody');
            return res.status(400).json({ error: 'Missing required fields: emailAddress or emailBody' });
        }

        if (typeof emailAddress !== 'string' || !emailAddress.includes('@')) {
            logger.error('Controller: Invalid email address format');
            return res.status(400).json({ error: 'Invalid email address format' });
        }

        if (typeof emailBody !== 'string' || emailBody.trim() === '') {
            logger.error('Controller: Email body cannot be empty');
            return res.status(400).json({ error: 'Email body cannot be empty' });
        }

        if (params && typeof params !== 'object') {
            logger.error('Controller: Invalid params format. Must be an object');
            return res.status(400).json({ error: 'Invalid params format. Must be an object' });
        }

        // Call the service to send the email
        await emailService.sendEmail({ emailAddress, emailBody, params });

        logger.info('Controller: Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        logger.error(`Controller: Error sending email - ${error.message}`);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

module.exports = { sendEmail };
