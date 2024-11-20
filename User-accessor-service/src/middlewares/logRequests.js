const logger = require('../utils/logger');

const logRequests = (req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    logger.debug(`Request body: ${JSON.stringify(req.body)}`);
    next();
};

module.exports = logRequests;
