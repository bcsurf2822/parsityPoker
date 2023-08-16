const router = require("express").Router();
const axios = require("axios");
const Game = require("../models/gamesSchema");

router.get("/winner/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    console.log(`Received request to determine winner for game ID: ${gameId}`);

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    const communityCards = game.communityCards.join(',');

    const occupiedSeats = game.seats.filter(seat => seat.player && seat.player.handCards.length);
    const playerCards = occupiedSeats.map(seat => seat.player.handCards.join(',')).map(cards => `pc[]=${cards}`).join('&');

    const url = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${communityCards}&${playerCards}`;

    const response = await axios.get(url);

    if (response && response.data) {
      game.winnerData = response.data;

      // Determine the winning seats based on API's response
      const winnerIndices = response.data.winners.map(winner => response.data.players.findIndex(player => player.cards === winner.cards));
      
      // Number of winners
      const numberOfWinners = winnerIndices.length;

      // Split pot amongst winners
      const chipsPerWinner = game.pot / numberOfWinners;

      for (const index of winnerIndices) {
        const winningSeat = occupiedSeats[index];
        winningSeat.player.chips += chipsPerWinner;
      }

      // Reset the pot
      game.pot = 0;

      await game.save();
      req.io.emit("winner", game);
    }

    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to determine the winner" });
  }
});

module.exports = router;
