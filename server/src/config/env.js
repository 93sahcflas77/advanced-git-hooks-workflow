const env = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${env}`,
});

const confg = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  cookieSecret: process.env.COOKIE_SECRET,
  originsite: process.env.CLIENT_URL,
  baseUrl: process.env.BASE_URL,
  mongoUri: process.env.MONGO_URI,
  endpoint: process.env.MINIO_ENDPOINT,
  minio_port: process.env.MINIO_PORT,
  useSsl: process.env.MINIO_USESSL === 'true',
  accessKey: process.env.MINIO_ACCESSKEY,
  secretKey: process.env.MINIO_SECRETKEY,
};

module.exports = confg;
