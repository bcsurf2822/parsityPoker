import React from 'react';
import { getCardColor } from '../../../actions/getCardColor';
// import { getCards } from '../../actions/getCards';


const RectangleContent = () => {
  return (
    <div className="rectangle-content">
    <div className="card-slots">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="card-slot">
          <img 
            src={getCardColor()} 
            alt={`Card ${index + 1}`} 
            className="card-image"
          />
        </div>
      ))}
    </div>
      <div className="amount-display">$0.00</div>
    </div>
  );
};

export default RectangleContent;