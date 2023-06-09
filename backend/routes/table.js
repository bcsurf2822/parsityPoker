const express = require('express');
const router = express.Router();
const Table = require('../models/Table');
const User = require('../models/User');

router.post("/joingame", req, res) => {
  const userId = req.body.userId;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const table = await Table.findOne(); // Replace with your logic to find a table
  if (!table) {
    res.status(404).json({ error: 'No available tables' });
    return;
  }

  const newPlayer = {
    user: user._id,
    chips: 1000, // Default chips, replace with your own logic
    bet: 0,
    handCards: [],
  };

  table.playersInGame.push(newPlayer);
  await table.save();

  res.status(200).json({ message: 'Successfully joined table', tableId: table._id });
});

module.exports = router;