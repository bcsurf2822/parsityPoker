module.exports = (io) => {
  const router = require('express').Router();
const Game = require("../models/gamesSchema");
const User = require("../models/userSchema");

router.post('/join/:gameId/:seatId', async (req, res) => {    
  try {
    const { userId, buyIn } = req.body;
    console.log("userId: ", userId);
    console.log('req.body:', req.body);
    console.log('buy In:', buyIn);
    const game = await Game.findById(req.params.gameId);
    
    if(!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    if (buyIn < game.min || buyIn > game.max) {
      return res.status(400).json({ message: "Invalid buy-in. Buy-in should be between " + game.min + " and " + game.max + "." });
    }

    const user = await User.findById(userId);
    
    if(!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    
    if(user.accountBalance < buyIn) {
      return res.status(400).json({ message: "Insufficient funds!" });
    }

    if (!buyIn || typeof buyIn !== 'number') {
      return res.status(400).json({ message: "Invalid buy-in amount." });
    }

    const alreadySitting = game.seats.some(seat => seat.player && seat.player.user.toString() === userId);

    if(alreadySitting) {
      return res.status(400).json({ message: "You are already sitting at a seat in this game!" });
    }

    const { seatId } = req.params;
    console.log('seatId:', seatId);
    
    const availableSeat = game.seats.find(seat => seat._id.toString() === seatId && seat.player === null);
    console.log('availableSeat:', availableSeat);
    
    user.accountBalance -= buyIn;

    console.log("user after buy in", user)
  
    const player = { user: user._id, chips: buyIn, handCards: [], bet: 0 };
    game.playersInGame.push(player);
    availableSeat.player = player;
    
    await game.save();
    await user.save();
    
    // Emit the seatChange event after successful join
    io.emit('seatChange', game.seats); // Replace with actual seats object or seatId which has changed
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

    const seatIndex = game.seats.findIndex(seat => seat.player && seat.player.user.toString() === userId);

    if (seatIndex === -1) {
      return res.status(400).json({ message: "User is not sitting at any seat in this game!" });
    }

    const chips = game.seats[seatIndex].player.chips;
    user.accountBalance += chips;

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

return router;
};