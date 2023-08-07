const router = require("express").Router();
const User = require('../models/userSchema');

router.get('/:id/username', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, 'username');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;