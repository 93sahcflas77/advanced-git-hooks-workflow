const { matchedData, validationResult } = require('express-validator');
const logger = require('../utils/logger/logger');
const ApiError = require('../utils/ApiError');
const ERROR_CODES = require('../constants/errorcodes');

module.exports = (schemas = [], options = {}) => {
  return [
    ...(Array.isArray(schemas) ? schemas : [schemas]),

    async (req, res, next) => {
      try {
        const result = validationResult(req);
        console.log('Validation Result:', result); // Debug log

        if (!result.isEmpty()) {
          const formattedErrors = result
            .formatWith((err) => ({
              field: err.path,
              message: err.msg,
              value: options.showValue ? err.value : undefined,
              location: err.location,
            }))
            .array({ onlyFirstError: true });

          if (!options.logErrors) {
            logger.warn('Validation Error', {
              errors: formattedErrors,
              path: req.originalUrl,
              method: req.method,
            });
          }

          return next(
            new ApiError({
              statusCode: options.statusCode || ERROR_CODES.DB_ERRORS.VALIDATION_ERROR.statusCode,
              message: options.message || ERROR_CODES.DB_ERRORS.VALIDATION_ERROR.message,
              code: ERROR_CODES.DB_ERRORS.VALIDATION_ERROR.code,
              data: null,
              errors: formattedErrors,
            }),
          );
        }

        // 🔥 Safe extraction
        const data = matchedData(req, {
          onlyValidData: true,
          includeOptionals: true,
        });

        req.validated = data;

        return next();
      } catch (error) {
        logger.error({
          message: 'Validation Middleware Error',
          error: error.message,
          stack: error.stack,
        });

        return next(
          new ApiError({
            statusCode: ERROR_CODES.DB_ERRORS.VALIDATION_ERROR.statusCode,
            message: ERROR_CODES.DB_ERRORS.VALIDATION_ERROR.message,
            code: ERROR_CODES.DB_ERRORS.VALIDATION_ERROR.code,
          }),
        );
      }
    },
  ];
};
