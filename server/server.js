const config = require('./src/config/env');
const logger = require('./src/utils/logger/logger');
const app = require('./src/app');
const { connectDB } = require('./src/config/db');
const { checkconnection } = require('./src/config/minio');
const { checkSMTP } = require('./src/config/nodemailer');
const client = require('./src/config/redis');

const startServer = async () => {
  try {
    await connectDB();
    await checkconnection();
    await checkSMTP();
    await client.connect();

    app.listen(config.port, () => {
      logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// CONNECT FUNCTION
// async function connectRedis() {
//     try {
//         await client.connect();
//         console.log("Redis Connected Successfully");
//     } catch (err) {
//         console.log(err);
//     }
// }

// connectRedis();
