const router = require('express').Router();

const {Deck} = require("../models/cardSchema");

router.get('/drawCard/:deckId', async (req, res) => {
  try {
      const deck = await Deck.findById(req.params.deckId);
      if (!deck) {
          return res.status(404).send({ message: 'Deck not found' });
      }

      // assuming the deck is already shuffled
      const drawnCard = deck.cards.pop();

      // save the updated deck
      await deck.save();

      // send the drawn card
      res.status(200).json(drawnCard);
  } catch (error) {
      res.status(500).send({ message: 'Server Error' });
  }
});

module.exports = router

