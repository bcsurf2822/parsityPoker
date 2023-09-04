import { socket } from '../../socket';
import { gameUpdated } from '../slices/apiSlice';

// const socket = io('http://localhost:4000');

export const initializeSockets = (dispatch) => {
  socket.on('connect', () => {
    console.log('Connected to the server');
  });

  socket.on('gameUpdated', (gameData) => {
    console.log('Game data updated:', gameData);
    dispatch(gameUpdated(gameData));
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });
};

export const joinGameSocket = (gameId, seatId, userId, buyIn) => {
  socket.emit('gameUpdated', { gameId, seatId, userId, buyIn });
};
