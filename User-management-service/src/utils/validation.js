// src/utils/validation.js
const logger = require('../utils/logger');

/**
 * Validates user data.
 * @param {Object} userData - The user data to validate.
 * @throws Will throw an error if validation fails.
 */
function validateUser(userData) {
  logger.info("Validation: Validating user data");
  
  if (!userData.name || typeof userData.name !== 'string' || userData.name.trim().length === 0) {
      throw new Error('Name is required and must be a non-empty string.');
  }
  if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
      throw new Error('A valid email is required.');
  }
  if (!userData.preferences || !Array.isArray(userData.preferences) || userData.preferences.length === 0) {
      throw new Error('Preferences must be a non-empty array.');
  }
  if (!userData.communicationChannel || typeof userData.communicationChannel !== 'string') {
      throw new Error('Communication Channel is required and must be a string.');
  }
}

module.exports = { validateUser };
