import React, { useEffect } from 'react';
import { socket } from "../../socket";
import { useDispatch } from 'react-redux';
import { fetchNewDeck, gameUpdated } from '../../rtk/slices/serverSlice';


export default function Deck({ gameId, currentGame }) {
  const dispatch = useDispatch();

  const handleNewDeck = () => {
    dispatch(fetchNewDeck(gameId));
  };

  useEffect(() => {
    console.log('Setting up socket listener for gameUpdated...'); 

    socket.on('newDeck', (updatedGame) => {
      console.log('Received gameUpdated event:', updatedGame);
      dispatch(gameUpdated(updatedGame));
    });

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
      <button onClick={handleNewDeck}>Get New Deck</button> 
    </div>
  );
};
