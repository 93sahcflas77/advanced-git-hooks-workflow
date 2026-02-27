const config = require('./config/env');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const compression = require('compression');
const corsMiddleware = require('./config/cors');
const requestIDMiddleware = require('./middleware/requestID');
const { accessLogStream, errorLogStream } = require('./utils/log');
const { appLimiter, authLimiter } = require('./config/rateLimit');
const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(requestIDMiddleware);

app.use(
  helmet({
    contentSecurityPolicy: false, //enable later carefully
    crossOriginEmbedderPolicy: false,
  }),
);

app.use(corsMiddleware);

app.use(
  '/static',
  express.static(path.join(process.cwd(), 'public'), {
    maxAge: '7d',
    etag: true,
    lastModified: true,
    setHeaders: (res, path_) => {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    },
    index: false,
  }),
);
app.use(
  compression({
    level: 6,
    threshold: 1024,
  }),
);

morgan.token('request-id', (req) => {
  return req.requestID;
});

if (config.nodeEnv === 'production') {
  app.use(
    morgan(':request-id :method :url :status :res[content-length] - :response-time ms', {
      stream: accessLogStream,
    }),
  );
  app.use(
    morgan(':request-id :method :url :status :res[content-length] - :response-time ms', {
      stream: errorLogStream,
      skip: (req, res) => res.statusCode < 400,
    }),
  );
} else {
  app.use(morgan(':request-id :method :url :status :res[content-length] - :response-time ms'));
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
