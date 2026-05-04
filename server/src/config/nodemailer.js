const config = require('../config/env');
const nodemailer = require('nodemailer');
const logger = require('../utils/logger/logger');

const transporter = nodemailer.createTransport({
  host: config.SMTP_SERVER.smtpHost,
  port: config.SMTP_SERVER.smtpPort,
  secure: false,
  auth: {
    user: config.SMTP_SERVER.smtpUser,
    pass: config.SMTP_SERVER.smtpPass,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
  tls: {
    rejectUnauthorized: false,
  },
  logger: true,
  debug: false,
});

const checkSMTP = async () => {
  try {
    await transporter.verify();
    logger.info('SMTP server connected successfully');
  } catch (err) {
    logger.error('SMTP connection failed', err);
    process.exit(1);
  }
};

module.exports = { transporter, checkSMTP };
