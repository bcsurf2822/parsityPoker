import { requestGames, receiveGames, receiveGamesError } from "../slices/socketSlice";
import { io } from "socket.io-client";
export const socket = io('http://localhost:4000');

export const socketMiddleware = store => {

  socket.on('gamesData', (data) => {
    store.dispatch(receiveGames(data));
  });

  socket.on('gamesError', (errorMsg) => {
    store.dispatch(receiveGamesError(errorMsg));
  });

  return next => action => {
    if (action.type === requestGames.toString()) {
      socket.emit('getGames');
    }


    return next(action);
  };
};
