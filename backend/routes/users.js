const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Save customer ID & password
router.post("/register", async (req, res) => {
  try {
    const { mobileNumber, customerId, password } = req.body;

    // Required fields check
    if (!mobileNumber || !customerId || !password) {
      return res.status(400).json({
        error: "Mobile number, Customer ID and Password are required",
      });
    }

    // Mobile number validation
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({
        error: "Mobile number must be exactly 10 digits",
      });
    }

    const user = new User({
      mobileNumber,
      customerId,
      password,
    });

    await user.save();

    res.status(201).json({
      message: "User saved successfully",
      mobileNumber: user.mobileNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Technical error, please try later",
    });
  }
});






router.get("/userList", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // fetch all users
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err); // log actual error
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


module.exports = router;
