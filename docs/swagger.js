const config = require('../src/config/env');
const swaggerJsdoc = require('swagger-jsdoc');
const userSchema = require('./schemas/user.schema');
const mongooseSchemaUser = require('./mongoose_shema_to_swagger/userSchema');
const userPaths = require('./paths/user.paths');
const tags = require('./tags');
const path = require('path');

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'User & Role Management API',
      description: 'Swagger-jsdoc full Express project',
      version: '1.0.0.1',
      contact: {
        name: 'chandan thakur',
        email: 'chandan7073251686@gmail.com',
      },
      license: {
        name: 'MIT',
      },
    },

    tags,

    components: {
      schemas: {
        User: mongooseSchemaUser,
      },
    },

    paths: {
      ...userPaths,
    },

    servers: [
      {
        url: config.baseUrl,
        description: `${config.baseUrl} server`,
      },
    ],
  },

  apis: [path.join(process.cwd(), './src/routes/*.js')],
});

module.exports = swaggerSpec;
