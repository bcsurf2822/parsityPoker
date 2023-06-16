require('dotenv').config()
const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/userSchema");
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      // User not found
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    if (!isPasswordValid) {
      // Invalid password
      return res.status(401).json({ message: "Invalid password" });
    }

    // Password is valid, authentication successful
    res
      .status(200)
      .json({
        message: "Authentication successful",
        token: token,
        id: user._id,
        username: user.username,
        email: user.email,
        accountBalance: user.accountBalance,
        bankBalance: user.bankBalance,
        avatar: user.avatar,
        lastLogin: user.lastLogin,
      });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
