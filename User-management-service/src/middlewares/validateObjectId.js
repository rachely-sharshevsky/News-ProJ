const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Middleware to validate MongoDB ObjectId in request parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function validateObjectId(req, res, next) {
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.warn(`Invalid ObjectId format: ${id}`);
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    // If valid, proceed to the next middleware or route handler
    next();
}

module.exports = validateObjectId;
