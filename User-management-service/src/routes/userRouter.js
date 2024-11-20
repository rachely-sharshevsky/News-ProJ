const express = require('express');
const userController = require('../controllers/userController');
const validateObjectId = require('../middlewares/validateObjectId');

const router = express.Router();

// Register a new user
router.post('/', userController.registerUser);

// Get a user by ID
router.get('/:id', validateObjectId, userController.getUserById);

// Update user preferences
router.put('/:id/preferences', validateObjectId, userController.updatePreferences);

// Delete a user by ID
router.delete('/:id', validateObjectId, userController.deleteUser);

module.exports = router;
