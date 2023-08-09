const router = require("express").Router();
const axios = require("axios");

const Game = require("../models/gamesSchema");

router.get("/new-deck/:gameId/:playerCount", async (req, res) => {
  const { gameId, playerCount } = req.params;

  if (playerCount < 2) {
    return res
      .status(400)
      .json({ error: "At least 2 players are required to create a new game" });
  }

  try {
    const response = await axios.get(
      "https://www.deckofcardsapi.com/api/deck/new/draw/?count=52"
    );
    const currentGameCards = response.data.cards.map((card) => ({
      value: card.value,
      suit: card.suit,
      code: card.code,
    }));

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    game.currentGameCards = currentGameCards;
    await game.save();
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create new deck and draw cards" });
  }
});

module.exports = router;
