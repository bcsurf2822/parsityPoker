const router = require("express").Router();
const Game = require("../models/gamesSchema");


router.put("/game/:gameId/bet", async (req, res) => {
  const { gameId } = req.params;
  const { seatId, betAmount } = req.body;

  try {
      // Fetch the game from the database.
      const game = await Game.findById(gameId);
      if (!game) {
          return res.status(404).json({ message: "Game not found!" });
      }

      // Get the seat from the game.
      const seat = game.seats.find(s => s.id === seatId);

      // Check if the seat has a player and enough chips.
      if (!seat.player || seat.player.chips < betAmount) {
          return res.status(400).json({ message: "Insufficient chips or no player at the seat!" });
      }

      // Deduct the chips from the player and add them to the pot.
      seat.player.chips -= betAmount;
      game.pot += betAmount;

      // Save the updated game to the database.
      await game.save();

      // Send the updated game as the response.
      res.json(game);

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to handle the bet" });
  }
});

module.exports = router;