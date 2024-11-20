const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const logger = require('./utils/logger');
const userController = require('./controllers/userController');
const validateObjectId = require('./middlewares/validateObjectId');

dotenv.config();
const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Route for creating a new user
app.post('/user-creation', async (req, res) => {
    try {
        logger.info("Received request to create a new user");
        const user = await userController.createUser(req, res);
        res.status(201).json(user);
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        res.status(500).json({ error: 'Failed to create user' });
    }
});


// Route for getting a user by ID
app.get('/users/:id', validateObjectId, async (req, res) => {
    try {
        const userId = req.params.id;
        logger.info(`Received request to fetch user with ID: ${userId}`);
        const user = await userController.getUserById(req); // שינוי להעברת userId בלבד
        if (!user) {
            logger.warn(`User with ID: ${userId} not found`);
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        logger.error(`Error fetching user: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// Route for updating user preferences
app.put('/users/:id/preferences', validateObjectId, async (req, res) => {
    try {
        logger.info(`Received request to update preferences for user ID: ${req.params.id}`);
        const updatedUser = await userController.updatePreferences(req);
        if (!updatedUser) {
            logger.warn(`User with ID: ${req.params.id} not found`);
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        logger.error(`Error updating preferences: ${error.message}`);
        res.status(500).json({ error: 'Failed to update preferences' });
    }
});

// Route for deleting a user
app.delete('/users/:id', validateObjectId, async (req, res) => {
    try {
        logger.info(`Received request to delete user with ID: ${req.params.id}`);
        const deletedUser = await userController.deleteUser(req);
        if (!deletedUser) {
            logger.warn(`User with ID: ${req.params.id} not found`);
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting user: ${error.message}`);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Dapr subscription for Pub/Sub topics
app.post("/dapr/subscribe", (req, res) => {
    const subscriptions = [
        {
            topic: "user-creation", 
            route: "/createUserTopic",
            pubsubname: "messagebus",
        },
    ];
    res.json(subscriptions);
});

// Dapr topic handler for user creation
app.post("/createUserTopic", async (req, res) => {
    try {
        const userData = req.body.data;
        logger.info(`Received Pub/Sub message for user creation: ${JSON.stringify(userData)}`);
        const user = await userController.createUser({ body: userData }, res);
        logger.info(`User created successfully from Pub/Sub: ${user._id}`);
        res.status(200).send({ success: true });
    } catch (error) {
        logger.error(`Error handling Pub/Sub user creation: ${error.message}`);
        res.status(500).send({ error: "Failed to process Pub/Sub message" });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    logger.info(`User Accessor Service running on port ${PORT}`);
});
