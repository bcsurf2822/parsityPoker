const router = require("express").Router();
const Game = require("../models/gamesSchema");

router.put("/game/:gameId/toPot", async (req, res) => {
  const { gameId } = req.params;
  const { seatId, bet } = req.body;
  const betAmount = Number(bet);
  console.log(`Received request for gameId: ${gameId}, seatId: ${seatId}, betAmount: ${betAmount}`);

  if (!betAmount || isNaN(betAmount)) {
      console.error(`Invalid betAmount received: ${betAmount}`);
      return res.status(400).json({ message: "Invalid bet amount!" });
  }

  try {
      const game = await Game.findById(gameId);

      if (!game) {
          console.log(`Game with id ${gameId} not found!`);
          return res.status(404).json({ message: "Game not found!" });
      }

      const seat = game.seats.find(s => {
        console.log(`Comparing seatId ${seatId} with s._id ${s._id.toString()}`);
        return s._id.toString() === seatId;
      });
    
    if (!seat) {
        return res.status(400).json({ message: "Seat not found!" });
    }

      if (!seat.player) {
          return res.status(400).json({ message: "No player at the seat!" });
      }

      if (seat.player.chips < betAmount) {
          console.log(`Player at seat ${seatId} in game ${gameId} has insufficient chips. Current chips: ${seat.player.chips}, Bet amount: ${betAmount}`);
          return res.status(400).json({ message: "Insufficient chips!" });
      }

 

      seat.player.chips -= betAmount;
      game.pot += betAmount;
      await game.save();

      res.json(game);
      req.io.emit("bet_placed", game);

  } catch (error) {
      console.error(`Error while handling bet for gameId: ${gameId}. Error: ${error.message}`);
      res.status(500).json({ error: "Failed to handle the bet" });
  }
});


router.put("/chips/:gameId/getPot", async (req, res) => {
  const { gameId } = req.params;
  const { seatId } = req.body;

  try {
      const game = await Game.findById(gameId);
      if (!game) {
          return res.status(404).json({ message: "Game not found!" });
      }

      // Get the seat from the game.
      const seat = game.seats.find(s => s.id === seatId);

      // Check if the seat has a player.
      if (!seat.player) {
          return res.status(400).json({ message: "No player at the specified seat!" });
      }

      // Add the pot to the player's chips and set the pot to zero.
      seat.player.chips += game.pot;
      game.pot = 0;

      // Save the updated game to the database.
      await game.save();

      // Send the updated game as the response.
      res.json(game);
      req.io.emit("pot_transfer", game);


  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to handle the pot collection" });
  }
});

module.exports = router;