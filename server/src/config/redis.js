const { createClient } = require('redis');
const logger = require('../utils/logger/logger');

const client = createClient({
  url: 'redis://localhost:6379',
});

client.on('error', (err) => {
  logger.error(`Redis error: ${err}`);
});

client.on('connect', () => {
  logger.info('Redis Socket Connected');
});

client.on('ready', () => {
  logger.info('Redis Connected Successfully');
  // logger.info(client.options.url)
});

module.exports = client;
