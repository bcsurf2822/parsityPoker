import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Deck from "../tables/Cards";


const About = () => {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  const generateDeck = () => {
    const deck = [];

    suits.forEach(suit => {
      values.forEach(value => {
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
      console.log('No cards left in the deck.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck[randomIndex];

    // Remove the drawn card from the deck
    const updatedDeck = deck.filter((card, index) => index !== randomIndex);
    setDeck(updatedDeck);

    console.log(`Drawn card: ${drawnCard.value} of ${drawnCard.suit}`);
  };
  
  return (
    <div className="App">
      <button onClick={drawCard}>Draw Card</button>
    </div>
  );
}
export default About;