const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    // resetPasswordToken: {
    //   type: String,
    //   default: null,
    //   select: false
    // },
    // resetPasswordExpire: {
    //   type: Date(),
    //   default: null,
    //   select: false
    // }
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
