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

    // Step 1: Build the playerCards array.
    const occupiedSeats = game.seats.filter(seat => seat.player && seat.player.handCards.length);
    const playerCards = occupiedSeats.map(seat => seat.player.handCards.join(',')).map(cards => `pc[]=${cards}`).join('&');

    const url = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${communityCards}&${playerCards}`;

    const response = await axios.get(url);

    if (response && response.data) {
      game.winnerData = response.data;

      // Step 2: Use the returned players property to match the winner's cards.
      const winningCards = response.data.winners[0].cards;
      const winnerIndex = response.data.players.findIndex(player => player.cards === winningCards);

      // Step 3: Match the winner's index to the occupied seats' index.
      if (winnerIndex !== -1) {
        const winningSeat = occupiedSeats[winnerIndex];
        game.winnerData.winningSeatId = winningSeat._id;
      }

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
