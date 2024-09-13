import React from "react";
import { getCardColor } from "../../../actions/getCardColor";

export default function SampleCards({ card1, card2 }) {
  return (
    <div className="card-container">
      {[card1, card2].map((card, index) => (
        <div key={index} className="card-slot">
          <img 
            src={getCardColor()} 
            alt={`Card ${index + 1}`} 
            className="card-image"
          />
        </div>
      ))}
    </div>
  );
}