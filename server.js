const config = require('./src/config/env');
const logger = require('./src/utils/logger/logger');
const app = require('./src/app');

app.listen(config.port, () => {
  logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});
