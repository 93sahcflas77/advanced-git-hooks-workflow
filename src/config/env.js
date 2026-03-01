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
};

module.exports = confg;
