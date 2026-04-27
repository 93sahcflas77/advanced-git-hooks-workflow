const crypto = require('crypto');
module.exports = createResetToken = () => {
  const rowToken = crypto.randomBytes(20).toString('hex');

  const hashedToken = crypto.createHash('sha256').update(rowToken).digest('hex');

  return { rowToken, hashedToken };
};
