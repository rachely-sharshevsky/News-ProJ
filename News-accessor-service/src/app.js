const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const NewsController = require('./controllers/newsController');

dotenv.config();

const app = express();
app.use(express.json());

// Route to fetch news based on category
app.post('/news', NewsController.getNews);

// Start the server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    logger.info(`News Accessor Service is running on port ${PORT}`);
});
