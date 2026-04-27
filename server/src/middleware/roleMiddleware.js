const logger = require('../utils/logger/logger');
const ApiError = require('../utils/ApiError');
const ERROR_CODES = require('../constants/errorcodes');

module.exports = (allowedRules = []) => {
  if (!Array.isArray(allowedRules)) {
    allowedRules = [allowedRules];
  }
  return (req, res, next) => {
    try {
      if (!req.user) {
        logger.warn('No user information found in request. Access denied.');
        return next(
          new ApiError({
            statusCode: ERROR_CODES.AUTH_REQUIRED.statusCode,
            message: ERROR_CODES.AUTH_REQUIRED.message,
            code: ERROR_CODES.AUTH_REQUIRED.code,
          }),
        );
      }

      const userRole = req.user.role;

      if (!allowedRules.includes(userRole)) {
        logger.warn({
          message: 'Forbidden access - role not allowed',
          userRole,
          allowedRules,
          userId: req.user.id,
        });
        return next(
          new ApiError({
            statusCode: ERROR_CODES.FORBIDDEN.statusCode,
            message: 'Forbidden: Role ' + userRole + ' is not allowed',
            code: ERROR_CODES.FORBIDDEN.code,
          }),
        );
      }

      return next();
    } catch (error) {
      logger.error({
        message: 'Role Middleware Error',
        error: error.message,
      });
      return next(
        new ApiError({
          statusCode: ERROR_CODES.INTERNAL_AUTH_ERROR.statusCode,
          message: ERROR_CODES.INTERNAL_AUTH_ERROR.message,
          code: ERROR_CODES.INTERNAL_AUTH_ERROR.code,
        }),
      );
    }
  };
};
