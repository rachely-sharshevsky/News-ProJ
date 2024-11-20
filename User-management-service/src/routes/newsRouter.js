const express = require('express');
const NewsController = require('../controllers/newsController');

const router = express.Router();

// Define the POST route to fetch news by category
router.post('/', NewsController.getNews);

module.exports = router;
