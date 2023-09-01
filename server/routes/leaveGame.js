const router = require("express").Router();
const Game = require("../models/gamesSchema");
const User = require("../models/userSchema");

router.post("/leave/:gameId/:userId", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const userId = req.params.userId;

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const playerSeat = game.seats.find(
      (seat) => seat.player && seat.player.user.toString() === userId
    );

    if (!playerSeat) {
      return res.status(400).json({ message: "You are not sitting in this game!" });
    }

    user.accountBalance += playerSeat.player.chips;
    playerSeat.player = null;

    await user.save();

    const remainingPlayers = game.seats.filter(seat => seat.player !== null);
    
    if (remainingPlayers.length === 1) {
      const lastPlayer = remainingPlayers[0].player;
      lastPlayer.chips += game.pot;
      game.pot = 0;


      game.currentDeck = [];
      game.communityCards = [];
      game.dealtCards = [];
      game.winnerData = [];
      game.stage = "preflop";
      game.gameEnd = false;
      game.dealerPosition = -1;
      game.smallBlindPosition = -1;
      game.bigBlindPosition = -1;
      game.currentPlayerTurn = -1;

      req.io.emit("game_ended", game);
    }

    await game.save();

    req.io.emit("playerLeft", game);

    res.status(200).json({ message: "Successfully left the game!", game });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
