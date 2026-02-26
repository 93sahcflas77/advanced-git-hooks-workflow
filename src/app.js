const confg = require('./config/env');
const express = require('express');
const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

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

module.exports = app;
