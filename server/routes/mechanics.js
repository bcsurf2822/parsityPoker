const router = require("express").Router();
const Game = require("../models/gamesSchema");

const findNextPosition = (startPosition, seats) => {
  let seatCount = seats.length;
  let nextPosition = (startPosition + 1) % seatCount;
  while (!seats[nextPosition].player) {
    nextPosition = (nextPosition + 1) % seatCount;
  }
  return nextPosition;
};

router.post("/:gameId/updatePostionsAndBlinds", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).send("Game not found!");
    }

    // for (let seat of game.seats) {
    //   if (seat.player && seat.player.handCards) {
    //     seat.player.handCards = [];
    //   }
    // }

    // game.dealtCards = [];
    // game.communityCards = [];

    game.dealerPosition = findNextPosition(game.dealerPosition, game.seats);
    game.smallBlindPosition = findNextPosition(game.dealerPosition, game.seats);
    game.bigBlindPosition = findNextPosition(game.smallBlindPosition, game.seats);

    game.currentPlayerTurn = findNextPosition(game.bigBlindPosition, game.seats);

    const [smallBlindAmount, bigBlindAmount] = game.blinds
      .split("/")
      .map(Number);

    if (game.seats[game.smallBlindPosition].player) {
      game.seats[game.smallBlindPosition].player.chips -= smallBlindAmount;
      game.pot += smallBlindAmount;
    }

    if (game.seats[game.bigBlindPosition].player) {
      game.seats[game.bigBlindPosition].player.chips -= bigBlindAmount;
      game.pot += bigBlindAmount;
    }

    await game.save();

    req.io.emit("positions_and_blinds", game);
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


router.post("/:gameId/updateCurrentPlayer", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).send("Game not found!");
    }

    game.currentPlayerTurn = findNextPosition(game.currentPlayerTurn, game.seats);

    await game.save();

    req.io.emit("current_player", game);
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

router.post("/endgame/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    game.currentDeck = [];
    game.communityCards = [];
    game.dealtCards = [];
    game.winnerData = [];
    game.pot = 0;

    game.seats.forEach((seat) => {
      if (seat.player) {
        seat.player.handCards = [];
        seat.player.checkBetFold = false; 
      }
    });

    game.dealerPosition = -1
    game.smallBlindPosition = -1
    game.bigBlindPosition = -1
    game.currentPlayerTurn = -1

    await game.save();
    req.io.emit("game_ended", game);

    res.json({ message: "Game ended, cards cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to end the game" });
  }
});


module.exports = router;
