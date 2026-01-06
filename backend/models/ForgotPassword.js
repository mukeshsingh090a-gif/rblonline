const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ForgotPassword", forgotPasswordSchema);
