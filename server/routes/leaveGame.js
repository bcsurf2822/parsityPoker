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
      return res
        .status(400)
        .json({ message: "You are not sitting in this game!" });
    }

    user.accountBalance += playerSeat.player.chips;

    playerSeat.player = null;

    await game.save();
    await user.save();

    // Emit the updated game object to notify the clients
    req.io.emit("playerLeft", game);

    res.status(200).json({ message: "Successfully left the game!", game });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
