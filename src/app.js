const confg = require('./config/env');
const express = require('express');
const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

module.exports = app;
