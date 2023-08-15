const router = require("express").Router();
const axios = require("axios");

const Game = require("../models/gamesSchema");

function cardCode(code) {
  return code.replace('0', '10');
}



router.get("/new-deck/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    console.log(`Received request to get new deck for game ID: ${gameId}`);

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    game.currentDeck = [];
    game.seats.forEach((seat) => {
      if (seat.player) {
        seat.player.handCards = [];
      }
    });

    const response = await axios.get(
      "https://www.deckofcardsapi.com/api/deck/new/draw/?count=52"
    );


    const currentGameCards = response.data.cards.map((card) => ({
      value: card.value,
      suit: card.suit,
      code: cardCode(card.code)
    }));

    game.currentDeck = currentGameCards;

    await game.save();

    req.io.emit("new_deck", game);

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create new deck and draw cards" });
  }
});

module.exports = router;