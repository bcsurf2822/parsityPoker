const router = require("express").Router();
const Game = require("../models/gamesSchema");
const User = require("../models/userSchema");

// Helper function to check if seat is available
const isSeatAvailable = (seats, seatId) => {
  return seats.some(seat => seat._id.toString() === seatId && !seat.player);
}

router.post("/join/:gameId/:seatId", async (req, res) => {
  try {
    const { userId, buyIn } = req.body;
    const { gameId, seatId } = req.params;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: "Game not found!" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    // Check buy-in amount
    if (buyIn < game.min || buyIn > game.max || !buyIn || typeof buyIn !== "number") {
      return res.status(400).json({ message: `Invalid buy-in. Buy-in should be between ${game.min} and ${game.max}.` });
    }

    if (user.accountBalance < buyIn) return res.status(400).json({ message: "Insufficient funds!" });

    if (game.seats.some(seat => seat.player && seat.player.user.toString() === userId)) {
      return res.status(400).json({ message: "You are already sitting at a seat in this game!" });
    }

    if (!isSeatAvailable(game.seats, seatId)) {
      return res.status(400).json({ message: "Seat not available or does not exist!" });
    }

    // Update user balance and seat
    user.accountBalance -= buyIn;
    const player = {
      user: user._id,
      username: user.username,
      chips: buyIn,
      handCards: [],
      bet: 0
    };
    game.seats.find(seat => seat._id.toString() === seatId).player = player;

    await game.save();
    await user.save();
    
    req.io.emit("playerJoin", {
      gameId,
      player,
      seatId
    });

    res.status(200).json({ message: "Successfully joined the game!", game });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


// router.post("/join/:gameId/:seatId", async (req, res) => {
//   try {
//     const { userId, buyIn } = req.body;
//     console.log("userId: ", userId);
//     console.log("req.body:", req.body);
//     console.log("buy In:", buyIn);
//     const game = await Game.findById(req.params.gameId);

//     if (!game) {
//       return res.status(404).json({ message: "Game not found!" });
//     }

//     if (buyIn < game.min || buyIn > game.max) {
//       return res.status(400).json({
//         message:
//           "Invalid buy-in. Buy-in should be between " +
//           game.min +
//           " and " +
//           game.max +
//           ".",
//       });
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     if (user.accountBalance < buyIn) {
//       return res.status(400).json({ message: "Insufficient funds!" });
//     }

//     if (!buyIn || typeof buyIn !== "number") {
//       return res.status(400).json({ message: "Invalid buy-in amount." });
//     }

//     const alreadySitting = game.seats.some(
//       (seat) => seat.player && seat.player.user.toString() === userId
//     );

//     if (alreadySitting) {
//       return res
//         .status(400)
//         .json({ message: "You are already sitting at a seat in this game!" });
//     }

//     const { seatId } = req.params;
//     console.log("seatId:", seatId);

//     const availableSeat = game.seats.find(
//       (seat) => seat._id.toString() === seatId && seat.player === null
//     );

//     if (!availableSeat) {
//       return res.status(400).json({ message: "Seat not available or does not exist!" });
//     }

//     user.accountBalance -= buyIn;

//     console.log("user after buy in", user);

//     const player = { user: user._id, chips: buyIn, handCards: [], bet: 0 };
//     availableSeat.player = player;

//     await game.save();
//     await user.save();

//     req.io.emit("playerJoined", game);

//     res.status(200).json({ message: "Successfully joined the game!", game });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });
