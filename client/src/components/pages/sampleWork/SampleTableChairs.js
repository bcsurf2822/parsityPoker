import React from 'react';
import RectangleContent from './RectangleContent';
import SquareContent from './SquareContent';

const SampleTableChairs = () => {
  const handleSeatClick = (seatNumber) => {
    console.log(`Seat ${seatNumber} clicked`);
  };

  return (
    <div className="layout">
      <div className="square-row top">
        <SquareContent 
          seatNumber={1} 
          onClick={() => handleSeatClick(1)} 
          className="responsive-square" 
        />
        <SquareContent 
          seatNumber={2} 
          onClick={() => handleSeatClick(2)} 
          className="responsive-square" 
        />
      </div>
      <div className="rectangle-row">
        <SquareContent 
          seatNumber={3} 
          onClick={() => handleSeatClick(3)} 
          className="responsive-square" 
        />
        <div className="responsive-rectangle">
          <RectangleContent />
        </div>
        <SquareContent 
          seatNumber={4} 
          onClick={() => handleSeatClick(4)} 
          className="responsive-square" 
        />
      </div>
      <div className="square-row bottom">
        <SquareContent 
          seatNumber={5} 
          onClick={() => handleSeatClick(5)} 
          className="responsive-square" 
        />
        <SquareContent 
          seatNumber={6} 
          onClick={() => handleSeatClick(6)} 
          className="responsive-square" 
        />
      </div>
    </div>
  );
};

export default SampleTableChairs;
