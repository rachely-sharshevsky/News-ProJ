const User = require('../models/userModel');
const logger = require('../utils/logger');

const userService = {
    // Create a new user
    async createUser(userData) {
        try {
            logger.info(`Service: Creating user with data: ${JSON.stringify(userData)}`);
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            logger.error(`Service: Error creating user: ${error.message}`);
            throw error;
        }
    },

    // Fetch a user by ID
    async getUserById(userId) {
        try {
            logger.info(`Service: Fetching user with ID: ${userId}`);
            return await User.findById(userId);
        } catch (error) {
            logger.error(`Service: Error fetching user: ${error.message}`);
            throw error;
        }
    },

    // Update user preferences
    async updatePreferences(userId, preferences) {
        try {
            logger.info(`Service: Updating preferences for user ${userId}`);
            return await User.findByIdAndUpdate(userId, { preferences }, { new: true });
        } catch (error) {
            logger.error(`Service: Error updating preferences: ${error.message}`);
            throw error;
        }
    },

    // Delete a user
    async deleteUser(userId) {
        try {
            logger.info(`Service: Deleting user with ID: ${userId}`);
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            logger.error(`Service: Error deleting user: ${error.message}`);
            throw error;
        }
    }
};

module.exports = userService;
