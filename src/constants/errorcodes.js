const ERROR_CODES = {
  AUTH_REQUIRED: {
    code: 'AUTH_001',
    message: 'Authentication required',
    statusCode: 401,
  },
  INVALID_CREDENTIALS: {
    code: 'AUTH_002',
    message: 'Invalid email or password',
    statusCode: 401,
  },
  INVALID_TOKEN: {
    code: 'AUTH_002',
    message: 'Invalid token',
    statusCode: 401,
  },
  TOKEN_EXPIRED: {
    code: 'AUTH_003',
    message: 'Token expired',
    statusCode: 401,
  },
  DB_ERRORS: {
    INVALID_ID: {
      code: 'DB_001',
      message: 'Invalid ID format',
      statusCode: 400,
    },
    DUPLICATE_KEY: {
      code: 'DB_002',
      message: 'Duplicate key error',
      statusCode: 400,
    },
    VALIDATION_ERROR: {
      code: 'DB_003',
      message: 'Validation error',
      statusCode: 400,
    },
  },
  USER_NOT_FOUND: {
    code: 'USER_001',
    message: 'User not found',
    statusCode: 404,
  },
  USER_ALREADY_EXISTS: {
    code: 'USER_002',
    message: 'User already exists',
    statusCode: 409,
  },

  // 📦 GENERAL
  INTERNAL_ERROR: {
    code: 'GEN_001',
    message: 'Internal server error',
    statusCode: 500,
  },
  BAD_REQUEST: {
    code: 'GEN_002',
    message: 'Bad request',
    statusCode: 400,
  },
};

module.exports = ERROR_CODES;
