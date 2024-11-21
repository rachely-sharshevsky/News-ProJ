const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const coreRouter = require('./router/coreRouter');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/core', coreRouter);

const PORT = process.env.PORT || 3015;
app.listen(PORT, () => {
    logger.info(`Core Manager Service is running on port ${PORT}`);
});
