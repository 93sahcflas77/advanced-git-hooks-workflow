const logger = require('./logger/logger');

const accessLogStream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

// error log stream
const errorLogStream = {
  write: (message) => {
    logger.error(message.trim());
  },
};

module.exports = { accessLogStream, errorLogStream };
