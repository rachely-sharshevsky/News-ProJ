# User Accessor Service

## Description
The User Accessor Service provides CRUD operations for managing user data. It supports Pub/Sub for user creation events using Dapr.

## Endpoints
### 1. Create User
- **POST /user-creation**: Creates a new user.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "preferences": ["array of strings"],
      "communicationChannel": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "preferences": ["array of strings"],
      "communicationChannel": "string"
    }
    ```

### 2. Get User by ID
- **GET /users/:id**: Fetches a user by ID.
  - **Response**:
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "preferences": ["array of strings"],
      "communicationChannel": "string"
    }
    ```

### 3. Update User Preferences
- **PUT /users/:id/preferences**: Updates the preferences of a user.
  - **Request Body**:
    ```json
    {
      "preferences": ["array of strings"]
    }
    ```
  - **Response**:
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "preferences": ["array of strings"],
      "communicationChannel": "string"
    }
    ```

### 4. Delete User
- **DELETE /users/:id**: Deletes a user by ID.
  - **Response**:
    ```json
    {
      "message": "User deleted successfully"
    }
    ```

### 5. Dapr Pub/Sub
- **POST /createUserTopic**: Handles user creation events from the `user-creation` topic.

## Directory Structure
```
src/
├── controllers/      # Handles incoming HTTP requests
├── services/         # Business logic for user operations
├── utils/            # Logger and database utilities
├── middlewares/      # Middleware for validating Object IDs
└── app.js            # Main entry point for the service
```

## Requirements
- **Node.js** (v14 or higher)
- **NPM** (v6 or higher)
- **MongoDB** for database storage
- **Dapr Runtime** for Pub/Sub support

## Setup and Installation
1. **Clone the repository**:
   ```
   git clone https://github.com/rachely-sharshevsky/News-ProJ.git
   cd User-accessor-service
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/user_accessor
   DAPR_HTTP_PORT=3500
   ```

4. **Start the service**:
   ```bash
   dapr run --app-id user-accessor-service --app-port 3001 npm start
   ```

5. The service will run on `http://localhost:3001`.

## Notes
- **Logging**:
  - Logs are managed using Winston for tracking requests and debugging.
- **Pub/Sub**:
  - Dapr is used for managing Pub/Sub events with the `user-creation` topic.

## Contact
For any questions or issues, please contact the development team.