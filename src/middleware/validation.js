const { matchedData, validationResult } = require('express-validator');
const logger = require('../utils/logger/logger');

exports.validate = (schemas = [], options = {}) => {
  return [
    ...(Array.isArray(schemas) ? schemas : [schemas]),

    async (req, res, next) => {
      try {
        const result = validationResult(req);

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
            logger.error('Validation Error', {
              errors: formattedErrors,
              path: req.originalUrl,
              method: req.method,
            });
          }

          return res.status(options.statusCode || 400).json({
            success: false,
            message: options.message || 'Validation failed',
            errors: formattedErrors,
          });
        }

        // 🔥 Safe extraction
        const data = matchedData(req, {
          onlyValidData: true,
          includeOptionals: true,
        });

        req.validated = data;

        return next();
      } catch (error) {
        logger.error('Validation Middleware Error', error);

        return res.status(500).json({
          success: false,
          message: 'Validation processing failed',
        });
      }
    },
  ];
};
