const router = require("express").Router();
const Game = require("../models/gamesSchema");
const User = require("../models/userSchema");

router.post("/logout/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const games = await Game.find();

    for (let game of games) {
      const seatIndex = game.seats.findIndex(
        (seat) => seat.player && seat.player.user.toString() === userId
      );

      if (seatIndex !== -1) {
        const chips = game.seats[seatIndex].player.chips;
        user.accountBalance += chips;

        const playerIndex = game.playersInGame.findIndex(
          (player) => player.user.toString() === userId
        );
        if (playerIndex !== -1) {
          game.playersInGame.splice(playerIndex, 1);
        }

        game.seats[seatIndex].player = null;

        await game.save();
      }
    }

    await user.save();

    res.clearCookie("authToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
