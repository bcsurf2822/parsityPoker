import {
  receiveGames,
  receiveGamesError,
  requestGames,
  startJoinGame,
  joinGameSuccess,
  joinGameError,
  playerLeftGame,
  leaveGameError,
  startLeaveGame,
  updatePositionsAndBlindsSuccess,
  updatePositionsAndBlindsError,
  startUpdatePositionsAndBlinds,
} from "../slices/socketSlice";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

const socketMiddleware = (store) => {
  socket.on("gamesData", (data) => {
    console.log("Received gamesData event with data:", data);
    store.dispatch(receiveGames(data));
  });

  socket.on("gamesError", (errorMsg) => {
    console.log("Received gamesError event with error:", errorMsg);
    store.dispatch(receiveGamesError(errorMsg));
  });

  socket.on("gameJoined", (data) => {
    console.log("Received gameJoined event with data:", data);
    store.dispatch(joinGameSuccess(data));
  });

  socket.on("joinGameError", (error) => {
    console.log("Received joinGameError event with error:", error);
    store.dispatch(joinGameError(error.message));
  });

  socket.on("playerLeft", (data) => {
    console.log("Received playerLeft event with data:", data);
    store.dispatch(playerLeftGame(data));
  });

  socket.on("leaveGameError", (error) => {
    console.log("Received leaveGameError event with error:", error);
    store.dispatch(leaveGameError(error.message));
  });

  socket.on('positions_and_blinds', (data) => {
    console.log("Received positions_and_blinds event with data:", data);
    store.dispatch(updatePositionsAndBlindsSuccess(data));
});

socket.on('positionsAndBlindsError', (error) => {
    console.log("Received positionsAndBlindsError event with error:", error);
    store.dispatch(updatePositionsAndBlindsError(error.message));
});

  return (next) => (action) => {
    if (action.type === requestGames.toString()) {
      console.log("Emitting getGames event.");
      socket.emit("getGames");
    }

    if (action.type === startJoinGame.toString()) {
      console.log("Emitting joinGame event with payload:", action.payload);
      const { userId, gameId, seatId, buyIn } = action.payload;
      socket.emit("joinGame", { userId, gameId, seatId, buyIn });
    }

    if (action.type === startLeaveGame.toString()) {
      console.log("Emitting leaveGame event with payload:", action.payload);
      const { userId, gameId } = action.payload;
      socket.emit("leaveGame", { userId, gameId });
    }

    if (action.type === startUpdatePositionsAndBlinds.toString()) {
      console.log("Emitting updatePositionsAndBlinds event with payload:", action.payload);
      const { gameId } = action.payload;
      socket.emit('updatePositionsAndBlinds', { gameId });
  }

    return next(action);
  };
};

export { socketMiddleware, socket };
