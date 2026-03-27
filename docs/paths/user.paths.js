module.exports = {
  '/api/user': {
    get: {
      tags: ['Users'],
      summary: 'Get all user',
      operationId: 'getUser',
      responses: {
        200: {
          description: 'Users fetches successfully',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },

    post: {
      tags: ['Users'],
      summary: 'Post a user',
      operationId: 'createUser',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User created',
        },
      },
    },
  },
  '/api/user/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Get user by ID',
      operationId: 'getUserById',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            example: '45fgdtdffhg5454fdjuffg',
          },
        },
      ],
      responses: {
        200: {
          description: 'User fetched',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    },
  },
};
