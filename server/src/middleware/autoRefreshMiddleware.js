const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwtUtils');
const { refreshTokenCookieOptions } = require('../utils/cookieOptions');
const User = require('../models/user.model');
const logger = require('../utils/logger/logger');

module.exports = autoRefresh = async (req, res, next) => {
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

    const user = await User.findById(decoded.id).select('_id username role refreshToken');

    if (!user) {
      return next();
    }

    if (user.refreshToken !== rt) {
      logger.warn({
        message: 'Refresh token mismatch. Possible token reuse detected.',
        userId: user._id,
      });
      await User.findByIdAndUpdate(user._id, { refreshToken: null });

      return next();
    }

    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    const newAccess = generateToken(payload);
    const newRefresh = generateRefreshToken({ id: user._id });

    await User.findByIdAndUpdate(user.id, { refreshToken: newRefresh });

    res.cookie('jid', newRefresh, refreshTokenCookieOptions);
    res.setHeader('x-access-token', newAccess);

    req.user = payload;

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
