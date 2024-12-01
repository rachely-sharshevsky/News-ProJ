# News Accessor Service

## Description
The News Accessor Service provides an API to fetch news based on a specified category using the NewsData.io API.

## Endpoints
### 1. Fetch News
- **POST /news**: Fetches news based on the specified category.
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
├── controllers/      # Handles the incoming HTTP requests
├── services/         # Business logic for fetching news
├── utils/            # Utility functions and helpers, including logging
└── app.js            # Main entry point of the service
```

## Requirements
- **Node.js** (v14 or higher)
- **NPM** (v6 or higher)
- Access to the NewsData.io API with an API key configured.

## Setup and Installation
1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd news-accessor-service
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=3010
   API_KEY=your_newdata_io_api_key
   ```

4. **Start the service**:
   ```bash
   npm start
   ```

5. The service will run on `http://localhost:3010`.

## Notes
- Ensure your API key is valid to avoid errors during news fetching.
- Logs are managed using Winston and are helpful for debugging and tracking service operations.

## Contact
For any questions or issues, please contact the development team.