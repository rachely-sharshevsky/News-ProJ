import NewsSummarizer from '../services/NewsSummarizer.js';
import logger from '../utils/logger.js';

class NewsAIController {
    static async summarizeNews(req, res) {
        try {
            const newsArray = req.body.results;

            if (!Array.isArray(newsArray)) {
                throw new Error('data must be an array.');
            }
            

            logger.info('Received request to summarize all news articles.');
        
            
           
            const result = await NewsSummarizer.summarize(newsArray);

            if (result.success) {
                res.status(200).json({
                    success: true,
                    summary: result.summary, // שולח את הסיכום המעובד ללקוח
                });
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            logger.error('Error summarizing news articles:', error);
            res.status(400).json({
                success: false,
                message: 'Failed to summarize news.',
                error: error.message,
            });
        }
    }
}

export default NewsAIController;



