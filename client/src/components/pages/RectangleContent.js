import React from 'react';


const RectangleContent = () => {
  return (
    <div className="rectangle-content">
      <div className="card-slots">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card-slot">Card {index + 1}</div>
        ))}
      </div>
      <div className="amount-display">$0.00</div>
    </div>
  );
};

export default RectangleContent;