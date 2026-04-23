const mongoose = require('mongoose');
const logger = require('../utils/logger/logger');
const config = require('./env');

const connectDB = async () => {
  try {
    if (!config.mongoUri) {
      throw new Error('❌ MONGO_URI is missing in environment variables.');
    }

    logger.info('\n🟡 Connecting to MongoDB...');
    logger.info(`🔗 URI: ${config.mongoUri}`);

    const conn = await mongoose.connect(config.mongoUri, {
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000,
    });

    logger.info('🟢 MongoDB Connected Successfully!');
    logger.info(`📌 Host: ${conn.connection.host}`);
    logger.info(`📁 Database: ${conn.connection.name}\n`);

    // graceful shutdown
    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB Disconnected');
    });
  } catch (error) {
    logger.error('❌ MongoDB Connection Error:');
    logger.error('Error:', error.message);
    logger.error('Retrying in 5 seconds...\n');

    // setTimeout(connectDB, 5000);
  }
};

module.exports = { connectDB };
