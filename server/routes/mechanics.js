const router = require("express").Router();
const Game = require("../models/gamesSchema");
const axios = require("axios");

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
      console.error(`Game with ID: ${gameId} not found!`);
      return res.status(404).send("Game not found!");
    }

    console.log(`Starting updatePostionsAndBlinds for game ${gameId}`);

    game.dealerPosition = findNextPosition(game.dealerPosition, game.seats);
    game.smallBlindPosition = findNextPosition(game.dealerPosition, game.seats);
    game.bigBlindPosition = findNextPosition(game.smallBlindPosition, game.seats);
    game.currentPlayerTurn = findNextPosition(game.bigBlindPosition, game.seats);

    const [smallBlindAmount, bigBlindAmount] = game.blinds.split("/").map(Number);

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

    console.log(`Updated positions and blinds for game ${gameId}. 
                 Dealer: ${game.dealerPosition}, 
                 Small Blind: ${game.smallBlindPosition}, 
                 Big Blind: ${game.bigBlindPosition}, 
                 Current Turn: ${game.currentPlayerTurn}`);

    console.log("Emitting positions_and_blinds for game:", gameId);
    req.io.emit("positions_and_blinds", game);

    res.status(200).json(game);
  } catch (error) {
    console.error(`Error updating positions and blinds for game ${gameId}:`, error);
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

function cardCode(code) {
  return code.replace('0', '10');
}


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

    game.dealerPosition = -1;
    game.smallBlindPosition = -1;
    game.bigBlindPosition = -1;
    game.currentPlayerTurn = -1;
    game.stage = "preflop"

    // Fetch new deck and populate currentDeck
    const response = await axios.get("https://www.deckofcardsapi.com/api/deck/new/draw/?count=52");

    const currentGameCards = response.data.cards.map((card) => ({
      value: card.value,
      suit: card.suit,
      code: cardCode(card.code)
    }));

    game.currentDeck = currentGameCards;

    await game.save();
    req.io.emit("game_ended", game);

    res.json({ message: "Game ended, cards cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to end the game" });
  }
});


module.exports = router;
