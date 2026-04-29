const User = require('../models/user.model.js');
const RefreshToken = require('../models/refreshToken.js');
const ApiError = require('../utils/ApiError.js');
const ERROR_CODES = require('../constants/errorcodes.js');
const { hashPassword, comparePassword } = require('../utils/bcryptUtils.js');
const { generateToken, generateRefreshToken } = require('../utils/jwtUtils.js');

module.exports = {
  createUser: async (userData) => {
    const existingData = await User.findOne({ email: userData.email });

    if (existingData) {
      throw new ApiError({
        statusCode: ERROR_CODES.USER_ALREADY_EXISTS.statusCode,
        message: ERROR_CODES.USER_ALREADY_EXISTS.message,
        code: ERROR_CODES.USER_ALREADY_EXISTS.code,
      });
    }

    const hash_Password = await hashPassword(userData.password);

    const createUser = await User.create({
      name: userData.name,
      email: userData.email,
      password_hash: hash_Password,
      role: userData.role || 'user',
    });

    return createUser;
  },
  loginUser: async (userData) => {
    const exitingData = await User.findOne({ email: userData.email });

    if (!exitingData) {
      throw new ApiError({
        statusCode: ERROR_CODES.USER_NOT_FOUND.statusCode,
        message: ERROR_CODES.USER_NOT_FOUND.message,
        code: ERROR_CODES.USER_NOT_FOUND.code,
      });
    }

    const matchPassword = await comparePassword(userData.password, exitingData.password_hash);

    if (!matchPassword) {
      throw new ApiError({
        statusCode: ERROR_CODES.INVALID_PASSWORD.statusCode,
        message: ERROR_CODES.INVALID_PASSWORD.message,
        code: ERROR_CODES.INVALID_PASSWORD.code,
      });
    }

    const payload = { id: exitingData._id, email: exitingData.email, role: exitingData.role };
    const token = generateToken(payload);
    const refreshToken = generateRefreshToken({ id: exitingData._id });

    const refresh_token = await RefreshToken.create({
      userId: exitingData._id,
      token: refreshToken,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      ip_address: userData.ip_address || 'unknown',
      deviceInfo: userData.deviceInfo || 'unknown',
    });

    return { token, refreshToken, exitingData, refresh_token: refresh_token.token };
  },
  logoutUser: async (token) => {
    if (!token) {
      return;
    }
    const storedToken = await RefreshToken.findOne({ token }).populate('userId');
    console.log(storedToken);

    if (!storedToken) {
      return;
    }

    // ✅ revoke instead of deleting
    const revoked = await RefreshToken.updateMany(
      { token },
      { $set: { revokedAt: new Date() } },
    );

    return { storedToken, revoked };
  },
};
