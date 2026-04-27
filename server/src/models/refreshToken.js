const { referrerPolicy } = require('helmet');
const { default: mongoose } = require('mongoose');
const mongppse = require('mongoose');

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    revoked: {
      type: Date,
      required: false,
    },
    revoked_at: {
      type: Date,
      required: false,
    },
    ip_address: {
      type: String,
      required: false,
    },
    deviceInfo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
