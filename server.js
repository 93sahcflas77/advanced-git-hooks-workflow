const config = require('./src/config/env');
const logger = require('./src/utils/logger/logger');
const app = require('./src/app');
const { connectDB } = require('./src/config/db');

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
