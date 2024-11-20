const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRouter');
const logger = require('./utils/logger');

// טעינת משתני סביבה
dotenv.config();

// יצירת אפליקציה
const app = express();
app.use(express.json());

// רישום רוטים
app.use('/users', userRoutes);

// התחלת השרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`User Management Service running on port ${PORT}`);
});
