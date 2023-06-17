require('dotenv').config()
const bcrypt = require("bcrypt");
const router = require("express").Router();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

console.log("expressJWT", expressJwt)

const User = require("../models/userSchema");


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

const jwtMiddleware = expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.get('/user',  jwtMiddleware, async (req, res) => {
  try {
    // Find the user by their id
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      // User not found
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({
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
