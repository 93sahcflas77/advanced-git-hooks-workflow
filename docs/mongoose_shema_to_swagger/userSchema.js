const m2s = require('mongoose-to-swagger');
const User = require('../../src/models/user.model');

// convert mongoose → swagger
const userSwaggerSchema = m2s(User);

module.exports = userSwaggerSchema;
