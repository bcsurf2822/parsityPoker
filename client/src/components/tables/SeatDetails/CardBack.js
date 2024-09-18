import React from "react";
import { getCardColor } from "../../../actions/getCardColor";

export default function CardBack({ card1, card2 }) {
  return (
    <div className="s-card-container">
      {[card1, card2].map((card, index) => (
        <div key={index} className="s-card-slot">
          <img 
            src={getCardColor()} 
            alt={`Card ${index + 1}`} 
            className="s-card-image"
          />
        </div>
      ))}
    </div>
  );
}