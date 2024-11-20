const NewsService = require('../services/newsService');
const logger = require('../utils/logger');

class NewsController {
    /**
     * Handle requests to fetch news based on a category.
     */
    static async getNews(req, res) {
        try {
            logger.info('Controller: Requesting news from NewsService');
            
            const { category } = req.body;
            if (!category) {
                return res.status(400).json({ error: 'Category is required' });
            }

            const news = await NewsService.fetchNews(category);
            res.status(200).json(news);
            
            logger.info('Controller: Successfully returned news to the client');
        } catch (error) {
            logger.error(`Controller: Error getting news - ${error.message}`);
            res.status(500).json({ error: 'Failed to get news' });
        }
    }
}

module.exports = NewsController;
