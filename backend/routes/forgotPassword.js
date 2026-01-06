const express = require("express");
const router = express.Router();
const ForgotPassword = require("../models/ForgotPassword");

// POST /api/users/forgot-password
router.post("/", async (req, res) => {
  try {
    const { customerId, mobileNumber } = req.body;

    // Validate required fields
    if (!customerId || !mobileNumber) {
      return res.status(400).json({
        error: "Customer ID and Mobile Number are required",
      });
    }

    // Validate mobile number format
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({
        error: "Mobile number must be exactly 10 digits",
      });
    }

    // Save request to DB
    const record = new ForgotPassword({ customerId, mobileNumber });
    await record.save();

    res.status(201).json({
      message: "Forgot Password request submitted successfully",
      mobileNumber: record.mobileNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});



router.get("/list", async (req, res) => {
  try {
    const list = await ForgotPassword.find().sort({ createdAt: -1 });
    res.status(200).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch forgot password details" });
  }
});

module.exports = router;
