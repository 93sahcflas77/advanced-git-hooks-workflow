const config = require('../config/env');
const { transporter } = require('../config/nodemailer');
const logger = require('./logger/logger');

module.exports = async ({ to, subject, text, html, attachments = [] }) => {
  try {
    if (!to || !subject) {
      logger.error('Missing required fields: to, subject');
    }

    const mailOption = {
      from: `"Tony Stark" <${config.SMTP_SERVER.smtpUser}>`,
      to,
      subject,
      text,
      html,
      attachments,
    };

    const info = await transporter.sendMail(mailOption);

    if (info.rejected.length > 0) {
      logger.warn(`Some recipients were rejected: ${info.rejected}`);
    }

    logger.info(`Email sent: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    logger.error('Failed to send email', error);
    process.exit(1);

    return {
      success: false,
      error: error.message,
    };
  }
};
