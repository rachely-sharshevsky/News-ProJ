const userService = require('../services/userService');
const logger = require('../utils/logger');

const userController = {
    // Create a new user
    async createUser(req, res) {
        try {
            const userData = req.body;
            logger.info(`Controller: Creating user with data: ${JSON.stringify(userData)}`);
            const user = await userService.createUser(userData);
            res.status(201).json(user);
            logger.info(`Controller: User created successfully with ID: ${user._id}`);
        } catch (error) {
            logger.error(`Controller: Error creating user: ${error.message}`);
            res.status(500).json({ error: 'Failed to create user' });
        }
    },

    // Get a user by ID
    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            logger.info(`Controller: Fetching user with ID: ${userId}`);
            const user = await userService.getUserById(userId);
            if (!user) {
                logger.warn(`Controller: User with ID ${userId} not found.`);
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            logger.error(`Controller: Error fetching user: ${error.message}`);
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    },

    // Update user preferences
    async updatePreferences(req, res) {
        try {
            const userId = req.params.id;
            const preferences = req.body.preferences;
            logger.info(`Controller: Updating preferences for user ${userId}`);
            const updatedUser = await userService.updatePreferences(userId, preferences);
            if (!updatedUser) {
                logger.warn(`Controller: User with ID ${userId} not found.`);
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(updatedUser);
        } catch (error) {
            logger.error(`Controller: Error updating preferences: ${error.message}`);
            res.status(500).json({ error: 'Failed to update preferences' });
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            logger.info(`Controller: Deleting user with ID: ${userId}`);
            const deletedUser = await userService.deleteUser(userId);
            if (!deletedUser) {
                logger.warn(`Controller: User with ID ${userId} not found.`);
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: `User with ID ${userId} deleted successfully.` });
        } catch (error) {
            logger.error(`Controller: Error deleting user: ${error.message}`);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
};

module.exports = userController;
