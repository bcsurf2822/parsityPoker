import React from 'react';
import { getCards } from '../../../actions/getCards';
import { getCardColor } from '../../../actions/getCardColor';

export default function HandCards({ cards, card1, card2 }) {
  const hasCards = cards && cards.length > 0;

  return (
    <div className="container s-player-cards">
      {hasCards ? (
        cards.map((card, index) => (
          <img 
            key={index} 
            src={getCards(card)} 
            alt={`Card ${index + 1} ${card}`} 
            className="card-image"
          />
        ))
      ) : (
        <div className="blue-card-container">
          {[card1, card2].map((card, index) => (
            <div key={index} className="blue-card-slot">
              <img 
                src={getCardColor()} 
                alt={`Card ${index + 1}`} 
                className="card-image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}