const config = require('./config/env');
const express = require('express');
const cookieParser = require('cookie-parser');
const corsMiddleware = require('./config/cors');
const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(corsMiddleware);

app.use(
  express.json({
    limit: '10mb',
  }),
);
app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb',
  }),
);

if (!config.cookieSecret) {
  throw new Error('COOKIE_SECRET is required');
}
app.use(cookieParser(config.cookieSecret));

module.exports = app;
