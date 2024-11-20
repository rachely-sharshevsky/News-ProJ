const NewsService = require('../services/newsService.js');
const logger = require('../utils/logger');

class NewsController {
    /**
     * Handles the request to fetch news from the news-accessor-service
     */
    static async getNews(req, res) {
        try {
            logger.info('Controller: Requesting news from the news-accessor-service');

            // Extract the category from the request body
            const { category } = req.body;
            if (!category) {
                return res.status(400).json({ error: 'Category is required' });
            }

            // Call the service to fetch news
            const news = await NewsService.getNewsFromAccessor(category);
            res.status(200).json(news);

            logger.info('Controller: Successfully returned news to the client');
        } catch (error) {
            logger.error(`Controller: Error fetching news - ${error.message}`);
            res.status(500).json({ error: 'Failed to fetch news' });
        }
    }
}

module.exports = NewsController;
