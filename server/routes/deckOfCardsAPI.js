const router = require("express").Router();
const axios = require("axios");
const Game = require("../models/gamesSchema");

//https://www.deckofcardsapi.com/

router.get('/new-deck/:playerCount', async (req, res) => {
  const { playerCount } = req.params;
  try {
    const response = await axios.get('https://www.deckofcardsapi.com/api/deck/new/draw/?count=52');
    const currentGameCards = response.data.cards;

    const playersInGame = [];
    for (let i = 0; i < playerCount; i++) {
      playersInGame[i] = {
        handCards: currentGameCards.splice(0, 2),
      };
    }

    const game = new Game({
      currentGameCards,
      playersInGame,
    });
    await game.save();

    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create new deck and draw cards' });
  }
});

module.exports = router;