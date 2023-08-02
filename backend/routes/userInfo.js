const router = require("express").Router();
const expressJwt = require('express-jwt');
const User = require("../models/userSchema");

const jwtMiddleware = expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

router.put("/username", jwtMiddleware, async (req, res) => {
  try {

    const { username } = req.body;
    
    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({ message: "User not found" });
    }


    const existingUser = await User.findOne({ username });

    if (existingUser) {

      return res.status(400).json({ message: "Username is already taken" });
    }

    user.username = username;
    await user.save();

    res
      .status(200)
      .json({
        message: "Username updated successfully",
        username: user.username,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
