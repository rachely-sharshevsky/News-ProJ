const fetch = require('node-fetch');
const logger = require('../utils/logger');

// Map service appIds to their Dapr HTTP ports
const servicePorts = {
    'user-manager-service': process.env.DAPR_HTTP_PORT_USER_MANAGER || 3501,
    'news-manager-service': process.env.DAPR_HTTP_PORT_NEWS_MANAGER || 3507,
    'message-manager-service': process.env.DAPR_HTTP_PORT_MESSAGE_MANAGER || 3511,
    'email-accessor-service': process.env.DAPR_HTTP_PORT_EMAIL_ACCESSOR || 3513,
    'whatsapp-accessor-service': process.env.DAPR_HTTP_PORT_WHATSAPP_ACCESSOR || 3514,
};
/**
 * Helper function to invoke Dapr services.
 * @param {string} appId - The ID of the app to invoke.
 * @param {string} method - The method to invoke.
 * @param {Object} [data] - The data to send with the request.
 * @param {string} [httpMethod='POST'] - The HTTP method to use.
 */
const invokeDaprService = async (appId, method, data, httpMethod = 'POST') => {
    const daprHttpPort = servicePorts[appId];
    if (!daprHttpPort) {
        throw new Error(`Service: Dapr HTTP port not defined for appId: ${appId}`);
    }

    const url = `http://localhost:${daprHttpPort}/v1.0/invoke/${appId}/method/${method}`;
    logger.info(`Service: Invoking ${appId}/${method} at port ${daprHttpPort}`);

    const response = await fetch(url, {
        method: httpMethod,
        headers: { 'Content-Type': 'application/json' },
        body: data && httpMethod !== 'GET' ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
        throw new Error(`Service: Failed to invoke ${appId}/${method} - Status: ${response.status}`);
    }

    return response.json();
};

/**
 * Fetch user details from the User Manager service.
 * @param {string} userId - The ID of the user.
 */
const fetchUserDetails = async (userId) => {
    return await invokeDaprService('user-manager-service', `users/${userId}`, null, 'GET');
};

/**
 * Fetch the latest news based on user preferences.
 * @param {Array} preferences - The user's preferences.
 */
const fetchLatestNews = async (preferences) => {
    return await invokeDaprService('news-manager-service', 'news', { preferences });
};

/**
 * Send data to the user's preferred communication channel.
 * @param {Object} data - The data to send.
 * @param {string} channel - The communication channel (e.g., 'email', 'whatsapp').
 * @param {string} email - The email address of the user (if applicable).
 */
const sendToChannel = async (data, channel, email) => {
    const payload = {
        channel,
        emailAddress: email,
        subject: 'Your Latest News',
        emailBody: JSON.stringify(data),
    };

    await invokeDaprService('message-manager-service', 'message/send', payload);
};

/**
 * Fetch and send the latest news to the user based on their preferences and communication channel.
 * @param {string} userId - The ID of the user.
 */
const fetchAndSendLatestNews = async (userId) => {
    try {
        logger.info(`Service: Fetching details for user ID: ${userId}`);
        const userDetails = await fetchUserDetails(userId);

        if (!userDetails.preferences || !userDetails.communicationChannel || !userDetails.email) {
            throw new Error('User details are incomplete. Ensure preferences, communicationChannel, and email are provided.');
        }

        logger.info(`Service: Fetching latest news for user ID: ${userId}`);
        const news = await fetchLatestNews(userDetails.preferences);

        logger.info(`Service: Sending news to user ID: ${userId} via ${userDetails.communicationChannel}`);
        await sendToChannel(news, userDetails.communicationChannel, userDetails.email);

        logger.info(`Service: News successfully sent to user ID: ${userId}`);
        return { status: 'success', message: 'News sent successfully' };
    } catch (error) {
        logger.error(`Service: Error fetching or sending news - ${error.message}`);
        throw error;
    }
};


// Register a new user
const registerUser = async (userData) => {
    return await invokeDaprService('user-manager-service', 'users', userData);
};

// Update user information

const updateUser = async (userId, updateData) => {
    return await invokeDaprService(
        'user-manager-service',
        `users/${userId}/preferences`, // הנתיב המתאים לעדכון
        updateData,
        'PUT'
    );
};
/**
 * Summarize news articles using the AI Engine service.
 */
const summarizeNews = async (newsArticles) => {
    return await invokeDaprService('ai-engine-service', 'api/news-ai/summarize', { results: newsArticles });
};

/**
 * Fetch news, summarize it, and send to the user's communication channel.
 */
const fetchAndSendSummarizedNews = async (userId) => {
    try {
        logger.info(`Service: Fetching user details for ID: ${userId}`);
        const userDetails = await fetchUserDetails(userId);

        if (!userDetails.preferences || !userDetails.communicationChannel || !userDetails.email) {
            throw new Error('User details are incomplete. Ensure preferences, communicationChannel, and email are provided.');
        }

        logger.info(`Service: Fetching news for user ID: ${userId}`);
        const news = await fetchLatestNews(userDetails.preferences);

        logger.info(`Service: Summarizing news for user ID: ${userId}`);
        const summarizedNews = await summarizeNews(news);

        logger.info(`Service: Sending summarized news to user ID: ${userId} via ${userDetails.communicationChannel}`);
        await sendToChannel(summarizedNews, userDetails.communicationChannel, userDetails.email);

        logger.info(`Service: Summarized news successfully sent to user ID: ${userId}`);
        return { status: 'success', message: 'Summarized news sent successfully' };
    } catch (error) {
        logger.error(`Service: Error in processing summarized news - ${error.message}`);
        throw error;
    }
};


module.exports = {
    registerUser,
    updateUser,
    fetchAndSendSummarizedNews,
    fetchAndSendLatestNews,
};
