const router = require('express').Router();
const Game = require("../models/gamesSchema");
const User = require("../models/userSchema");

router.post('/join/:gameId/:seatId', async (req, res) => {    try {
    console.log("Request params: ", req.params);
    console.log("Request body: ", req.body);
      const { userId, buyIn } = req.body;
      console.log("userId: ", userId);
      const game = await Game.findById(req.params.gameId);
      
      if(!game) {
        return res.status(404).json({ message: "Game not found!" });
      }
  
      const user = await User.findById(userId);
      
      if(!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      
      if(user.accountBalance < buyIn) {
        return res.status(400).json({ message: "Insufficient funds!" });
      }
  
      const { seatId } = req.params;
      console.log('seatId:', seatId);
      
      // Convert seatId and seat._id to strings for comparison
      const availableSeat = game.seats.find(seat => seat._id.toString() === seatId && seat.player === null);
      console.log('availableSeat:', availableSeat);
      
      user.accountBalance -= buyIn;

      
  
      const player = { user: user._id, chips: buyIn, handCards: [], bet: 0 };
      game.playersInGame.push(player);
      availableSeat.player = player;
      
      await game.save();
      await user.save();
  
      res.status(200).json({ message: "Successfully joined the game!", game });
    } catch (err) {
        console.error(err); // Log the whole error object, not just the message.
        res.status(500).json({ message: err.message });
      }
  });

module.exports = router;