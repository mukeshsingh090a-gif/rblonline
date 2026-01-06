const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true, // Mobile number is required
    },
    otp: {
      type: String,
      required: true, // OTP is required
    },
    createdAt: {
      type: Date,
      default: Date.now, // Keep creation time
    },
  },
  { timestamps: true } // This will also add updatedAt
);

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
