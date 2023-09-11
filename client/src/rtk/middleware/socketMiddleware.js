// import {
//   receiveGames,
//   receiveGamesError,
//   requestGames,
//   startJoinGame,
//   joinGameSuccess,
//   joinGameError,
//   playerLeftGame,
//   leaveGameError,
//   startLeaveGame,
//   updatePositionsAndBlindsSuccess,
//   updatePositionsAndBlindsError,
//   startUpdatePositionsAndBlinds,
// } from "../slices/socketSlice";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:4000");

// const socketMiddleware = (store) => {
//   socket.on("gamesData", (data) => {
//     console.log("Received gamesData event with data:", data);
//     store.dispatch(receiveGames(data));
//   });

//   socket.on("gamesError", (errorMsg) => {
//     console.log("Received gamesError event with error:", errorMsg);
//     store.dispatch(receiveGamesError(errorMsg));
//   });

//   socket.on("gameJoined", (data) => {
//     console.log("Received gameJoined event with data:", data);
//     store.dispatch(joinGameSuccess(data));
//   });

//   socket.on("joinGameError", (error) => {
//     console.log("Received joinGameError event with error:", error);
//     store.dispatch(joinGameError(error.message));
//   });

//   socket.on("playerLeft", (data) => {
//     console.log("Received playerLeft event with data:", data);
//     store.dispatch(playerLeftGame(data));
//   });

//   socket.on("leaveGameError", (error) => {
//     console.log("Received leaveGameError event with error:", error);
//     store.dispatch(leaveGameError(error.message));
//   });

//   socket.on('positions_and_blinds', (data) => {
//     console.log("Received positions_and_blinds event with data:", data);
//     store.dispatch(updatePositionsAndBlindsSuccess(data));
// });

// socket.on('positionsAndBlindsError', (error) => {
//     console.log("Received positionsAndBlindsError event with error:", error);
//     store.dispatch(updatePositionsAndBlindsError(error.message));
// });

//   return (next) => (action) => {
//     if (action.type === requestGames.toString()) {
//       console.log("Emitting getGames event.");
//       socket.emit("getGames");
//     }

//     if (action.type === startJoinGame.toString()) {
//       console.log("Emitting joinGame event with payload:", action.payload);
//       const { userId, gameId, seatId, buyIn } = action.payload;
//       socket.emit("joinGame", { userId, gameId, seatId, buyIn });
//     }

//     if (action.type === startLeaveGame.toString()) {
//       console.log("Emitting leaveGame event with payload:", action.payload);
//       const { userId, gameId } = action.payload;
//       socket.emit("leaveGame", { userId, gameId });
//     }

//     if (action.type === startUpdatePositionsAndBlinds.toString()) {
//       console.log("Emitting updatePositionsAndBlinds event with payload:", action.payload);
//       const { gameId } = action.payload;
//       socket.emit('updatePositionsAndBlinds', { gameId });
//   }

//     return next(action);
//   };
// };

// export { socketMiddleware, socket };

import {
  receiveGames,
  receiveGamesError,
  requestGames,
  playerLeftGame,
  leaveGameError,
  startLeaveGame,
  updatePositionsAndBlindsSuccess,
  updatePositionsAndBlindsError,
  startUpdatePositionsAndBlinds,
  updateCurrentPlayerSuccess,
  updateCurrentPlayerError,
  endGameSuccess,
  endGameError,
  playerJoinedGame,
  joinGameError,
  startJoinGame,
} from "../slices/socketSlice";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

const socketMiddleware = (store) => {
  // Set up socket event listeners
  socket.on("gamesData", (data) => {
    store.dispatch(receiveGames(data));
  });

  socket.on("gamesError", (errorMsg) => {
    store.dispatch(receiveGamesError(errorMsg));
  });

  socket.on("playerJoin", (data) => {
    console.log("Received playerJoin event with data:", data);
    store.dispatch(playerJoinedGame(data));
  });

  // This is assuming the server sends "joinGameError" when there's an error with joining a game.
  socket.on("joinGameError", (error) => {
    store.dispatch(joinGameError(error.message));
  });

  socket.on("playerLeft", (data) => {
    console.log("Received playerLeft event with data:", data);
    store.dispatch(playerLeftGame(data));
  });

  socket.on("leaveGameError", (error) => {
    store.dispatch(leaveGameError(error.message));
  });

  socket.on("positions_and_blinds", (data) => {
    store.dispatch(updatePositionsAndBlindsSuccess(data));
  });

  socket.on("positionsAndBlindsError", (error) => {
    store.dispatch(updatePositionsAndBlindsError(error.message));
  });

  socket.on("current_player", (data) => {
    store.dispatch(updateCurrentPlayerSuccess(data));
  });

  socket.on("currentPlayerError", (error) => {
    store.dispatch(updateCurrentPlayerError(error));
  });

  socket.on("end_game", (data) => {
    store.dispatch(endGameSuccess(data));
  });

  socket.on("endGameError", (error) => {
    store.dispatch(endGameError(error));
  });

  return (next) => (action) => {
    switch (action.type) {
      case requestGames.toString():
        socket.emit("getGames");
        break;

      case startJoinGame.toString():
        const {
          userId: jUserId,
          gameId: jGameId,
          seatId: jSeatId,
          buyIn: jbuyIn,
        } = action.payload;
        console.log("Emitting joinGame event with data:", {
          userId: jUserId,
          gameId: jGameId,
          seatId: jSeatId,
          buyIn: jbuyIn,
        });
        socket.emit("joinGame", {
          userId: jUserId,
          gameId: jGameId,
          seatId: jSeatId,
          buyIn: jbuyIn,
        });
        break;

      case startLeaveGame.toString():
        const { userId: lUserId, gameId: lGameId } = action.payload;
        console.log("Emitting leaveGame event with data:", {
          userId: lUserId,
          gameId: lGameId,
        });
        socket.emit("leaveGame", { userId: lUserId, gameId: lGameId });
        break;

      case startUpdatePositionsAndBlinds.toString():
        const { gameId: uGameId } = action.payload;
        socket.emit("updatePositionsAndBlinds", { gameId: uGameId });
        break;

      default:
        break;
    }

    return next(action);
  };
};

export { socketMiddleware, socket };
