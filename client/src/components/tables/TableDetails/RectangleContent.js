import React from 'react';
import { getCardColor } from '../../../actions/getCardColor';
import { getCards } from '../../../actions/getCards';

const RectangleContent = ({ pot, cards }) => {
  return (
    <div className="rectangle-content">
      <div className="blue-card-container">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="blue-card-slot">
            {cards && cards[index] ? (
              <img
                src={getCards(cards[index])}
                alt={`Card ${index + 1}`}
                className="card-image"
              />
            ) : (
              <img 
                src={getCardColor()} 
                alt={`Card ${index + 1}`} 
                className="card-image"
              />
            )}
          </div>
        ))}
      </div>
      <div className="amount-display">$ {pot}</div>
    </div>
  );
};

export default RectangleContent;
