class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = 'Internal Server Error',
    code = 'GEN_001',
    data = null,
    errors = [],
    stack = '',
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.success = false;
    this.data = data;
    this.message = message;
    this.errors = errors;
    this.stack = stack;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
