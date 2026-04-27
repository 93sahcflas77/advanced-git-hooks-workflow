const express = require('express');
const authController = require('../controller/auth.controller.js');
const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   get:
 *     summary: create a user
 *     description: store a user data
 *     tags: [Users]
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

router.post('/register', authController.register);

// router.post('/', validate(userSchema), (req, res) => {
//   const data = req.validated;
//   logger.info('Received data:', data);

//   res.json({ message: 'Hello, World!', data });
// });

// router.post('/upload-file', upload.single('file'), async (req, res) => {
//   const objectName = `${Date.now()}-${req.file.originalname}`;
//   const bucketName = 'chandan';

//   const upload_data = await client.putObject(
//     bucketName,
//     objectName,
//     req.file.buffer,
//     req.file.size,
//     {
//       'Content-Type': req.file.mimetype,
//     },
//   );
//   logger.info('Files uploaded:', upload_data);
//   res.json({
//     message: '✅ File uploaded successfully',
//     file: objectName,
//   });
// });

// router.get('/test-error', (req, res, next) => {
//   return next(
//     new ApiError({
//       statusCode: ERROR_CODES.BAD_REQUEST.statusCode,
//       message: ERROR_CODES.BAD_REQUEST.message,
//       code: ERROR_CODES.BAD_REQUEST.code,
//       errors: ['Email is required', 'Password too short'],
//     }),
//   );
// });

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
