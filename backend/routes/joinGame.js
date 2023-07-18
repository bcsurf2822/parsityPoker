const router = require('express').Router();
const Game = require("../models/gamesSchema");
const User = require("../models/userSchema");

router.post('/joingame', async (req, res) => {
  const gameId = req.body.gameId;
  const userId = req.body.userId;

  try {
      const game = await Game.findById(gameId);
      if (!game) {
          return res.status(404).json({message: 'Game not found'});
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({message: 'User not found'});
      }

      const player = game.playersInGame.find(player => player.user.toString() === userId);
      if (player) {
          return res.status(400).json({message: 'User already in the game'});
      }

      const newPlayer = {
          user: userId,
          chips: 0, // You will need to adjust this based on your business logic
          handCards: [], // The cards will be assigned when the game starts
          bet: 0 // Initially the bet will be zero
      };

      game.playersInGame.push(newPlayer);
      await game.save();

      res.status(200).json({message: 'User has joined the game successfully', game});
  } catch (err) {
      console.log(err);
      res.status(500).json({message: 'Server error'});
  }
});

module.exports = router;