const argon2 = require('argon2');
const logger = require('./logger/logger');
const ApiError = require('./ApiError');
const ERROR_CODES = require('../constants/errorcodes');

// Configurable hashing parameters — adjust based on your server capacity.
const ARGON_CONFIG = {
  type: argon2.argon2id, // ✅ Best balance of security & performance
  memoryCost: 2 ** 16, // 64 MB memory
  timeCost: 3, // 3 iterations
  parallelism: 2, // 2 threads
};

/**
 * Hash a plain-text password using Argon2id.
 * @param {string} plainPassword - The user's plain password.
 * @returns {Promise<string>} - The securely hashed password.
 * @throws {Error} If hashing fails or input is invalid.
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
    const hash = await argon2.hash(plainPassword, ARGON_CONFIG);
    return hash;
  } catch (error) {
    logger.error({
      message: 'Argon2 Hashing Error',
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
 * Verify a plain-text password against a hashed password.
 * @param {string} hashedPassword - The stored Argon2 hashed password.
 * @param {string} plainPassword - The user's plain password to check.
 * @returns {Promise<boolean>} - True if passwords match, false otherwise.
 * @throws {Error} If verification fails.
 */
const verifyPassword = async (hashedPassword, plainPassword) => {
  try {
    if (!plainPassword || !hashedPassword) {
      throw new ApiError({
        statusCode: ERROR_CODES.INVALID_PASSWORD.statusCode,
        message: ERROR_CODES.INVALID_PASSWORD.message,
        code: ERROR_CODES.INVALID_PASSWORD.code,
      });
    }
    const isMatch = await argon2.verify(hashedPassword, plainPassword);
    return isMatch;
  } catch (error) {
    logger.error({
      message: 'Argon2 Verification Error',
      error: error.message,
    });
    throw new ApiError({
      statusCode: ERROR_CODES.VERIFICATION_ERROR.statusCode,
      message: ERROR_CODES.VERIFICATION_ERROR.message,
      code: ERROR_CODES.VERIFICATION_ERROR.code,
    });
  }
};

module.exports = { hashPassword, verifyPassword };
