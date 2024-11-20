const { createLogger, format, transports } = require('winston');

// יצירת לוגים
const logger = createLogger({
    level: 'info', // רמת ברירת מחדל של הלוגים (info)
    format: format.combine(
        format.timestamp(), // הוספת תאריך ושעה ללוגים
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        // הדפסת לוגים לקונסול
        new transports.Console(),
        
        // שמירת לוגים לקובץ (לא חובה, אך מומלץ בסביבה פרודקשן)
        new transports.File({ filename: 'app.log' })
    ],
});

module.exports = logger;
