const router = require("express").Router();

const Deck = require("../models/cardSchema");

function shuffledDeck() {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  let deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
}

router.post("/startNewGame", async (req, res) => {
  try {
    const deck = new Deck();
    deck.cards = shuffledDeck();
    await deck.save();
    res.status(200).json({ deckId: deck._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/deck/:deckId", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.deckId);
    if (!deck) {
      return res.status(404).send({ message: "Deck not found" });
    }
    res.status(200).json(deck);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
