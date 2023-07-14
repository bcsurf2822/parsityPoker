const router = require("express").Router();

const Games = require("../models/gamesSchema");
const Table = require("../models/tableSchema");
const User = require("../models/userSchema");

router.post("/games/join/:id", async (req, res) => {
  try {
    const game = await Games.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    let table = await Table.findOne({ game: game._id });

    if (!table) {
      return res.status(404).json({ message: "Table not found for this game" });
    }

    // Fetch the user who wants to join the game
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is already in the game
    const playerInGame = table.playersInGame.find(player => player.user.toString() === user._id.toString());

    if (playerInGame) {
      return res.status(400).json({ message: "User is already in this game" });
    }

    // Add user to the game
    table.playersInGame.push({
      user: user._id,
      chips: req.body.chips, // Assuming you provide the amount of chips in the request
      handCards: [], 
      bet: 0, 
    });

    await table.save();

    res.status(200).json({ message: "Successfully joined the game.", table });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
