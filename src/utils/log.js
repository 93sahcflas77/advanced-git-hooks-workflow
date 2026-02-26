const fs = require('fs');
const path = require('path');

// const logDir = path.join(__dirname, "..", "..", "logs");
// const logDir = path.resolve(__dirname, "..", "..", "logs");
const logDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const accessLogStream = fs.createWriteStream(path.join(logDir, 'accexx.log'), { flags: 'a' });

// error log stream
const errorLogStream = fs.createWriteStream(path.join(logDir, 'error.log'), { flags: 'a' });

module.exports = { accessLogStream, errorLogStream };
