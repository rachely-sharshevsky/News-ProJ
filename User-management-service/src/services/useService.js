const { DaprClient } = require('@dapr/dapr');
const logger = require('../utils/logger');
const { validateUser } = require('../utils/validation');

// Dapr configuration
const daprHost = "127.0.0.1"; // Local sidecar address
const daprPort = "3501";      // Sidecar HTTP port
const daprClient = new DaprClient(daprHost, daprPort);

class UserService {
    // Create a new user
    async createUser(userData) {
        try {
            logger.info('Service: Creating a new user...');
            
            // Publish to Pub/Sub topic
            await daprClient.pubsub.publish("messagebus", "user-creation", userData);
            logger.info("Service: User creation request published to 'user-creation' topic.");

            // Invoke Accessor service to save user in DB
            logger.info("Service: Invoking Accessor service to save user...");
            const response = await daprClient.invoker.invoke(
                "User-accessor-service",
                "createUser",
                "POST",
                userData
            );

            logger.info(`Service: User created successfully with ID: ${response._id}`);
            return response;
        } catch (error) {
            logger.error(`Service: Error creating user - ${error.message}`);
            throw error;
        }
    }

    // Get a user by ID
    async getUserById(userId) {
        try {
            logger.info(`Service: Fetching user with ID: ${userId}`);

            // Invoke Accessor service to get user details
            const response = await daprClient.invoker.invoke(
                "User-accessor-service",
                `users/${userId}`,
                "GET"
            );

            logger.info(`Service: Successfully fetched user: ${response._id}`);
            return response;
        } catch (error) {
            logger.error(`Service: Error fetching user by ID - ${error.message}`);
            throw error;
        }
    }

    // Update user preferences
    async updateUserPreferences(userId, preferences) {
        try {
            logger.info(`Service: Updating preferences for user ID: ${userId} with preferences: ${preferences}`);

            // Invoke Accessor service to update preferences
            const response = await daprClient.invoker.invoke(
                "User-accessor-service",
                `users/${userId}/preferences`,
                "PUT",
                { preferences }
            );

            logger.info(`Service: Preferences updated successfully for user ID: ${response._id}`);
            return response;
        } catch (error) {
            logger.error(`Service: Error updating preferences - ${error.message}`);
            throw error;
        }
    }

    // Delete a user by ID
    async deleteUser(userId) {
        try {
            logger.info(`Service: Deleting user with ID: ${userId}`);

            // Invoke Accessor service to delete user
            const response = await daprClient.invoker.invoke(
                "User-accessor-service",
                `users/${userId}`,
                "DELETE"
            );

            logger.info(`Service: User deleted successfully with ID: ${userId}`);
            return response;
        } catch (error) {
            logger.error(`Service: Error deleting user - ${error.message}`);
            throw error;
        }
    }
}

module.exports = new UserService();
