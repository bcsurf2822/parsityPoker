import React from "react";
import { getCardColor } from "../../../actions/getCardColor";

export default function CardBack({ card1, card2 }) {
  return (
    <div className="blue-card-container">
      {[card1, card2].map((card, index) => (
        <div key={index} className="blue-card-slot">
          <img 
            src={getCardColor()} 
            alt={`Card ${index + 1}`} 
            className="blue-card-image"
          />
        </div>
      ))}
    </div>
  );
}