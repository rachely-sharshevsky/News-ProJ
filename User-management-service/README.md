# User Management Service

## Description
The User Management Service provides an API for managing users, including creating, retrieving, updating, and deleting user information. It leverages Dapr for inter-service communication and Pub/Sub messaging.

## Endpoints
### 1. Register User
- **POST /users**: Registers a new user.
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
- **GET /users/:id**: Retrieves a user by ID.
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
- **PUT /users/:id/preferences**: Updates user preferences.
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

## Directory Structure
```
src/
├── controllers/      # Handles HTTP requests
├── services/         # Business logic for user operations
├── routes/           # Defines API routes
├── utils/            # Logger and validation helpers
└── app.js            # Main entry point for the service
```

## Requirements
- **Node.js** (v14 or higher)
- **NPM** (v6 or higher)
- **Dapr Runtime** for Pub/Sub and inter-service communication

## Setup and Installation
1. **Clone the repository**:
   ```
   git clone https://github.com/rachely-sharshevsky/News-ProJ.git
   cd User-management-service
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3000
   DAPR_HTTP_PORT=3502
   ```

4. **Start the service**:
   ```bash
   dapr run --app-id user-management-service --app-port 3000 npm start
   ```

5. The service will run on `http://localhost:3000`.

## Notes
- **Logging**:
  - Logs are managed using Winston.
  - Logs include request details, user data, and errors.
- **Dapr Integration**:
  - Pub/Sub topic: `user-creation` for user registration.
  - Invokes the User Accessor Service for database operations.

## Contact
For any questions or issues, please contact the development team.