const router = require("express").Router();
const axios = require("axios");

//https://www.deckofcardsapi.com/

router.get('/api/new-deck/:playerCount', async (req, res) => {
  const { playerCount } = req.params;
  try {

    const response = await axios.get('https://www.deckofcardsapi.com/api/deck/new/draw/?count=52');
    const cards = response.data.cards;

    const players = [];
    for (let i = 0; i < playerCount; i++) {
      players[i] = cards.slice(i * Math.floor(52 / playerCount), (i + 1) * Math.floor(52 / playerCount));
    }

    res.json({ playersInGame });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create new deck and draw cards' });
  }
});


module.exports = router;