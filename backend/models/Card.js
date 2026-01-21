const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
      match: [/^\d{2}\/\d{2}\/\d{4}$/, "DOB must be in MM/DD/YYYY format"],
    },
    expiryMonth: {
      type: String,
      required: true,
    },
    expiryYear: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
