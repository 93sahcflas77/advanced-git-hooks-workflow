const express = require('express');
const logger = require('../utils/logger/logger');
const { request } = require('../app');
const router = express.Router();

/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a single user using their unique ID
 *     tags: [Users]
 *     operationId: getUserById
 *
 *     x-module: user
 *     x-permission: user.read
 *     x-audit-log: true
 *
 *     security: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Unique ID
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *
 *     responses:
 *       "200":
 *         description: User fetched successfully
 *         headers:
 *           X-Request-ID:
 *             description: Request tracking ID
 *             schema:
 *               type: string
 *             example: "req-123"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *     requestBody:
 *       description: Not required for GET
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 */

router.get('/', (req, res) => {
  logger.info('fetching user', {
    userId: 123456789,
    requestId: req.requestID,
    reIp: req.path,
  });
  res.json({ message: 'Hello, World!' });
});

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
 *
 *     requestBody:
 *       description:
 *       required:
 *       content:
 *         mediaType:
 *           schema:
 *           example:
 */
// Route.post("/", middleware, controller);

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
