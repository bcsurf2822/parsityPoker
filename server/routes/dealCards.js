const router = require("express").Router();
const Game = require("../models/gamesSchema");

router.post("/deal-cards/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    const seatsWithPlayers = game.seats.filter((seat) => seat.player !== null);
    const numberOfPlayers = seatsWithPlayers.length;

    if (numberOfPlayers * 2 > game.currentDeck.length) {
      return res.status(400).json({ message: "Not enough cards to deal!" });
    }

    game.seats.forEach((seat) => {
      if (seat.player) {
        seat.player.handCards = [];
        seat.player.checkBetFold = false;
      }
    });

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < numberOfPlayers; j++) {
        const playerIndex = (game.bigBlindPosition + 1 + j) % numberOfPlayers;
        const seat = seatsWithPlayers[playerIndex];
        const card = game.currentDeck.shift();

        seat.player.handCards.push(card.code);      }
    }

    await game.save();
    req.io.emit("cards_dealt", game);
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to deal cards" });
  }
});

//Deal Flop
router.post("/flop/:gameId", async (req, res) => {
  const { gameId } = req.params;

  console.log(`Dealing flop for game: ${gameId}`);

  try {
    const game = await Game.findById(gameId);
    console.log(`Retrieved game:`, game);

    if (!game) {
      console.log(`Game with ID: ${gameId} not found.`);
      return res.status(404).json({ message: "Game not found!" });
    }

    game.seats.forEach((seat) => {
      if (seat.player) {
        seat.player.checkBetFold = false;  
      }
    });

    const burnCard = game.currentDeck.splice(0, 1)[0].code;  // Extracting the code
    game.dealtCards.push(burnCard);

    if (game.currentDeck.length < 3) {
      console.log(`Not enough cards left in the deck to deal the flop.`);
      return res.status(400).json({ message: "Not enough cards to deal the flop!" });
    }

    const flopCards = game.currentDeck.splice(0, 3).map(card => card.code);
    game.dealtCards.push(...flopCards);
    game.communityCards.push(...flopCards);

    const savedGame = await game.save();
    console.log(`Game saved successfully:`, savedGame);

    req.io.emit("flop", game);
    console.log(`Emitting flop event with game data.`);

    res.json(game);
  } catch (error) {
    console.error(`Error while dealing the flop:`, error);
    res.status(500).json({ error: "Failed to deal the flop" });
  }
});


//Deal Turn
router.put("/turn/:gameId", async (req, res) => {
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

    game.seats.forEach((seat) => {
      if (seat.player) {
        seat.player.checkBetFold = false; 
      }
    });

    const burntCard = game.currentDeck.shift().code;
    game.dealtCards.push(burntCard);

    const turnCard = game.currentDeck.shift().code;
    game.dealtCards.push(turnCard);
    game.communityCards.push(turnCard)

    await game.save();
    req.io.emit("turn", game);

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to deal the turn" });
  }
});

//Deal River
router.put("/river/:gameId", async (req, res) => {
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

    game.seats.forEach((seat) => {
      if (seat.player) {
        seat.player.checkBetFold = false; 
      }
    });

    const burntCard = game.currentDeck.shift().code;
    game.dealtCards.push(burntCard);

    const riverCard = game.currentDeck.shift().code;
    game.dealtCards.push(riverCard);
    game.communityCards.push(riverCard);

    await game.save();
    req.io.emit("river", game);

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to deal the river" });
  }
});


module.exports = router;
