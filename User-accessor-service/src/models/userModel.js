const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferences: { type: [String], default: [] },
    preferredCommunicationChannel: { type: String, enum: ['email', 'telegram'], default: 'email' }, // Communication Channel
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
