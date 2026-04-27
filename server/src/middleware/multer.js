const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = upload = multer({
  // storage: multer.diskStorage({
  //   destination (req, file, cb) {
  //     const logDir = path.join(process.cwd(), 'uploads');
  //     if (!fs.existsSync(logDir)) {
  //       fs.mkdirSync(logDir);
  //     }
  //     cb(null, logDir);
  //   },
  //   filename (req, file, cb) {
  //     const extension = path.extname(file.originalname);
  //     cb(null, Date.now() + '-' + file.originalname + extension);
  //   },
  // }),
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 200 * 1024 * 1024, // 5MB
  },
  fileFilter(req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/ogg', 'application/zip'];
    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error('Only JPEG, PNG, GIF, and OGG files are allowed'), false);
  },
});
