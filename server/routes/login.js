require("dotenv").config();
const bcrypt = require("bcrypt");
const router = require("express").Router();
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
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
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

const jwtMiddleware = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

router.get("/user", jwtMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      accountBalance: user.accountBalance,
      bankBalance: user.bankBalance,
      avatar: user.avatar,
      lastLogin: user.lastLogin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
