import {   receiveGames, receiveGamesError, requestGames,
  startJoinGame, joinGameSuccess, joinGameError  } from "../slices/socketSlice";
import { io } from "socket.io-client";
const socket = io('http://localhost:4000');

const socketMiddleware = store => {

  socket.on('gamesData', (data) => {
    console.log("Received gamesData event with data:", data);
    store.dispatch(receiveGames(data));
});

socket.on('gamesError', (errorMsg) => {
    console.log("Received gamesError event with error:", errorMsg);
    store.dispatch(receiveGamesError(errorMsg));
});

socket.on('gameJoined', (data) => {
    console.log("Received gameJoined event with data:", data);
    store.dispatch(joinGameSuccess(data));
});

socket.on('joinGameError', (error) => {
    console.log("Received joinGameError event with error:", error);
    store.dispatch(joinGameError(error.message));
});

return next => action => {
    if (action.type === requestGames.toString()) {
        console.log("Emitting getGames event.");
        socket.emit('getGames');
    }

    if (action.type === startJoinGame.toString()) {
        console.log("Emitting joinGame event with payload:", action.payload);
        const { userId, gameId, seatId, buyIn } = action.payload;
        socket.emit('joinGame', { userId, gameId, seatId, buyIn });
    }

    return next(action);
  };
};


export { socketMiddleware, socket };