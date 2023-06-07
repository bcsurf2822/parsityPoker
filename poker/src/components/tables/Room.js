import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Deck from "../tables/Cards";

const Room = () => {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  let initialDeck = [];

  suits.forEach(suit => {
    values.forEach(value => {
      initialDeck.push({
        suit,
        value
      });
    });
  });

  const [deck, setDeck] = useState(initialDeck);

  return (
    <div className="App">
      <Deck deck={deck} />
    </div>
  );
}
export default Room;