const config = require('../config/env');
const swaggerJsdoc = require('swagger-jsdoc');
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
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',

          // in: "apikey",
          // name: "apikey",

          // flows: "oauth2",
          // authorizationUrl: "oauth2",
          // tokenUrl: "oauth2",
          // scopes: "oauth2",

          // openIdConnectUrl: "openID"
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
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
