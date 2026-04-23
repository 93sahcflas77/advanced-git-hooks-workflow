const config = require('../config/env');
const logger = require('../utils/logger/logger');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];
  let code = err.code || 'GEN_001';
  const data = err.data || null;

  if (err.name === 'CastError') {
    message = `Invalid ${err.path}: ${err.value}`;
    statusCode = 400;
    code = 'DB_001';
    errors = [{ message }];
  }

  if (err.code === 11000) {
    message = `Duplicate field value entered for ${Object.keys(err.keyValue)}. Please use another value!`;
    statusCode = 400;
    code = 'DB_002';
    errors = [{ message }];
  }

  if (err.name === 'ValidationError') {
    message = 'Validation failed';
    statusCode = 400;
    errors = Object.values(err.errors).map((el) => ({ message: el.message }));
    code = 'DB_003';
  }

  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid token';
    statusCode = 401;
    code = 'AUTH_001';
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Token expired';
    statusCode = 401;
    code = 'AUTH_002';
  }

  //  add a custom err.name
  logger.error({
    message,
    statusCode,
    code,
    errors,
    data,
    url: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    data,
    code,
    message,
    errors,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
