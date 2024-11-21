async function fetchFromApi(url) {
    try {
        const fetch = (await import('node-fetch')).default; // שימוש בייבוא דינמי
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}

module.exports = { fetchFromApi };
