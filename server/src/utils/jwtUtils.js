const jwt = require('jsonwebtoken');
const config = require('../config/env');
const logger = require('./logger/logger');

const { accessSecret, accessExp, refreshSecret, refreshExp } = config.JWT;

if (!accessSecret) {
  logger.warn({
    message:
      'JWT access secret is not defined! Please set JWT_ACCESS_SECRET in your environment variables.',
  });
  process.exit(1);
}

if (!refreshSecret) {
  logger.warn({
    message:
      'JWT refresh secret is not defined! Refresh token functionality will be disabled. Please set JWT_REFRESH_SECRET in your environment variables if you want to use refresh tokens.',
  });
}

// ------------------------------
// 🔑 TOKEN GENERATION
// ------------------------------

const generateRefreshToken = (payload) => {
  if (!refreshSecret) {
    return null;
  }
  return jwt.sign(payload, refreshSecret, { expiresIn: refreshExp });
};

/**
 * Generate a signed JWT token.
 * @param {object} payload - The data to embed inside the token.
 * @returns {string} The signed JWT token.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, accessSecret, { expiresIn: accessExp });
};

// ------------------------------
// 🛡️ TOKEN VERIFICATION
// ------------------------------

const verifyRefreshToken = (token) => {
  if (!refreshSecret) {
    return null;
  }
  try {
    return jwt.verify(token, refreshSecret);
  } catch {
    return null;
  }
};

/**
 * Verify a JWT token's validity.
 * @param {string} token - The JWT token to verify.
 * @returns {object|null} Decoded payload or null if invalid/expired.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, accessSecret);
  } catch {
    return null;
  }
};

/**
 * Decode a JWT token without verifying signature (use only for debugging).
 * @param {string} token - The JWT token to decode.
 * @returns {object|null} Decoded token data or null if invalid.
 */
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
};

module.exports = {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
  verifyToken,
  decodeToken,
};
