import { useDispatch } from 'react-redux';
import { socket } from '../middleware/socketMiddleware';
import { useEffect } from 'react';
import { joinGameSuccess, receiveGames, joinGameError, playerJoined  } from '../slices/socketSlice';



function useSocketListeners() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listener for game updates
    socket.on('gamesData', (games) => {
      console.log('Games data received:', games);
      dispatch(receiveGames(games));
    });

    // Listener for a successful game join
    socket.on('gameJoined', (data) => {
      console.log('Game joined:', data);
      dispatch(joinGameSuccess(data));
    });

    // Listener for an error during game join
    socket.on('joinError', (error) => {
      console.log('Error while joining game:', error);
      dispatch(joinGameError(error));
    });

    socket.on('playerJoin', (data) => {
      console.log('Player joined:', data);
      dispatch(playerJoined(data));
    });

    return () => {
      // Clean up listeners when they're no longer needed
      socket.off('gamesData');
      socket.off('gameJoined');
      socket.off('joinError');
      socket.off('playerJoin');
    };
  }, [dispatch]);
}

export default useSocketListeners;