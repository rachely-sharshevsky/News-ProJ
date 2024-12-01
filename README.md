# Microservices Project with Dapr

## Description

This project is a microservices-based architecture designed to manage users, send notifications, summarize news, and more. The system leverages **Dapr** for inter-service communication, Pub/Sub messaging, and other advanced capabilities. It is containerized using **Docker Compose** for easy orchestration.

## Services

### Core Services

1. **User Management Service**:

   - Manages user-related operations such as creation, retrieval, update, and deletion.
   - Exposes REST APIs for user management.

2. **User Accessor Service**:

   - Handles database operations for user data.
   - Supports Pub/Sub messaging via Dapr.

3. **AI Engine Service**:

   - Summarizes news articles using AI models.
   - Interacts with external AI APIs for processing.

4. **News Accessor Service**:

   - Fetches news articles from external APIs based on categories.

5. **News Manager Service**:

   - Coordinates news requests and interacts with the News Accessor Service.

6. **Message Manager Service**:

   - Manages communication through various channels like email and WhatsApp.

7. **Email Accessor Service**:

   - Sends email notifications using Nodemailer.

8. **WhatsApp Accessor Service**:
   - Sends WhatsApp messages using an external API.

## Docker Compose

The project includes a **Docker Compose** configuration for seamless deployment. Key components:

- **Redis**: For caching and message queuing.
- **Dapr Sidecars**: Enabling service-to-service communication, Pub/Sub, and state management.
- **Placement Service**: Required for Dapr actors.

## Setup and Installation

### Prerequisites

- **Node.js**: v14 or higher
- **NPM**: v6 or higher
- **Docker**: v20 or higher
- **Dapr CLI**: Installed and configured

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/rachely-sharshevsky/News-ProJ.git

   ```

2. Set up environment variables:

   - Create a `.env` file in each service directory.
   - Example for the Email Accessor Service:
     `env
     PORT=3013
     EMAIL_USER=joyfuljourneyscapturethejoy@gmail.com
     EMAIL_PASS=xotp eazl lhny gbsr
     `

3. Start the system using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. Verify services are running:
   - Access each service at `http://localhost:<service_port>`.

## Networks and Dapr

- The project uses a custom Docker network: `network-dapr`.
- **Dapr** enables the following capabilities:
  - **Service Invocation**: Calls between microservices.
  - **Pub/Sub Messaging**: Communication through topics like `user-creation`.
  - **State Management**: Using Redis as the state store.

## Environment Variables

Each service requires specific environment variables. Key variables:

- **Email Accessor Service**:
  ```env
  PORT=3013
  EMAIL_USER=joyfuljourneyscapturethejoy@gmail.com
  EMAIL_PASS=xotp eazl lhny gbsr
  ```
- **WhatsApp Accessor Service**:
  ```env
  PORT=3014
  WHATSAPP_API_URL=https://api.whatsapp.com/send
  WHATSAPP_API_KEY=your_api_key_here
  ```

## Notes

- **Logs**:

  - Managed using Winston for all services.
  - Debug-level logs provide detailed information.

- **Testing**:
  - Use Postman or Swagger to test individual endpoints.
  - Integration tests can be added for end-to-end validation.

## Contact
** Architecture Diagram
 
 **Below is a high-level diagram of the system architecture:

For any questions or issues, contact the development team.
+--------------------------------------+
|              Core Manager            |
|  (Orchestrates communication         |
|   between services)                  |
+--------------------------------------+
                 |
      +----------+-----------+
      |                      |
+------------+         +--------------+
| User       |         | News Manager |
| Management |         | Service      |
| Service    |         |              |
+------------+         +--------------+
      |                      |
      |         +------------+-----------+
      |         |                        |
+------------+  +--------------+   +-------------+
| User       |  | News Accessor|   | AI Engine   |
| Accessor   |  | Service      |   | Service     |
| Service    |  +--------------+   +-------------+
+------------+         |
      |                |
+-------------+   +-------------+
| Message     |   | Email       |
| Manager     |   | Accessor    |
| Service     |   | Service     |
+-------------+   +-------------+
      |
+-----------------+
| WhatsApp        |
| Accessor        |
| Service         |
+-----------------+
