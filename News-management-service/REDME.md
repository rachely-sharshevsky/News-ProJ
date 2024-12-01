# News Manager Service

## Description
The News Manager Service coordinates requests for news articles. It fetches news based on categories from the News Accessor Service using Dapr for service-to-service communication.

## Endpoints
### 1. Fetch News
- **POST /news**: Fetches news articles for a specific category by invoking the News Accessor Service.
  - **Request Body**:
    ```json
    {
      "category": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "status": "ok",
      "articles": [
        {
          "title": "string",
          "description": "string",
          "url": "string",
          "source": "string",
          "publishedAt": "string"
        }
      ]
    }
    ```
  - **Error Responses**:
    - `400 Bad Request`: Missing category field.
    - `500 Internal Server Error`: Failed to fetch news.

## Directory Structure
```
src/
├── controllers/      # Handles HTTP request logic
├── routes/           # Defines the routes
├── services/         # Contains business logic for fetching news
├── utils/            # Logging and utility helpers
└── app.js            # Main entry point for the service
```

## Requirements
- **Node.js** (v14 or higher)
- **NPM** (v6 or higher)
- **Dapr Runtime** installed and configured.

## Setup and Installation
1. **Clone the repository**:
   
   ```
   git clone https://github.com/rachely-sharshevsky/News-ProJ.git
   cd News-manager-service
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3011
   DAPR_HTTP_PORT=3510
   ```

4. **Start the service**:
   ```bash
   dapr run --app-id news-manager-service --app-port 3011 npm start
   ```

5. The service will run on `http://localhost:3011`.

## Notes
- This service uses Dapr to invoke the News Accessor Service at `/news`.
- Logs are managed using Winston for better debugging and monitoring.

## Contact
For any questions or issues, please contact the development team.