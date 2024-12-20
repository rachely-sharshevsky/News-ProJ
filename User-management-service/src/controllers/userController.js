const userService = require('../services/useService');
const logger = require('../utils/logger');
const { validateUser } = require('../utils/validation');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const userData = req.body;
        // Validate user data
        validateUser(userData);

        // Create user using the service layer
        const user = await userService.createUser(userData);
        
        // Respond with the created user
        res.status(201).json(user);
        logger.info(`User registered successfully: ${user._id}`);
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        logger.info('Controller: Fetching user by ID');
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Fetch user data from the service layer
        const user = await userService.getUserById(userId);

        // Send the user details in the response
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            communicationChannel: user.communicationChannel, // Add communication channel
            preferences: user.preferences,
        });
    } catch (error) {
        logger.error(`Controller: Error fetching user - ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Update user preferences
exports.updatePreferences = async (req, res) => {
    try {
        const userId = req.params.id;
        const preferences = req.body.preferences;

        // Validate preferences
        if (!Array.isArray(preferences)) {
            logger.warn('Preferences must be an array.');
            return res.status(400).json({ error: 'Preferences must be an array' });
        }

        // Update preferences using the service layer
        const updatedUser = await userService.updateUserPreferences(userId, preferences);
        
        if (!updatedUser) {
            logger.warn(`User with ID ${userId} not found.`);
            return res.status(404).json({ error: 'User not found' });
        }

        logger.info(`User preferences updated for user: ${updatedUser._id}`);
        res.status(200).json(updatedUser);
    } catch (error) {
        logger.error(`Error updating preferences: ${error.message}`);
        res.status(500).json({ error: 'Failed to update preferences' });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete user using the service layer
        const deletedUser = await userService.deleteUser(userId);
        
        if (!deletedUser) {
            logger.warn(`User with ID ${userId} not found.`);
            return res.status(404).json({ error: 'User not found' });
        }

        logger.info(`User deleted successfully: ${deletedUser._id}`);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting user: ${error.message}`);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
