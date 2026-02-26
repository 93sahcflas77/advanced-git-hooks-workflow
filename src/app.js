const config = require('./config/env');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const compression = require('compression');
const corsMiddleware = require('./config/cors');
const { accessLogStream, errorLogStream } = require('./utils/log');
const { appLimiter, authLimiter } = require('./config/rateLimit');
const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: false, //enable later carefully
    crossOriginEmbedderPolicy: false,
  }),
);

app.use(corsMiddleware);

app.use(
  compression({
    level: 6,
    threshold: 1024,
  }),
);

if (config.nodeEnv === 'production') {
  app.use(morgan('combined', { stream: accessLogStream }));
  app.use(
    morgan('combined', {
      stream: errorLogStream,
      skip: (req, res) => res.statusCode < 400,
    }),
  );
} else {
  app.use(morgan('dev'));
}

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
