const userService = require('../services/auth.service');
const ApiError = require('../utils/ApiError.js');
const ERROR_CODES = require('../constants/errorcodes.js');

module.exports = {
  register: async (req, res) => {
    try {
      const createUser = await userService.createUser(req.body);

      res.json({
        message: 'User register successfully',
        user: createUser,
      });
    } catch (error) {
      throw new ApiError({
        statusCode: ERROR_CODES.INTERNAL_SERVER_ERROR.statusCode,
        message: 'Failed to register user',
        code: ERROR_CODES.INTERNAL_SERVER_ERROR.code,
      });
    }
  },
};
