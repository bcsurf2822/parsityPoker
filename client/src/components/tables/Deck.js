import React, { useEffect } from 'react';
import { socket } from "../../socket";
import { useDispatch } from 'react-redux';


export default function Deck({ gameId, currentGame }) {
  const dispatch = useDispatch();


  useEffect(() => {
    console.log('Setting up socket listener for gameUpdated...'); 


    return () => {
      console.log('Removing socket listener for gameUpdated...');
      socket.off('newDeck');
    };
  }, [dispatch, gameId]); 
  return (
    <div>
      <ul>
        {currentGame?.currentGameCards?.length > 0 && // Use currentGame prop
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
