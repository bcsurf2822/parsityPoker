const router = require("express").Router();
const Game = require("../models/gamesSchema");
const User = require("../models/userSchema");

const findNextPosition = (startPosition, seats) => {
  let seatCount = seats.length;
  let nextPosition = (startPosition + 1) % seatCount;
  while (!seats[nextPosition].player) {
    nextPosition = (nextPosition + 1) % seatCount;
  }
  return nextPosition;
};

router.post("/join/:gameId/:seatId", async (req, res) => {
  try {
    const { userId, buyIn } = req.body;
    console.log("userId: ", userId);
    console.log("req.body:", req.body);
    console.log("buy In:", buyIn);
    const game = await Game.findById(req.params.gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    if (buyIn < game.min || buyIn > game.max) {
      return res.status(400).json({
        message:
          "Invalid buy-in. Buy-in should be between " +
          game.min +
          " and " +
          game.max +
          ".",
      });
    }
    console.log(
      "Joining route triggered for game:",
      req.params.gameId,
      "and seat:",
      req.params.seatId
    );

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.accountBalance < buyIn) {
      return res.status(400).json({ message: "Insufficient funds!" });
    }

    if (!buyIn || typeof buyIn !== "number") {
      return res.status(400).json({ message: "Invalid buy-in amount." });
    }

    const alreadySitting = game.seats.some(
      (seat) => seat.player && seat.player.user.toString() === userId
    );

    if (alreadySitting) {
      return res
        .status(400)
        .json({ message: "You are already sitting at a seat in this game!" });
    }

    const { seatId } = req.params;
    console.log("seatId:", seatId);

    const availableSeat = game.seats.find(
      (seat) => seat._id.toString() === seatId && seat.player === null
    );

    if (!availableSeat) {
      return res
        .status(400)
        .json({ message: "Seat not available or does not exist!" });
    }

    user.accountBalance -= buyIn;

    console.log("user after buy in", user);

    const player = {
      user: user._id,
      username: user.username,
      chips: buyIn,
      handCards: [],
      bet: 0,
    };
    availableSeat.player = player;

    await game.save();
    await user.save();

    // req.io.emit("playerJoined", game);
    req.io.emit("gameUpdated", game);
    console.log("Game updated emitted for game:", req.params.gameId);

    const numOfPlayers = game.seats.filter(
      (seat) => seat.player !== null
    ).length;

    if (numOfPlayers === 2) {
      req.io.emit("game_starting", { countdown: 5 });
      try {
        console.log(
          `Starting updatePostionsAndBlinds for game ${req.params.gameId}`
        );

        game.dealerPosition = findNextPosition(game.dealerPosition, game.seats);
        game.smallBlindPosition = findNextPosition(
          game.dealerPosition,
          game.seats
        );
        game.bigBlindPosition = findNextPosition(
          game.smallBlindPosition,
          game.seats
        );
        game.currentPlayerTurn = findNextPosition(
          game.bigBlindPosition,
          game.seats
        );

        const [smallBlindAmount, bigBlindAmount] = game.blinds
          .split("/")
          .map(Number);

        for (let seat of game.seats) {
          if (seat.player) {
            seat.player.checkBetFold = false;
          }
        }

        if (game.seats[game.smallBlindPosition].player) {
          game.seats[game.smallBlindPosition].player.chips -= smallBlindAmount;
          game.pot += smallBlindAmount;
        }

        if (game.seats[game.bigBlindPosition].player) {
          game.seats[game.bigBlindPosition].player.chips -= bigBlindAmount;
          game.pot += bigBlindAmount;
        }

        await game.save();

        console.log(`Updated positions and blinds for game ${req.params.gameId}. 
                     Dealer: ${game.dealerPosition}, 
                     Small Blind: ${game.smallBlindPosition}, 
                     Big Blind: ${game.bigBlindPosition}, 
                     Current Turn: ${game.currentPlayerTurn}`);

        console.log(
          "Emitting positions_and_blinds for game:",
          req.params.gameId
        );
        //  req.io.emit("positions_and_blinds", game);
        req.io.emit("gameUpdated", game);
        console.log(
          "Game updated emitted POS AND BLINDS for game:",
          req.params.gameId
        );

        if (numOfPlayers * 2 > game.currentDeck.length) {
          return res
            .status(400)
            .json({ message: "Not enough cards in the deck to deal!" });
        }

        const seatsWithPlayers = game.seats.filter(
          (seat) => seat.player !== null
        );

        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < numOfPlayers; j++) {
            const playerIndex = (game.bigBlindPosition + 1 + j) % numOfPlayers;
            const seat = seatsWithPlayers[playerIndex];
            const card = game.currentDeck.shift();
            if (card) {
              seat.player.handCards.push(card.code);
            }
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await game.save();
        //  req.io.emit("cards_dealt", game);
        req.io.emit("gameUpdated", game);
        console.log(
          "Game updated emittedCARDS DEALT for game:",
          req.params.gameId
        );
      } catch (error) {
        console.error(
          `Error updating positions and blinds for game ${req.params.gameId}:`,
          error
        );
        return res.status(500).json({ message: error.message });
      }
    }
    console.log("Join route completed for game:", req.params.gameId);

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
