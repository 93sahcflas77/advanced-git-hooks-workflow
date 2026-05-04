const env = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${env}`,
});

module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  cookieSecret: process.env.COOKIE_SECRET,
  originsite: process.env.CLIENT_URL,
  baseUrl: process.env.BASE_URL,
  mongoUri: process.env.MONGO_URI,
  MINIO: {
    endpoint: process.env.MINIO_ENDPOINT,
    minio_port: process.env.MINIO_PORT,
    useSsl: process.env.MINIO_USESSL === 'true',
    accessKey: process.env.MINIO_ACCESSKEY,
    secretKey: process.env.MINIO_SECRETKEY,
  },
  JWT: {
    accessSecret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
    accessExp: process.env.ACCESS_TOKEN_EXPIRES_IN || process.env.EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || null,
    refreshExp: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  },
  SMTP_SERVER: {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
  },
};
