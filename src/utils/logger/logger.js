const winston = require('winston');
const path = require('path');
const fs = require('fs');

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const customLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

const customColors = {
  fatal: 'red',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

winston.addColors(customColors);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, service }) => {
    return `${timestamp} | ${level.padEnd(5)} | ${service} | ${message}`;
  }),
);

const logger = winston.createLogger({
  levels: customLevels,
  level: 'debug',

  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),

  transports: [
    new winston.transports.Console({
      level: 'info',
      format: consoleFormat,
    }),
    new winston.transports.File({
      level: 'error',
      filename: `${logDir}/winstonError.log`,
    }),
    new winston.transports.File({
      filename: `${logDir}/combined.log`,
    }),
  ],
  defaultMeta: {
    service: 'api-service',
  },
  exceptionHandlers: [new winston.transports.File({ filename: `${logDir}/exceptions.log` })],
  rejectionHandlers: [new winston.transports.File({ filename: `${logDir}/rejections.log` })],
  exitOnError: false,
});

module.exports = logger;
