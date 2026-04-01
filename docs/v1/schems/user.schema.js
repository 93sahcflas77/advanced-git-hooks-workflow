const m2s = require('mongoose-to-swagger');

const UserV1 = require('../../../src/models/v1/user.model');

// convert mongoose → swagger
const userSwaggerSchema = m2s(UserV1);

module.exports = userSwaggerSchema;
