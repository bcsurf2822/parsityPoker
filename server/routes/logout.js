const router = require("express").Router();
const expressJwt = require("express-jwt");
const User = require("../models/userSchema");

const jwtMiddleware = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});


router.post("/logout", jwtMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; 
    console.log("User ID from JWT:", userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.clearCookie("authToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;