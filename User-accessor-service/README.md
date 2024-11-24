# User-Accessor Service

## Overview
The **User-Accessor Service** handles user data management, including user creation, preferences management, and database interactions. This service communicates with other services via Dapr and uses MongoDB for data persistence.

## Features
- User creation and management.
- Preferences update functionality.
- Integration with Dapr for inter-service communication.
- MongoDB integration for data storage.

## Technologies
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: Database.
- **Dapr**: Distributed application runtime.
- **Docker**: Containerization.

## Prerequisites
- **Node.js**: v16 or higher.
- **MongoDB**: Running instance or container.
- **Docker & Docker Compose**: Installed locally.
- **Dapr CLI**: For debugging and local development.

## Environment Variables
The service requires the following environment variables:
- `DB_URL`: MongoDB connection string.
- `DAPR_HTTP_PORT`: Port for Dapr HTTP communication.

Example `.env` file:

DB_URL=mongodb://mongo:27017/users DAPR_HTTP_PORT=3502

## Endpoints
### 1. **Create User**
- **Method**: POST
- **URL**: `/users`
- **Description**: Creates a new user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "preferences": ["technology", "science"]
  }
Response:
{
  "message": "User created successfully",
  "userId": "1234567890abcdef"
}
pdate Preferences
Method: PATCH
URL: /users/:userId/preferences
Description: Updates user preferences.
{
  "preferences": ["health", "sports"]
}
Response:{
  "message": "Preferences updated successfully"
}
Setip and Running Localy
git clone user-accessor-service
cd User-accessor-service
Install dependencies:
npm install
Start the service (without Docker):
node src/app.js
Start with Docker:docker-compose up --build
Verify the service:

Visit http://localhost:3001 or test via Postman.
Docker Details
Dockerfile:
The service includes a Dockerfile for building the container.
Docker Compose:
The service integrates with other services using docker-compose.yaml


