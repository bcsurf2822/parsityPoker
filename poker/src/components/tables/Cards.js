import React from 'react';
import Card from './TestCards';

const Deck = ({ deck }) => {
  return (
    <div className="deck">
      {deck.map((card, index) => <Card key={index} card={card} />)}
    </div>
  );
};

export default Deck;