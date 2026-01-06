const mongoose = require("mongoose");

const debitCardSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
    },
    cardNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    pin: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DebitCardUser", debitCardSchema);
