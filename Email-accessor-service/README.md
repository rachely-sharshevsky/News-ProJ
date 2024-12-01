# Email Accessor Service

## Description
The Email Accessor Service provides an API to send email notifications using Nodemailer and Gmail.

## Endpoints
### 1. Send Email
- **POST /send-email**: Sends an email to the specified address.
  - **Request Body**:
    ```json
    {
      "emailAddress": "string",
      "emailBody": "string",
      "params": {
        "subject": "string (optional)"
      }
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Email sent successfully"
    }
    ```

## Directory Structure
```
src/
├── controllers/      # Contains the emailController.js
├── services/         # Contains the emailService.js
├── utils/            # Contains logger.js for logging
└── app.js            # Main entry point
```

## Requirements
- **Node.js** (v14 or higher)
- **NPM** (v6 or higher)
- **Nodemailer** for email communication.

## Setup and Installation
1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd email-accessor-service
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3013
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

4. **Start the service**:
   ```bash
   npm start
   ```

5. The service will run on `http://localhost:3013`.

## Notes
- The service uses Gmail as the email provider. Ensure the credentials in the `.env` file are correct.
- If using Gmail, you may need to enable "Less secure app access" or use an App Password for authentication.

## Logging
- Logging is handled using Winston.
- Logs are output to both the console and a `logs/combined.log` file.

## Contact
For any questions or issues, please contact the development team.