const express = require('express');
const logger = require('../utils/logger/logger');
const { validate } = require('../middleware/validation.js');
const { userSchema } = require('../validators/inex.js');
const upload = require('../middleware/multer.js');
const ApiError = require('../utils/ApiError.js');
const asyncHandler = require('../utils/asyncHandler.js');
const { client } = require('../config/minio.js');
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
  res.json({ message: 'Hello, World!' });
});

router.post('/', validate(userSchema), (req, res) => {
  const data = req.validated;
  logger.info('Received data:', data);

  res.json({ message: 'Hello, World!', data });
});

router.post('/upload-file', upload.single('file'), async (req, res) => {
  const objectName = `${Date.now()}-${req.file.originalname}`;
  const bucketName = 'chandan';

  const upload_data = await client.putObject(
    bucketName,
    objectName,
    req.file.buffer,
    req.file.size,
    {
      'Content-Type': req.file.mimetype,
    },
  );
  logger.info('Files uploaded:', upload_data);
  res.json({
    message: '✅ File uploaded successfully',
    file: objectName,
  });
});

router.get('/test-error', (req, res, next) => {
  return next(
    new ApiError({
      statusCode: 400,
      message: 'Validation failed',
      code: 'VAL_001',
      errors: ['Email is required', 'Password too short'],
    }),
  );
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
