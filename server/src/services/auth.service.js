const User = require('../models/user.model.js');
const ApiError = require('../utils/ApiError.js');
const { ERROR_CODES } = require('../constants/errorcodes.js');
const { hashPassword } = require('../utils/bcryptUtils.js');

module.exports = {
  createUser: async (userData) => {
    const exitData = await User.find({ email: userData.email });

    if (!exitData) {
      throw new ApiError({
        statusCode: ERROR_CODES.BAD_REQUEST.statusCode,
        message: 'User already exist',
        code: ERROR_CODES.BAD_REQUEST.code,
      });
    }

    const hash_Password = hashPassword(userData.password);

    const createUser = await User.create({
      email: userData.email,
      password: hash_Password,
      role: userData.role || 'user',
    });

    return createUser;
  },
};
