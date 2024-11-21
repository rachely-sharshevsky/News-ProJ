const coreService = require('../services/coreService');
const logger = require('../utils/logger');

// Handles user registration
const registerUser = async (req, res) => {
    try {
        logger.info('Controller: Registering user');
        const userData = req.body;
        const result = await coreService.registerUser(userData);
        res.status(201).json(result);
    } catch (error) {
        logger.error(`Controller: Error in registering user - ${error.message}`);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Handles user update
const updateUser = async (req, res) => {
    try {
        logger.info('Controller: Updating user information');
        const updateData = req.body;
        const result = await coreService.updateUser(updateData);
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Controller: Error in updating user - ${error.message}`);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

/**
 * Handles fetching and sending the latest news to the user based on their preferences and communication channel.
 */
const getLatestNews = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        logger.info(`Controller: Fetching and sending latest news for user ID: ${userId}`);
        const result = await coreService.fetchAndSendLatestNews(userId);

        res.status(202).json(result);
    } catch (error) {
        logger.error(`Controller: Error fetching or sending news - ${error.message}`);
        res.status(500).json({ error: 'Failed to process news request' });
    }
};

/**
 * Handles fetching and sending summarized news to the user based on their preferences and communication channel.
 */
const getSummarizedNews = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        logger.info(`Controller: Fetching and sending summarized news for user ID: ${userId}`);
        const result = await coreService.fetchAndSendSummarizedNews(userId);

        res.status(202).json(result);
    } catch (error) {
        logger.error(`Controller: Error fetching or sending summarized news - ${error.message}`);
        res.status(500).json({ error: 'Failed to process summarized news request' });
    }
};

// Initiates fetching summarized news asynchronously

module.exports = {
    registerUser,
    updateUser,
    getLatestNews,
    getSummarizedNews,
};
