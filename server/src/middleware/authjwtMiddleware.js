const { verifyToken } = require('../utils/jwtUtils');
const logger = require('../utils/logger/logger');
const ApiError = require('../utils/ApiError');
const ERROR_CODES = require('../constants/errorcodes');

module.exports = requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      logger.warn('No Authorization header founs. Access denied.');
      return next(
        new ApiError({
          statusCode: ERROR_CODES.NO_AUTH_HEADER.statusCode,
          message: ERROR_CODES.NO_AUTH_HEADER.message,
          code: ERROR_CODES.NO_AUTH_HEADER.code,
        }),
      );
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      logger.warn({
        message: 'Invaild Authorization format',
        header: authHeader,
      });
      return next(
        new ApiError({
          statusCode: ERROR_CODES.INVALID_TOKEN.statusCode,
          message: ERROR_CODES.INVALID_TOKEN.message,
          code: ERROR_CODES.INVALID_TOKEN.code,
        }),
      );
    }

    const token = parts[1];

    let decoded;

    try {
      decoded = verifyToken(token);
    } catch (error) {
      logger.warn({
        message: 'Token verification failed. Access denied.',
        error: error.message,
      });
      return next(
        new ApiError({
          statusCode: ERROR_CODES.INVALID_TOKEN.statusCode,
          message: ERROR_CODES.INVALID_TOKEN.message,
          code: ERROR_CODES.INVALID_TOKEN.code,
        }),
      );
    }

    if (!decoded) {
      return next(
        new ApiError({
          statusCode: ERROR_CODES.INVALID_TOKEN.statusCode,
          message: ERROR_CODES.INVALID_TOKEN.message,
          code: ERROR_CODES.INVALID_TOKEN.code,
        }),
      );
    }

    req.user = decoded;

    return next();
  } catch (error) {
    logger.error({
      message: 'Authentication error',
      error: error.message,
      stack: error.stack,
    });
    return next(
      new ApiError({
        statusCode: ERROR_CODES.INTERNAL_AUTH_ERROR.statusCode,
        message: ERROR_CODES.INTERNAL_AUTH_ERROR.message,
        code: ERROR_CODES.INTERNAL_AUTH_ERROR.code,
        stack: error.stack,
      }),
    );
  }
};
