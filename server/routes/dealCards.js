const router = require("express").Router();
const Game = require("../models/gamesSchema");

//Deal to Players
router.post("/deal-cards/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    const numberOfPlayers = game.playersInGame.length;
    const cardsToDeal = numberOfPlayers * 2;

    if (cardsToDeal > game.currentGameCards.length) {
      return res.status(400).json({ message: "Not enough cards to deal!" });
    }

    for (let i = 0; i < numberOfPlayers; i++) {
      const player = game.playersInGame[i];
      const cardsForPlayer = game.currentGameCards.splice(0, 2);

      player.handCards = cardsForPlayer.map((card) => card.code);
      game.dealtCards.push(...player.handCards);
    }

    await game.save();

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

    const burnCard = game.currentGameCards.splice(0, 1);
    game.dealtCards.push(...burnCard);

    const flopCards = game.currentGameCards.splice(0, 3);

    game.communityCards = flopCards;

    game.dealtCards.push(...flopCards.map((card) => card.code));

    await game.save();

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

    if (game.currentGameCards.length < 2) {
      return res
        .status(400)
        .json({ message: "Not enough cards to deal the turn!" });
    }

    const burntCard = game.currentGameCards.shift();
    game.dealtCards.push(burntCard);

    const turnCard = game.currentGameCards.shift();
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

    if (game.currentGameCards.length < 2) {
      return res
        .status(400)
        .json({ message: "Not enough cards to deal the river!" });
    }

    const burntCard = game.currentGameCards.shift();
    game.dealtCards.push(burntCard);

    const riverCard = game.currentGameCards.shift();
    game.dealtCards.push(riverCard);
    game.communityCards.push(riverCard);

    await game.save();

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to deal the river" });
  }
});

module.exports = router;
