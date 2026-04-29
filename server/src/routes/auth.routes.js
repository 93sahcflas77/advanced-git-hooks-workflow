const express = require('express');
const authController = require('../controller/auth.controller');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const vaildate = require('../middleware/validation');
const { validateUserRegistration, validateUserlogin } = require('../validators/inex');
const requireAuth = require('../middleware/authjwtMiddleware');
const autoRefresh = require('../middleware/autoRefreshMiddleware');

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: create a user
 *     description: store a user data
 *     tags: [Auth]
 *     operationId: postUser
 *
 *     security: []
 *
 *
 *     requestBody:
 *       description: Not required for GET
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: chandan thakur
 *               password:
 *                 type: string
 *                 required: true
 *                 example: 45fkghgghggjgg
 *               role:
 *                 type: string
 *                 example: user
 */

router.post('/register', vaildate(validateUserRegistration), asyncHandler(authController.register));

/**
 * @openapi
 * /api/auth/login
 *   post:
 *     summary: user login
 *     description: clinet login a applcation
 *     tags: [Auth]
 *     operationId: loginUser
 *     security: []
 *
 *     parameters:
 *       - name:
 *         in:
 *         required:
 *         description:
 *         schema:
 *         example:
 *
 *     responses:
 *       statusCode:
 *         description:
 *
 *     requestBody:
 *       description: Not required GET
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 */
router.post('/login', vaildate(validateUserlogin), asyncHandler(authController.login));
router.get('/dashbord', requireAuth, asyncHandler(authController.dashbord));
router.post('/refresh', autoRefresh, asyncHandler(authController.refreshToken));
router.post('/logout', asyncHandler(authController.logout));

/**
 * @openapi
 * /path:
 *   method:
 *     summary:
 *     description:
 *     tags:
 *     operationId:
 *
 *     x-module:
 *     x-permission:
 *     x-audit-log:
 *
 *     security:
 *
 *     parameters:
 *       - name:
 *         in:
 *         required:
 *         description:
 *         schema:
 *         example:
 *
 *     responses:
 *       statusCode:
 *         description:
 *         headers:
 *           headerName:
 *             description:
 *             schema:
 *             example:
 *         content:
 *           mediaType:
 *             schema:
 *             example:
 *
 *     requestBody:
 *       description:
 *       required:
 *       content:
 *         mediaType:
 *           schema:
 *           example:
 */
// Route.put("/", middleware, controller);

/**
 * @openapi
 * /path:
 *   method:
 *     summary:
 *     description:
 *     tags:
 *     operationId:
 *
 *     x-module:
 *     x-permission:
 *     x-audit-log:
 *
 *     security:
 *
 *     parameters:
 *       - name:
 *         in:
 *         required:
 *         description:
 *         schema:
 *         example:
 *
 *     responses:
 *       statusCode:
 *         description:
 *         headers:
 *           headerName:
 *             description:
 *             schema:
 *             example:
 *         content:
 *           mediaType:
 *             schema:
 *             example:
 *
 */
// Route.delete("/", middleware, controller);

module.exports = router;
