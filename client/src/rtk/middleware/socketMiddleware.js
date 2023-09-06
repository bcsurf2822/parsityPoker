import { requestGames, receiveGames, receiveGamesError, gameJoined, requestJoinGame, joinGameError, playerJoin } from "../slices/socketSlice";
import { socket } from "../../socket";

export const socketMiddleware = store => next => action => {
  if (action.type === requestGames.toString()) {
    socket.emit('getGames');
  }

  socket.on('gamesData', (data) => {
    store.dispatch(receiveGames(data));
  });

  socket.on('gamesError', (errorMsg) => {
    store.dispatch(receiveGamesError(errorMsg));
  });

  if (action.type === requestJoinGame.toString()) {
    const { userId, gameId, seatId, buyIn } = action.payload;
    socket.emit('joinGame', { userId, gameId, seatId, buyIn });
  }

  socket.on('gameJoined', (data) => {
    store.dispatch(gameJoined(data));
  });

  socket.on('joinGameError', (errorMsg) => {
    store.dispatch(joinGameError(errorMsg));
  });

  socket.on('playerJoin', (data) => {
    store.dispatch(playerJoin(data));
  });


  return next(action);
};