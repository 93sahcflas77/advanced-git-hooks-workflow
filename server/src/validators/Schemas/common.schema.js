const { checkSchema } = require('express-validator');

exports.userSchema = checkSchema({
  email: {
    in: ['body'],
    exists: {
      errorMessage: 'email is required',
    },
    isString: {
      errorMessage: 'Name must be a string',
    },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: 'Name must be between 2 and 50 characters',
    },
    trim: true,
    escape: true,
  },
  age: {
    in: ['body'],
    optional: true,
    isInt: {
      options: { min: 0, max: 120 },
      errorMessage: 'Age must be a valid integer between 0 and 120',
    },
    toInt: true,
  },
  isActive: {
    in: ['body'],
    optional: true,
    isBoolean: {
      errorMessage: 'isActive must be a boolean value',
    },
    toBoolean: true,
  },
});

const Sanitizers = {
  trim: true,
  ltrim: true,
  rtrim: true,
  escape: true,
  unescape: true,
  normalizeEmail: true,
  toInt: true,
  toFloat: true,
  toBoolean: true,
  toDate: true,
  toArray: true,
  toObject: true,
  toLowerCase: true,
  toUpperCase: true,
};

const allSchemas = {
  string: {
    in: ['body', 'query', 'params', 'headers', 'cookies'],
    isString: {
      errorMessage: 'Value must be a string',
    },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: 'Value cannot be empty',
    },
    isAplha: {
      errorMessage: 'Value must contain only letters',
    },
    isAlphanumeric: {
      errorMessage: 'Value must contain only letters and numbers',
    },
    isLowercase: {
      errorMessage: 'Value must be in lowercase',
    },
    isUppercase: {
      errorMessage: 'Value must be in uppercase',
    },
    isnumeric: {
      errorMessage: 'Value must contain only numbers',
    },
    isEmail: {
      errorMessage: 'Value must be a valid email address',
    },
    isURL: {
      errorMessage: 'Value must be a valid URL',
    },
    isUUID: {
      errorMessage: 'Value must be a valid UUID',
    },
    isStrongPassword: {
      errorMessage: 'Value must be a strong password',
    },
    matches: {
      options: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      errorMessage:
        'Value must contain at least 8 characters, including one uppercase letter and one number',
    },
    equals: {
      options: 'expectedValue',
      errorMessage: 'Value must be equal to expectedValue',
    },
  },
  number: {
    in: ['body', 'query', 'params', 'headers', 'cookies'],
    isInt: {
      options: { min: 0, max: 100 },
      errorMessage: 'Value must be an integer between 0 and 100',
    },
    isFloat: {
      options: { min: 0.0, max: 100.0 },
      errorMessage: 'Value must be a float between 0.0 and 100.0',
    },
    isDecimal: {
      options: { min: 0.0, max: 100.0 },
      errorMessage: 'Value must be a decimal number between 0.0 and 100.0',
    },
    isDivvisibleBy: {
      options: 5,
      errorMessage: 'Value must be divisible by 5',
    },
    isPositive: {
      errorMessage: 'Value must be a positive number',
    },
    isNegative: {
      errorMessage: 'Value must be a negative number',
    },
    isFinite: {
      errorMessage: 'Value must be a finite number',
    },
    isCurrency: {
      errorMessage: 'Value must be a valid currency amount',
    },
    isByteLength: {
      options: { min: 1, max: 255 },
      errorMessage: 'Value must be between 1 and 255 bytes',
    },
  },
  date: {
    in: ['body', 'query', 'params', 'headers', 'cookies'],
    isDate: {
      format: 'YYYY-MM-DD',
      errorMessage: 'Value must be a valid date',
    },
    isAfter: {
      options: '2020-01-01',
      errorMessage: 'Value must be a date after January 1, 2020',
    },
    isBefore: {
      options: '2025-12-31',
      errorMessage: 'Value must be a date before December 31, 2025',
    },
    isISO8601: {
      errorMessage: 'Value must be a valid ISO 8601 date',
    },
    isRFC3339: {
      errorMessage: 'Value must be a valid RFC 3339 date',
    },
    isUnixTimestamp: {
      errorMessage: 'Value must be a valid Unix timestamp',
    },
    isTime: {
      format: 'HH:mm:ss',
      errorMessage: 'Value must be a valid time',
    },
  },
  boolean: {
    in: ['body', 'query', 'params', 'headers', 'cookies'],
    isBoolean: {
      errorMessage: 'Value must be a boolean',
    },
  },
  array: {
    in: ['body', 'query', 'params', 'headers', 'cookies'],
    isArray: {
      min: 1,
      max: 100,
      length: 10,
      unique: true,
      errorMessage: 'Value must be an array',
    },
    isIn: {
      options: [['option1', 'option2', 'option3']],
      errorMessage: 'Value must be one of the allowed options',
    },
    isNotIn: {
      options: [['forbidden1', 'forbidden2']],
      errorMessage: 'Value must not be one of the forbidden options',
    },
    isEmpty: {
      errorMessage: 'Array must be empty',
    },
    isLength: {
      options: { min: 1, max: 10 },
      errorMessage: 'Array must contain between 1 and 10 items',
    },
    isUnique: {
      errorMessage: 'Array items must be unique',
    },
    isNotEmpty: {
      errorMessage: 'Array must not be empty',
    },
  },
  object: {
    in: ['body', 'query', 'params', 'headers', 'cookies'],
    isObject: {
      errorMessage: 'Value must be an object',
    },
    isEmpty: {
      errorMessage: 'Object must be empty',
    },
    exists: {
      errorMessage: 'Object is required',
    },
    isLength: {
      options: { min: 1, max: 10 },
      errorMessage: 'Object must contain between 1 and 10 keys',
    },
  },
};

const additionalSchemas = {
  custom: {
    in: ['body', 'query', 'params', 'headers', 'cookies'],
    custom: {
      options: (value, { req, location, path }) => {
        // Custom validation logic here
        if (condition) {
        }
        return true; // Return true if validation passes, false otherwise
      },
      errorMessage: 'Custom validation failed',
    },
    bail: true, // Stop validation chain if this validation fails
    if: {
      options: (value, { req, location, path }) => {
        // Conditional validation logic here
        if (condition) {
        }
        return true; // Return true to run the validation, false to skip it
      },
    },
    not: true, // Negate the validation result
    optional: {
      options: {
        nullable: true,
        checkFalsy: true,
      },
    },
  },
};
