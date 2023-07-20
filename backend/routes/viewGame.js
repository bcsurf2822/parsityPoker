const router = require('express').Router();
const Game = require("../models/gamesSchema");

router.get("/games/view/:id", async (req, res) => {
    try {
      const game = await Game.findById(req.params.id);
  
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
  
      // Now, instead of finding a table, we directly return the game information
      res.status(200).json({ message: "Viewed game successfully.", game: game });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
    }
  });

module.exports = router;