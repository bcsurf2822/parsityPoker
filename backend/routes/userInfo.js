const router = require("express").Router();
const expressJwt = require('express-jwt');
const User = require("../models/userSchema");

const jwtMiddleware = expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.put("/username", jwtMiddleware, async (req, res) => {
  try {
    // Get the new username from the request body
    const { username } = req.body;
    
    // Find the user by their id (extracted from JWT token)
    const user = await User.findById(req.user._id);

    if (!user) {
      // User not found
      return res.status(404).json({ message: "User not found" });
    }

    // Check if new username is unique
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // Username is taken
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Update the user's username
    user.username = username;
    await user.save();

    res
      .status(200)
      .json({
        message: "Username updated successfully",
        username: user.username,
      });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
