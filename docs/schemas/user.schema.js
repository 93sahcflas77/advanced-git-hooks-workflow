module.exports = {
  type: 'object',
  required: ['name', 'profile'],
  properties: {
    name: {
      type: 'string',
      description: 'User name',
      example: 'Chandan thakur',
    },
    profile: {
      type: 'object',
      required: ['age', 'city'],
      properties: {
        age: {
          type: 'integer',
          description: 'User age',
          example: 25,
        },
        city: {
          type: 'string',
          description: 'User city',
          example: 'New York',
        },
      },
    },
  },
};
