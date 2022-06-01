const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  emailOTP: {
    type: String,
    required: true,
  },
  mobileOTP: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600
  },
});

module.exports = mongoose.model("OTPs", OTPSchema);