const router = require('express').Router();
const Game = require("../models/gamesSchema");

router.get('/view/:gameId', async (req, res) => {
  const gameId = req.params.gameId;

  try {
      const game = await Game.findById(gameId).populate('playersInGame.user');
      if (!game) {
          return res.status(404).json({message: 'Game not found'});
      }

      res.status(200).json(game);
  } catch (err) {
      console.log(err);
      res.status(500).json({message: 'Server error'});
  }
});

module.exports = router;