// Import necessary modules
const express = require('express');
const coreController = require('../controllers/coreController');

// Create an instance of the router
const router = express.Router();

/**
 * Route: /core/register
 * Method: POST
 * Description: Registers a new user
 */
router.post('/register', coreController.registerUser);

/**
 * Route: /core/update
 * Method: PUT
 * Description: Updates user information
 */
router.put('/update', coreController.updateUser);

/**
 * Route: /core/news/latest
 * Method: GET
 * Description: Fetches the latest news asynchronously
 */
router.get('/news/latest', coreController.getLatestNews);

/**
 * Route: /core/news/summarized
 * Method: GET
 * Description: Fetches summarized news asynchronously
 */
router.get('/news/summarized', coreController.getSummarizedNews);

// Export the router
module.exports = router;
