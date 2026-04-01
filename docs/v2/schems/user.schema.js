const m2s = require('mongoose-to-swagger');
const Userv2 = require('../../../src/models/v2/user.model');

// convert mongoose → swagger
const userSwaggerSchema = m2s(Userv2);

module.exports = userSwaggerSchema;
