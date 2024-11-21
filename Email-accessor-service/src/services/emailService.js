const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const sendEmail = async ({ emailAddress, emailBody, params }) => {
    try {
        console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
        logger.info(`Service: Preparing to send email to ${emailAddress}`);
           
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailAddress,
            subject: params?.subject || 'No Subject',
            text: emailBody,
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Service: Email sent successfully to ${emailAddress}`);
    } catch (error) {
        logger.error(`Service: Failed to send email - ${error.message}`);
        throw new Error(`Service: Failed to send email - ${error.message}`);
    }
};

module.exports = { sendEmail };
