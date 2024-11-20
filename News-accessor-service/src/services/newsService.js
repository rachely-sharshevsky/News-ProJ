const { fetchFromApi } = require('../utils/fetchUnits');

const API_URL = 'https://newsdata.io/api/1/latest';
const API_KEY = 'pub_59249dde2506a32587cd69627ca5807e15e1d';

class NewsService {
    static async fetchNews(category) {
        try {
            const url = `${API_URL}?apikey=${API_KEY}&category=${category}&language=en`;
            const news = await fetchFromApi(url);
            return news;
        } catch (error) {
            throw new Error(`Failed to fetch news: ${error.message}`);
        }
    }
}

module.exports = NewsService;
