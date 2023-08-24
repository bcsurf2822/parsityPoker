const router = require("express").Router();
const Game = require("../models/gamesSchema");

router.put("/game/:gameId/toPot", async (req, res) => {
    const { gameId } = req.params;
    const { seatId, bet, action } = req.body;
    let betAmount;
  
    try {
        const game = await Game.findById(gameId);
  
        if (!game) {
            return res.status(404).json({ message: "Game not found!" });
        }
  
        const seat = game.seats.find(s => s._id.toString() === seatId);
      
        if (!seat) {
            return res.status(400).json({ message: "Seat not found!" });
        }
  
        if (!seat.player) {
            return res.status(400).json({ message: "No player at the seat!" });
        }
  
        switch (action) {
          case 'call':
              const highestBet = Math.max(...game.seats.map(s => s.player ? s.player.bet : 0));
              betAmount = highestBet - seat.player.bet;
              if (betAmount <= 0) {
                  return res.status(400).json({ message: "Player has already matched or exceeded the highest bet." });
              }
      
              // Check if player has less chips than required to call
              if (seat.player.chips < betAmount) {
                  betAmount = seat.player.chips;  // Set betAmount to player's total chips
              }
              break;
      
          case 'all-in':
              betAmount = seat.player.chips;
              break;
      
          case 'bet':
              betAmount = Number(bet);
              if (!betAmount || isNaN(betAmount)) {
                  return res.status(400).json({ message: "Invalid bet amount!" });
              }
              break;
      
          default:
              return res.status(400).json({ message: "Invalid action type!" });
      }
      

      if (seat.player.chips < betAmount && action !== 'call') {
          return res.status(400).json({ message: "Insufficient chips!" });
      }
  
        seat.player.chips -= betAmount;
        game.pot += betAmount;
        seat.player.bet += betAmount; 
        seat.player.checkBetFold = true;
  
        await game.save();
  
        res.json(game);
        req.io.emit("bet_placed", game);
  
    } catch (error) {
        console.error(`Error while handling bet for gameId: ${gameId}. Error: ${error.message}`);
        res.status(500).json({ error: "Failed to handle the bet" });
    }
  });
  
  router.put("/game/:gameId/check", async (req, res) => {
    const { gameId } = req.params;
    const { seatId } = req.body;
  
    try {
      const game = await Game.findById(gameId);
  
      if (!game) {
        return res.status(404).json({ message: "Game not found!" });
      }
  
      const seat = game.seats.find(s => s._id.toString() === seatId);
  
      if (!seat) {
        return res.status(400).json({ message: "Seat not found!" });
      }
  
      if (!seat.player) {
        return res.status(400).json({ message: "No player at the seat!" });
      }
  
      seat.player.checkBetFold = true;
  
      await game.save();
  
      res.json(game);
      req.io.emit("check", game);
  
    } catch (error) {
      console.error(`Error during check action for gameId: ${gameId}. Error: ${error.message}`);
      res.status(500).json({ error: "Failed to handle the check" });
    }
  });

  router.put("/game/:gameId/fold", async (req, res) => {
    const { gameId } = req.params;
    const { seatId } = req.body;
  
    try {
      const game = await Game.findById(gameId);
  
      if (!game) {
        return res.status(404).send({ message: "Game not found" });
      }
  
      const seat = game.seats.find(s => s._id.toString() === seatId);
  
      if (!seat) {
        return res.status(404).send({ message: "Seat not found" });
      }
  
      if (!seat.player) {
        return res.status(404).send({ message: "No player at the seat!" });
      }
  
      seat.player.handCards = [];
      seat.player.checkBetFold = true;
  
      await game.save();
      req.io.emit("fold", game);
  
      res.status(200).send({ message: "Folded successfully" });
    } catch (error) {
      console.error("Error folding:", error);
      res.status(500).send({ message: "Server error" });
    }
  });

module.exports = router;
