const { sendMessage } = require('../services/messageService');
const logger = require('../utils/logger');

const sendMessageHandler = async (req, res) => {
    try {
        logger.info('Controller: Received request to send message');
        const { emailAddress,subject ,emailBody} = req.body;

        if (!emailAddress ) {
            logger.error('Controller: Missing required fields: emailAddress ');
            return res.status(400).json({ error: 'Missing required fields: recipient or content' });
        }

        await sendMessage({emailAddress,subject ,emailBody });
        logger.info('Controller: Message sent successfully');
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        logger.error(`Controller: Error sending message - ${error.message}`);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

module.exports = { sendMessageHandler };
