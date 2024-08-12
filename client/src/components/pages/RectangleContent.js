import React from 'react';


const RectangleContent = () => {
  return (
    <div className="rectangle-content">
    <div className="card-slots">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="card-slot">
          <img 
            src={`${process.env.PUBLIC_URL}/cardBack\Blue Bicycle card back.png`} 
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