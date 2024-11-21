import { GoogleGenerativeAI } from "@google/generative-ai";
import logger from '../utils/logger.js';

class NewsSummarizer {
    static async summarize(newsArray) {
        const apiKey = 'AIzaSyBbQqiH9nS0l0kinVtEQ9UF4t6LSzxR4rY';
        if (!apiKey) {
            logger.error("API key is missing. Ensure it's set in the environment variables.");
            return { success: false, error: "API key is not configured." };
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            // מיזוג החדשות בפורמט מותאם
            const formattedNews = newsArray.map(news => 
                `Article ID: ${news.article_id}\nTitle: ${news.title}\nDescription: ${news.description}\nLink: ${news.link}\nSource: ${news.source_name}\nPublished Date: ${news.pubDate}\n\n`
            ).join("");

            logger.info("Formatted news content prepared for summarization.");

            // שליחת הטקסט המאוחד ל-Gemini
            const result = await model.generateContent([
                {
                    text: `Summarize the following news articles into one concise summary paragraph for each article:\n\n${formattedNews}`,
                },
            ]);

            if (!result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error("Unexpected response structure from Gemini API.");
            }

            const summarizedText = result.response.candidates[0].content.parts[0].text;

            logger.info("Successfully summarized news articles.");
            return { success: true, summary: summarizedText };
        } catch (error) {
            logger.error("Error during summarization:", error);
            return { success: false, error: error.message };
        }
    }
}

export default NewsSummarizer;
