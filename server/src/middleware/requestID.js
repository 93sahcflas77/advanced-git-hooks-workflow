const { randomUUID } = require('crypto');

module.exports = (req, res, next) => {
  // get exiting request ID from headers if present
  const incomingRequestID = req.headers['x-request-id'] || req.headers['x-correlation-id'];

  // generate if missiong
  const requestID = incomingRequestID || randomUUID();

  // attach to request object
  req.requestID = requestID;

  // set response header
  res.setHeader('X-Request-ID', requestID);

  next();
};
