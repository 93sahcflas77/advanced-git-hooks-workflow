const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwtUtils');
const { refreshTokenCookieOptions } = require('../utils/cookieOptions');
const RefreshToken = require('../models/refreshToken');
const User = require('../models/user.model');
const logger = require('../utils/logger/logger');

module.exports = async (req, res, next) => {
  try {
    if (req.user) {
      return next();
    }

    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const rt = req.cookies?.jid;
    if (!rt) {
      return next();
    }

    let decoded;

    try {
      decoded = verifyRefreshToken(rt);
    } catch (error) {
      logger.warn({
        message: 'Invalid refresh token',
        error: error.message,
      });
      return next();
    }

    if (!decoded) {
      return next();
    }

    const storedToken = await RefreshToken.findOne({ token: rt, revokedAt: null });

    if (!storedToken) {
      logger.warn({ message: 'Refresh token not found or revoked' });
      return next();
    }

    if (storedToken.expires < new Date()) {
      logger.warn({ message: 'Refresh token expired' });
      return next();
    }

    const user = await User.findById(storedToken.userId).select('_id email role');

    if (!user) {
      return next();
    }

    const payload = {
      id: user._id,
      username: user.email,
      role: user.role,
    };

    const newAccess = generateToken(payload);
    const newRefresh = generateRefreshToken({ id: user._id });

    storedToken.revokedAt = new Date();
    await storedToken.save();

    const refresh = await RefreshToken.create({
      userId: user._id,
      token: newRefresh,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ipAddress: req.ip,
      deviceInfo: req.headers['user-agent'],
    });

    res.cookie('jid', newRefresh, refreshTokenCookieOptions);
    res.setHeader('x-access-token', newAccess);

    req.user = payload;
    req.refreshToken = newRefresh;

    return next();
  } catch (err) {
    logger.error({
      message: 'Auto refresh error',
      error: err.message,
      stack: err.stack,
    });
    return next();
  }
};
