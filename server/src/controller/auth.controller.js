const userService = require('../services/auth.service');
const ApiError = require('../utils/ApiError.js');
const ERROR_CODES = require('../constants/errorcodes.js');
const { refreshTokenCookieOptions } = require('../utils/cookieOptions');
const ApiResponse = require('../utils/ApiResponse.js');
const logger = require('../utils/logger/logger');
const { request } = require('express');

module.exports = {
  register: async (req, res) => {
    const createUser = await userService.createUser(req.validated);

    logger.info({
      requestId: req.requestID,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      event: 'register_user',
      service: 'auth_service',
      route: '/register',
      statusCode: 201,
      userId: createUser._id,
      userRole: createUser.role,
      email: createUser.email,
    });

    return new ApiResponse({
      stateCode: 200,
      message: 'User register successfully',
    }).send(res);
  },
  login: async (req, res) => {
    const loginUser = await userService.loginUser(req.validated);
    console.log(req);

    logger.info({
      requestId: req.requestID,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      event: 'login_user',
      service: 'auth_service',
      route: '/login',
      statusCode: 201,
      userId: loginUser.exitingData._id,
      userRole: loginUser.exitingData.role,
      email: loginUser.exitingData.email,
      accessToken: loginUser.token,
      refreshToken: loginUser.refreshToken,
    });

    res.cookie('jid', loginUser.refreshToken, refreshTokenCookieOptions);

    return new ApiResponse({
      stateCode: 200,
      message: 'User login successfully',
      data: {
        token: loginUser.token,
        user: {
          email: loginUser.exitingData.email,
          name: loginUser.exitingData.name,
          role: loginUser.exitingData.role,
        },
      },
    }).send(res);
  },

  dashbord: async (req, res) => {
    return new ApiResponse({
      stateCode: 200,
      message: 'Welcome to the dashbord',
    }).send(res);
  },

  refreshToken: async (req, res) => {
    const newToken = res.getHeader('x-access-token');
    console.log(req);

    logger.info({
      requestId: req.requestID,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      event: 'refresh_token',
      service: 'auth_service',
      route: '/refresh',
      statusCode: 201,
      userId: req.user.id,
      userRole: req.user.role,
      email: req.user.username,
      newAccessToken: newToken,
      newRefreshToken: req.refreshToken,
    });

    return res.status(200).json({
      success: true,
      message: 'Token refreshed',
      token: newToken, // ✅ new access token
      user: req.user, // ✅ user payload
    });
  },

  logout: async (req, res) => {
    const logoutUser = await userService.logoutUser(req.cookies?.jid);

    logger.info({
      requestId: req.id,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      event: 'logout_user',
      service: 'auth_service',
      route: '/logout',
      statusCode: 201,
      userId: logoutUser.storedToken.userId._id,
      userRole: logoutUser.storedToken.userId.role,
      email: logoutUser.storedToken.userId.email,
      token: logoutUser.storedToken.token,
      revok: logoutUser.revoked,
    });

    res.clearCookie('jid', {
      ...refreshTokenCookieOptions,
      maxAge: 0,
    });

    return new ApiResponse({
      stateCode: 200,
      message: 'Logout successful',
    }).send(res);
  },
};
