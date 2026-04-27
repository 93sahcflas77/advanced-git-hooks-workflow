// 🔐 bcryptjs Password Utility – Secure hashing & comparison functions for authentication systems

const bcrypt = require('bcryptjs'); // ✅ bcryptjs is lightweight & cross-platform safe
const { CopyDestinationOptions } = require('minio');
const ApiError = require('./ApiError');
const logger = require('./logger/logger');

//Constant for salt rounds – easily configurable
const SALT_ROUNDS = 10;

/**
 * Hashes a plain text password using bcrypt.
 * @param {string} plainPassword - The user's plain password.
 * @returns {Promise<string>} - The hashed password.
 */

const hashPassword = async (plainPassword) => {
  try {
    if (!plainPassword || typeof plainPassword !== 'string') {
      throw new ApiError({
        statusCode: ERROR_CODES.INVALID_PASSWORD.statusCode,
        message: ERROR_CODES.INVALID_PASSWORD.message,
        code: ERROR_CODES.INVALID_PASSWORD.code,
      });
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (error) {
    logger.error({
      message: 'Error hashing paaword',
      error: error.message,
    });
    throw new ApiError({
      statusCode: ERROR_CODES.HASHING_ERROR.statusCode,
      message: ERROR_CODES.HASHING_ERROR.message,
      code: ERROR_CODES.HASHING_ERROR.code,
    });
  }
};

/**
 * Compares a plain password with a hashed password.
 * @param {string} plainPassword - The user's entered password.
 * @param {string} hashedPassword - The stored hashed password.
 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
 */

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    if (!plainPassword || !hashedPassword) {
      throw new ApiError({
        statusCode: ERROR_CODES.INVALID_PASSWORD.statusCode,
        message: ERROR_CODES.INVALID_PASSWORD.message,
        code: ERROR_CODES.INVALID_PASSWORD.code,
      });
    }

    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    logger.error({
      message: 'Error comparing password',
      error: error.message,
    });
    throw new ApiError({
      statusCode: ERROR_CODES.VERIFICATION_ERROR.statusCode,
      message: ERROR_CODES.VERIFICATION_ERROR.message,
      code: ERROR_CODES.VERIFICATION_ERROR.code,
    });
  }
};

module.exports = { hashPassword, comparePassword };
