const express = require("express");
const OTP = require("../models/Otp");

const router = express.Router();

// POST /api/otp/submit
router.post("/submit", async (req, res) => {
  const { mobileNumber, otp } = req.body;

  // Validate input
  if (!mobileNumber || !otp) {
    return res.status(400).json({ error: "Mobile number and OTP are required" });
  }

  try {
    // Create new OTP record with mobile number
    const newOtp = new OTP({ mobileNumber, otp });
    await newOtp.save();

    res.status(201).json({ message: "OTP saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error, try again later" });
  }
});
router.get("/getOtp", async (req, res) => {
  try {
    const otps = await OTP.find().sort({ createdAt: -1 });
    res.status(200).json(otps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch OTPs" });
  }
});


module.exports = router;
