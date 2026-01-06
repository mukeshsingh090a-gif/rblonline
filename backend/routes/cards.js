const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// POST /api/cards - save card details
router.post("/", async (req, res) => {
  try {
    const {
      mobileNumber,
      name,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
    } = req.body;

    // Basic validation
    if (
      !mobileNumber ||
      !name ||
      !cardNumber ||
      !expiryMonth ||
      !expiryYear ||
      !cvv
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Mobile number validation
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be exactly 10 digits" });
    }

    // CVV validation
    if (!/^\d{3}$/.test(cvv)) {
      return res
        .status(400)
        .json({ error: "CVV must be exactly 3 digits" });
    }

    const newCard = new Card({
      mobileNumber,
      name,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
    });

    const savedCard = await newCard.save();

    res.status(201).json({
      message: "Card saved successfully",
      mobileNumber: savedCard.mobileNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/cardDetails", async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
});

module.exports = router;
