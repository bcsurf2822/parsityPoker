import { useDispatch } from 'react-redux';
import { socket } from '../middleware/socketMiddleware';
import { useEffect } from 'react';
import { joinGameSuccess, receiveGames, joinGameError, playerJoined, leaveGameError, playerLeftGame  } from '../slices/socketSlice';



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

    socket.on('joinError', (error) => {
      console.log('Error while joining game:', error);
      dispatch(joinGameError(error));
    });

    socket.on('playerJoin', (data) => {
      console.log('Player joined:', data);
      dispatch(playerJoined(data));
    });

    socket.on('gameLeft', (data) => {
      console.log('Game left:', data);
      dispatch(playerLeftGame(data));
    });
    
 
    socket.on('leaveGameError', (error) => {
      console.log('Error while leaving game:', error);
      dispatch(leaveGameError(error));
    });

    return () => {
   
      socket.off('gamesData');
      socket.off('gameJoined');
      socket.off('joinError');
      socket.off('playerJoin');
      socket.off('gameLeft');
      socket.off('leaveGameError');
    };
  }, [dispatch]);
}

export default useSocketListeners;