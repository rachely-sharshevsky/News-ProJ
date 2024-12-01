# Core Manager Service

## Description
The Core Manager Service is responsible for managing user requests and orchestrating calls to other microservices. 
It fetches user details, retrieves news, and sends notifications via multiple communication channels.

## Endpoints
### 1. User Management
- **POST /core/register**: Registers a new user.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "preferences": ["array of strings"],
      "communicationChannel": "string (e.g., 'email', 'whatsapp')"
    }
    ```
  - **Response**: JSON object with user details or an error message.

- **PUT /core/update**: Updates user information.
  - **Request Body**:
    ```json
    {
      "userId": "string",
      "preferences": ["array of strings"]
    }
    ```
  - **Response**: JSON object with updated user information or an error message.

### 2. News Management
- **GET /core/news/latest**: Fetches the latest news asynchronously.
  - **Query Parameters**:
    - `userId`: ID of the user.
  - **Response**: JSON object with the latest news.

- **GET /core/news/summarized**: Fetches summarized news asynchronously.
  - **Query Parameters**:
    - `userId`: ID of the user.
  - **Response**: JSON object with summarized news.

## Directory Structure
```
src/
├── controllers/      # Contains route handler logic
├── router/           # Defines all routes and their handlers
├── services/         # Contains business logic and service calls
├── utils/            # Utility functions such as logger
└── app.js            # Main entry point of the service
```

## Requirements
- **Node.js** (v14 or higher)
- **NPM** (v6 or higher)
- **Dapr Runtime** (installed and configured)

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd core-manager-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3015
   DAPR_HTTP_PORT_USER_MANAGER=3503
   DAPR_HTTP_PORT_NEWS_MANAGER=3511
   DAPR_HTTP_PORT_MESSAGE_MANAGER=3512
   DAPR_HTTP_PORT_EMAIL_ACCESSOR=3513
   DAPR_HTTP_PORT_WHATSAPP_ACCESSOR=3514
   ```

4. Start the service:
   ```bash
   npm start
   ```

5. The service will run on `http://localhost:3015`.

## Notes
- This service communicates with other microservices using Dapr's `invoke` API.
- Logging is handled using Winston, with logs displayed in the console.

## Contact
For any questions or issues, please contact the development team.