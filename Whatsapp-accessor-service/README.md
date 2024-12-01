# WhatsApp Accessor Service

## Description
The WhatsApp Accessor Service provides an API to send WhatsApp messages using an external WhatsApp API.

## Endpoints
### 1. Send WhatsApp Message
- **POST /send-whatsapp**: Sends a WhatsApp message to a specific phone number.
  - **Request Body**:
    ```json
    {
      "phoneNumber": "string",
      "message": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "WhatsApp message sent successfully"
    }
    ```
  - **Error Responses**:
    - `400 Bad Request`: Missing required fields: `phoneNumber` or `message`.
    - `500 Internal Server Error`: Failed to send WhatsApp message.

## Directory Structure
```
src/
├── controllers/      # Handles HTTP requests
├── services/         # Business logic for sending WhatsApp messages
├── utils/            # Logger utilities
└── app.js            # Main entry point for the service
```

## Requirements
- **Node.js** (v14 or higher)
- **NPM** (v6 or higher)
- Access to an external WhatsApp API with a valid API key.

## Setup and Installation
1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd whatsapp-accessor-service
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3014
   WHATSAPP_API_URL=<Your_WhatsApp_API_URL>
   WHATSAPP_API_KEY=<Your_WhatsApp_API_Key>
   ```

4. **Start the service**:
   ```bash
   npm start
   ```

5. The service will run on `http://localhost:3014`.

## Notes
- **Logging**:
  - Winston is used for managing logs, including request details and errors.
- **Error Handling**:
  - Proper validation and error handling are implemented for both service and controller layers.

## Contact
For any questions or issues, please contact the development team.