const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const messageRouter = require('./router/messageRouter');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/message', messageRouter);

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
    logger.info(`Message Manager Service is running on port ${PORT}`);
});
