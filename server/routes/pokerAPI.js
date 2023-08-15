const router = require("express").Router();
const axios = require("axios");

const Game = require("../models/gamesSchema");


router.get("/determine-winner/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    console.log(`Received request to determine winner for game ID: ${gameId}`);

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }


    const communityCards = game.currentGame.communityCards.join(',');


    const playerCards = game.seats
      .filter(seat => seat.player && seat.player.handCards.length)
      .map(seat => seat.player.handCards.join(','))
      .map(cards => `pc[]=${cards}`)
      .join('&');

    const url = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${communityCards}&${playerCards}`;


    const response = await axios.get(url);
    const winnerData = response.data;


    res.json(winnerData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to determine the winner" });
  }
});

module.exports = router;