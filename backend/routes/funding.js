const router = require("express").Router();
const User = require("../models/userSchema");

router.post('/deposit', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, 
      { 
        $inc: { 
          bankBalance: -amount, 
          accountBalance: +amount, 
        } 
      }, 
      { new: true } 
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user", user);
    console.log("userID", userId);
    res.json({accountBalance: user.accountBalance, bankBalance: user.bankBalance})
  } catch (err) {
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

// router.post('/withdraw', async (req, res) => {
//   const { userId, amount } = req.body;
//   try {
 
//     const user = await User.findByIdAndUpdate(userId, 
//       { 
//         $inc: { 
//           accountBalance: -amount, 
//           bankBalance: amount 
//         } 
//       }, 
//       { new: true } 
//     );
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;