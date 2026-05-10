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
  logger.info(client.options.url);
});

const connect = async () => {
  try {
    await client.connect();
    logger.info('Redis Connected Successfully');
  } catch (error) {
    logger.error(`Redis Connected Failed ${error}`);
  }
};

connect();

module.exports = client;
