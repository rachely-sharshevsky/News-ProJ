const fetch = require('node-fetch');
const logger = require('../utils/logger');

class NewsService {
    /**
     * Fetches news from the news-accessor-service using Dapr invoke
     */
    static async getNewsFromAccessor(category) {
        try {
            // Dapr settings for invoking the news-accessor-service
            const daprPort = process.env.DAPR_HTTP_PORT || 3510; // Dapr HTTP port for news-accessor-service
            const accessorAppId = 'news-accessor-service'; // Dapr app-id for news-accessor-service
            const url = `http://localhost:${daprPort}/v1.0/invoke/${accessorAppId}/method/news`;

            logger.info(`Service: Invoking news-accessor-service with category ${category}`);

            // Make HTTP POST request to news-accessor-service
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category }),
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`Failed with status ${response.status}`);
            }

            // Parse the response as JSON
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Service: Error fetching news - ${error.message}`);
        }
    }
}

module.exports = NewsService;
