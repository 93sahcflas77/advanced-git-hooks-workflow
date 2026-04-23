const Minio = require('minio');
const config = require('./env');
const logger = require('../utils/logger/logger');

if (!config.endpoint || !config.accessKey || !config.secretKey) {
  logger.error('MinIO config missing!');
  process.exit(1);
}
const client = new Minio.Client({
  endPoint: config.endpoint,
  port: config.minio_port,
  useSSL: config.useSsl,
  accessKey: config.accessKey,
  secretKey: config.secretKey,
});

const checkconnection = async () => {
  try {
    await client.listBuckets();
    logger.info('MinIO connected successfully');
  } catch (err) {
    logger.error('MinIO connection failed', err);
    process.exit(1);
  }
};

module.exports = { client, checkconnection };
