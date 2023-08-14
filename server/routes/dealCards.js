const router = require("express").Router();
const Game = require("../models/gamesSchema");

router.post("/deal-cards/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    // Determine the number of players and validate
    const seatsWithPlayers = game.seats.filter(seat => seat.player !== null);
    const numberOfPlayers = seatsWithPlayers.length;

    if (numberOfPlayers * 2 > game.currentDeck.length) {
      return res.status(400).json({ message: "Not enough cards to deal!" });
    }

    // Initialize handCards for each player
    game.seats.forEach(seat => {
      if (seat.player) {
        seat.player.handCards = [];
      }
    });

    // Deal one card to each player at a time
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < numberOfPlayers; j++) {
        const playerIndex = (game.bigBlindPosition + 1 + j) % numberOfPlayers; // Start with the player after the big blind
        const seat = seatsWithPlayers[playerIndex];
        const card = game.currentDeck.shift(); // Take the top card

        seat.player.handCards.push(card.code);
      }
    }

    await game.save();
    req.io.emit('cards_dealt', game);
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to deal cards" });
  }
});

//Deal Flop
router.put("/flop/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    const burnCard = game.currentDeck.splice(0, 1);
    game.dealtCards.push(...burnCard);

    const flopCards = game.currentDeck.splice(0, 3);

    game.communityCards = flopCards;

    game.dealtCards.push(...flopCards.map((card) => card.code));

    await game.save();
    req.io.in(gameId).emit('cards_dealt', game);

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to deal the flop" });
  }
});

//Deal Turn
router.post("/turn/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    if (game.currentDeck.length < 2) {
      return res
        .status(400)
        .json({ message: "Not enough cards to deal the turn!" });
    }

    const burntCard = game.currentDeck.shift();
    game.dealtCards.push(burntCard);

    const turnCard = game.currentDeck.shift();
    game.dealtCards.push(turnCard);
    game.communityCards.push(turnCard);

    await game.save();

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to deal the turn" });
  }
});

//Deal River
router.post("/deal-river/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    if (game.currentDeck.length < 2) {
      return res
        .status(400)
        .json({ message: "Not enough cards to deal the river!" });
    }

    const burntCard = game.currentDeck.shift();
    game.dealtCards.push(burntCard);

    const riverCard = game.currentDeck.shift();
    game.dealtCards.push(riverCard);
    game.communityCards.push(riverCard);

    await game.save();
    req.io.in(gameId).emit('cards_dealt', game);

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to deal the river" });
  }
});

router.post("/endgame/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    game.currentDeck = [];
    game.communityCards = [];

    game.seats.forEach(seat => {
      if (seat.player) {
        seat.player.handCards = [];
      }
    });

    await game.save();

    res.json({ message: "Game ended, cards cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to end the game" });
  }
});

module.exports = router;