const { checkSchema } = require('express-validator');

module.exports = {
  validateUserRegistration: checkSchema({
    name: {
      in: ['body'],
      isString: true,
      notEmpty: true,
      // customSanitizer: {
      //   options: (value) =>
      //     value.trim().replace(/\s+/g, ' '), // 🔥 removes extra spaces
      // },
      errorMessage: 'Name is required and must be a string',
    },
    email: {
      in: ['body'],
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Valid email is required',
    },
    password: {
      in: ['body'],
      isLength: {
        options: { min: 6 },
        errorMessage: 'Password must be at least 6 characters long',
      },
    },
    role: {
      in: ['body'],
      optional: true,
      isIn: {
        options: [['admin', 'user']],
        errorMessage: 'Role must be either admin or user',
      },
    },
  }),
  validateUserlogin: checkSchema({
    email: {
      in: ['body'],
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'Valid email is required',
    },
    password: {
      in: ['body'],
      notEmpty: true,
      errorMessage: 'Password is required',
    },
  }),
};
