const router = require('express').Router();
const Game = require("../models/gamesSchema");
const User = require("../models/userSchema");

router.post('/join/:gameId/:seatId', async (req, res) => {    
  try {
    // ... (existing code)

    // Convert seatId and seat._id to strings for comparison
    const availableSeat = game.seats.find(seat => seat._id.toString() === seatId && seat.player === null);
    console.log('availableSeat:', availableSeat);
    
    user.accountBalance -= buyIn;
  
    const player = { user: user._id, chips: buyIn, handCards: [], bet: 0 };
    game.playersInGame.push(player); // Add the player to the playersInGame array
    availableSeat.player = player;
    
    await game.save();
    await user.save();

    res.status(200).json({ message: "Successfully joined the game!", game });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post('/leave/:gameId/:userId', async (req, res) => {
  try {
    const { gameId, userId } = req.params;

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Find the seat where the user is sitting
    const seatIndex = game.seats.findIndex(seat => seat.player && seat.player.user.toString() === userId);

    if (seatIndex === -1) {
      return res.status(400).json({ message: "User is not sitting at any seat in this game!" });
    }

    // Return the chips to the user's account balance
    const chips = game.seats[seatIndex].player.chips;
    user.accountBalance += chips;

    // Remove the player from the game and the playersInGame array
    const playerIndex = game.playersInGame.findIndex(player => player.user.toString() === userId);
    if (playerIndex !== -1) {
      game.playersInGame.splice(playerIndex, 1);
    }

    game.seats[seatIndex].player = null;

    await game.save();
    await user.save();

    res.status(200).json({ message: "Successfully left the game!", game });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;