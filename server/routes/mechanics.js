const router = require("express").Router();
const Game = require("../models/gamesSchema");

router.post("/:gameId/updatePostionsAndBlinds", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).send("Game not found!");
    }

    console.log(
      `Game before update:\nDealer Position: ${game.dealerPosition}\nSmall Blind Position: ${game.smallBlindPosition}\nBig Blind Position: ${game.bigBlindPosition}`
    );

    const seats = game.seats;
    const seatCount = seats.length;

    const findNextOccupiedSeat = (currentPosition) => {
      let nextPosition = (currentPosition + 1) % seatCount;
      while (!seats[nextPosition].player) {
        nextPosition = (nextPosition + 1) % seatCount;
      }
      return nextPosition;
    };

    game.dealerPosition = findNextOccupiedSeat(game.dealerPosition);
    game.smallBlindPosition = findNextOccupiedSeat(game.dealerPosition);
    game.bigBlindPosition = findNextOccupiedSeat(game.smallBlindPosition);

    console.log(
      `Game after update:\nDealer Position: ${game.dealerPosition}\nSmall Blind Position: ${game.smallBlindPosition}\nBig Blind Position: ${game.bigBlindPosition}`
    );

    const [smallBlindAmount, bigBlindAmount] = game.blinds
      .split("/")
      .map(Number);
    seats[game.smallBlindPosition].player.chips -= smallBlindAmount;
    seats[game.bigBlindPosition].player.chips -= bigBlindAmount;

    console.log(
      `Small Blind Deduction: ${smallBlindAmount}\nBig Blind Deduction: ${bigBlindAmount}`
    );

    await game.save();

    req.io.emit("positions_and_blinds", game);
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
