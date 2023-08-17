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

    const findFirstOccupiedSeat = (startPosition = 0) => {
      let nextPosition = startPosition;
      while (!seats[nextPosition].player) {
        nextPosition = (nextPosition + 1) % seatCount;
        if (nextPosition === startPosition) break;
      }
      return nextPosition;
    };

    if (game.dealerPosition === 0 && !seats[0].player) {
      game.dealerPosition = findFirstOccupiedSeat();
    } else {
      game.dealerPosition = findFirstOccupiedSeat(game.dealerPosition);
    }
    game.smallBlindPosition = findFirstOccupiedSeat(game.dealerPosition);
    game.bigBlindPosition = findFirstOccupiedSeat(game.smallBlindPosition);

    console.log(
      `Game after update:\nDealer Position: ${game.dealerPosition}\nSmall Blind Position: ${game.smallBlindPosition}\nBig Blind Position: ${game.bigBlindPosition}`
    );

    const [smallBlindAmount, bigBlindAmount] = game.blinds
      .split("/")
      .map(Number);

    seats[game.smallBlindPosition].player.chips -= smallBlindAmount;
    seats[game.bigBlindPosition].player.chips -= bigBlindAmount;

    game.pot += smallBlindAmount + bigBlindAmount;

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

const findNextPosition = (currentTurn) => {
  let nextPosition = (currentTurn + 1) % seatCount;
  while (!seats[nextPosition].player) {
    nextPosition = (nextPosition + 1) % seatCount;
  }
  return nextPosition;
};

router.post("/:gameId/updateCurrentPlayer", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).send("Game not found!");
    }

    game.currentPlayerTurn = findNextPosition(game.currentPlayerTurn);

    await game.save();

    req.io.emit("current_player", game);
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
