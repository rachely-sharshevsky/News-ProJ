# AI Engine Service

## Description
The AI Engine Service is responsible for summarizing news articles using Google's Generative AI model. 
It accepts a list of news articles and returns a concise summary for each article.

## Endpoints
### 1. News Summarization
- **POST /api/news-ai/summarize**: Summarizes a list of news articles.
  - **Request Body**:
    ```json
    {
      "results": [
        {
          "article_id": "string",
          "title": "string",
          "description": "string",
          "link": "string",
          "source_name": "string",
          "pubDate": "string"
        }
      ]
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "summary": "string"
    }
    ```

## Directory Structure
```
src/
├── controllers/      # Contains logic for handling requests
├── routes/           # Defines API routes
├── services/         # Business logic for summarizing news
├── utils/            # Utility functions like logging
└── app.js            # Main entry point for the service
```

## Requirements
- **Node.js** (v14 or higher)
- **NPM** (v6 or higher)
- **Google Generative AI API Key**

## Setup and Installation
1.git clone https://github.com/rachely-sharshevsky/News-ProJ.git


   cd Ai-engine-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3007
   GOOGLE_AI_API_KEY=<Your_Google_Generative_AI_API_Key>
   ```

4. Start the service:
   ```bash
   npm start
   ```

5. The service will run on `http://localhost:3007`.

## Notes
- This service uses Winston for logging.
- Google's Generative AI model (`gemini-1.5-flash`) is used for summarization.
- Ensure your API key is valid and configured in the `.env` file.

## Contact
For any questions or issues, please contact the development team.