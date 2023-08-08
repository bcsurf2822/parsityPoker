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

    // Any remaining cards can be handled as you see fit (e.g., a common draw pile)

    res.json({ players });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create new deck and draw cards' });
  }
});

//Back of Card Image to be referenced in frontend
// https://www.deckofcardsapi.com/static/img/back.png

module.exports = router;