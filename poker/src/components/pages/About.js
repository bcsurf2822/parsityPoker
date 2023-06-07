import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Deck from "../tables/Cards";
import SeatsGrid from "../tables/SeatGrid";

const About = () => {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  const generateDeck = () => {
    const deck = [];

    suits.forEach((suit) => {
      values.forEach((value) => {
        deck.push({
          suit,
          value
        });
      });
    });

    return deck;
  };

  const [deck, setDeck] = useState(generateDeck());

  const drawCard = () => {
    if (deck.length === 0) {
      // Handle case when deck is empty
      console.log("No cards left in the deck.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck[randomIndex];

    // Remove the drawn card from the deck
    const updatedDeck = deck.filter((card, index) => index !== randomIndex);
    setDeck(updatedDeck);

    console.log(`Drawn card: ${drawnCard.value} of ${drawnCard.suit}`);

    // Deal 4 cards to each player
    const updatedPlayerHands = Array.from({ length: 6 }, () => []);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        const cardIndex = Math.floor(Math.random() * updatedDeck.length);
        const card = updatedDeck[cardIndex];
        updatedDeck.splice(cardIndex, 1);
        updatedPlayerHands[j].push(card);
      }
    }

    setPlayerHands(updatedPlayerHands);
  };

  const resetDeck = () => {
    setDeck(generateDeck());
    console.log("Deck reset.");
  };

  const [playerHands, setPlayerHands] = useState(Array.from({ length: 6 }, () => []));

  return (
    <div className="App">
      <SeatsGrid playerHands={playerHands} />
      <button onClick={drawCard}>Draw Card</button>
      <button onClick={resetDeck}>Reset Deck</button>
    </div>
  );
};

export default About;