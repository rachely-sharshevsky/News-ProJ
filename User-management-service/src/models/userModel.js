const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    preferences: {
        type: [String], // Array of user preferences
        default: [],
        required: true,
    },
    communicationChannel: {
        type: String,
        enum: ['email', 'telegram'], // Example: email or telegram
        required: true,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the User model
const User = mongoose.model('User', userSchema, 'users'); // Explicitly naming the MongoDB collection

module.exports = User;
