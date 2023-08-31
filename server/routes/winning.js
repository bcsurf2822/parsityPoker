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

    // Check if all players have checkBetFold set to true and game.stage is showdown
    const allPlayersChecked = game.seats.every(seat => seat.player && seat.player.checkBetFold === true);
    if (!allPlayersChecked || game.stage !== 'showdown') {
      return res.status(400).json({ message: "Conditions not met for determining the winner" });
    }

    const communityCards = game.communityCards.join(",");

    const occupiedSeats = game.seats.filter(
      (seat) => seat.player && seat.player.handCards.length
    );
    const playerCards = occupiedSeats
      .map((seat) => seat.player.handCards.join(","))
      .map((cards) => `pc[]=${cards}`)
      .join("&");

    const url = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${communityCards}&${playerCards}`;

    const response = await axios.get(url);

    if (response && response.data) {
      game.winnerData = response.data;

      const winnerIndices = response.data.winners.map((winner) =>
        response.data.players.findIndex(
          (player) => player.cards === winner.cards
        )
      );

      const numberOfWinners = winnerIndices.length;

      const chipsPerWinner = game.pot / numberOfWinners;

      for (const index of winnerIndices) {
        const winningSeat = occupiedSeats[index];
        winningSeat.player.chips += chipsPerWinner;
      }

      game.pot = 0;
      game.gameEnd = true;

      await game.save();
      req.io.emit("winner", game);
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to determine the winner" });
  }
});


router.get("/games/:gameId/potToPlayer", async (req, res) => {
  const { gameId } = req.params;

  try {
    console.log(
      `Received request to transfer pot for game ID: ${gameId} to the remaining player`
    );

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    // Filter out all seats that have a player with hand cards
    const occupiedSeats = game.seats.filter(
      (seat) => seat.player && seat.player.handCards.length
    );

    // If there's more than one player remaining, it's ambiguous who to award the pot to
    if (occupiedSeats.length !== 1) {
      return res
        .status(400)
        .json({
          message:
            "There is more than one player remaining. Can't determine who to transfer the pot to.",
        });
    }

    const remainingSeat = occupiedSeats[0];
    remainingSeat.player.chips += game.pot;

    game.winnerData = {
      players: [
        {
          cards: remainingSeat.player.handCards.join(","),
          chips: remainingSeat.player.chips,
          seatId: remainingSeat._id,
        },
      ],
      winners: [
        {
          cards: remainingSeat.player.handCards.join(","),
          chips: remainingSeat.player.chips,
          seatId: remainingSeat._id,
        },
      ],
      reason: "Last remaining player awarded the pot", // Additional context
    };

    game.pot = 0;
    game.gameEnd = true;

    await game.save();
    req.io.emit("pot_transfer", game);

    res.json({
      message: `Pot transferred to the remaining player in seat: ${remainingSeat._id}.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to transfer the pot" });
  }
});

module.exports = router;
