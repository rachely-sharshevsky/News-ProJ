const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const whatsappController = require('./controllers/whatsappController');

dotenv.config();

const app = express();
app.use(express.json());

// WhatsApp Route
app.post('/send-whatsapp', whatsappController.sendWhatsAppMessage);

const PORT = process.env.PORT || 3014;
app.listen(PORT, () => {
    logger.info(`WhatsApp Accessor Service is running on port ${PORT}`);
});
