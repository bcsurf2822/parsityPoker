import React from "react";

export default function Deck({currentGame }) {


  return (
    <div>
      <ul>
        {currentGame?.currentGameCards?.length > 0 && 
          currentGame.currentGameCards.map((card, index) => (
            <li key={index}>
              {card.value} of {card.suit} (Code: {card.code})
            </li>
          ))}
      </ul>
      <button>Get New Deck</button> 
    </div>
  );
};
