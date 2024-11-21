import express from 'express';
import bodyParser from 'body-parser';
import newsAIRoutes from './routes/newsAIRoutes.js';
import logger from './utils/logger.js';

const app = express();
const PORT = 3007;

app.use(bodyParser.json());
app.use('/api/news-ai', newsAIRoutes);

app.listen(PORT, () => {
    logger.info(`NewsAIService is running on port ${PORT}`);
});
