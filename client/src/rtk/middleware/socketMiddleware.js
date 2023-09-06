import { requestGames, receiveGames, receiveGamesError } from "../slices/socketSlice";
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

  return next(action);
};