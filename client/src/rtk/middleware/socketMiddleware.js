import {
  receiveGame,
  requestGame,
  startJoinGame,
  joinGameSuccess,
  joinGameError,
  startLeaveGame,
  leaveGameError,
  leaveGameSuccess,
  updatePositionsAndBlindsSuccess,
  updatePositionsAndBlindsError,
  startUpdatePositionsAndBlinds,
  updateCurrentPlayerSuccess,
  updateCurrentPlayerError,
  endGameSuccess,
  endGameError,
  startDealFlop,
  dealFlopSuccess,
  dealFlopError,
  startDealTurn,
  dealTurnSuccess,
  dealTurnError,
  startDealRiver,
  dealRiverSuccess,
  dealRiverError,
  startUpdateCurrentPlayer,
  startEndGame,
  startPlayerBet,
  playerBetSuccess,
  playerBetError,
  startPlayerRaise,
  playerRaiseSuccess,
  playerRaiseError,
  startPlayerCall,
  playerCallSuccess,
  playerCallError,
  startPlayerCheck,
  playerCheckSuccess,
  playerCheckError,
  startPlayerFold,
  playerFoldSuccess,
  playerFoldError,
  startPotToPlayer,
  potToPlayerSuccess,
  potToPlayerError,
} from "../slices/currentGameSlice";

import {
  playerUpdate,
  receiveGames,
  receiveGamesError,
  requestGames,
} from "../slices/allGamesSlice";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

const socketMiddleware = (store) => {
  socket.on("gamesData", (data) => {
    store.dispatch(receiveGames(data));
  });

  socket.on("gameData", (data) => {
    store.dispatch(receiveGame(data));
  });

  socket.on("gamesError", (errorMsg) => {
    store.dispatch(receiveGamesError(errorMsg));
  });

  socket.on("playerJoin", (data) => {
    console.log("Received playerJoin event with data:", data);
    store.dispatch(joinGameSuccess(data));
    store.dispatch(playerUpdate(data))
  });

  socket.on("joinGameError", (error) => {
    store.dispatch(joinGameError(error.message));
  });

  socket.on("playerLeft", (data) => {
    console.log("Received playerLeft event with data:", data);
    store.dispatch(leaveGameSuccess(data));
    store.dispatch(playerUpdate(data))
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

  socket.on("next_current_player", (data) => {
    store.dispatch(updateCurrentPlayerSuccess(data));
  });

  socket.on("currentPlayerError", (error) => {
    store.dispatch(updateCurrentPlayerError(error));
  });

  socket.on("game_ended", (data) => {
    store.dispatch(endGameSuccess(data));
  });

  socket.on("endGameError", (error) => {
    store.dispatch(endGameError(error));
  });

  socket.on("flop_dealt", (data) => {
    store.dispatch(dealFlopSuccess(data));
  });

  socket.on("dealFlopError", (error) => {
    store.dispatch(dealFlopError(error));
  });

  socket.on("turn_dealt", (data) => {
    store.dispatch(dealTurnSuccess(data));
  });

  socket.on("dealTurnError", (error) => {
    store.dispatch(dealTurnError(error));
  });

  socket.on("river_dealt", (data) => {
    store.dispatch(dealRiverSuccess(data));
  });

  socket.on("dealRiverError", (error) => {
    store.dispatch(dealRiverError(error));
  });

  socket.on("player_bet_placed", (data) => {
    console.log("Received player_bet_placed event with data:", data);
    store.dispatch(playerBetSuccess(data));
  });

  socket.on("playerBetError", (error) => {
    store.dispatch(playerBetError(error.message));
  });

  socket.on("player_raised_bet", (data) => {
    console.log("Received player_raised event with data:", data);
    store.dispatch(playerRaiseSuccess(data));
  });

  socket.on("playerRaiseError", (error) => {
    store.dispatch(playerRaiseError(error.message));
  });

  socket.on("player_called_bet", (data) => {
    console.log("Received player_called event with data:", data);
    store.dispatch(playerCallSuccess(data));
  });

  socket.on("playerCallError", (error) => {
    store.dispatch(playerCallError(error.message));
  });

  socket.on("player_checked", (data) => {
    console.log("Received player_checked event with data:", data);
    store.dispatch(playerCheckSuccess(data));
  });

  socket.on("checkError", (error) => {
    store.dispatch(playerCheckError(error.message));
  });

  socket.on("player_folded", (data) => {
    console.log("Received player_folded event with data:", data);
    store.dispatch(playerFoldSuccess(data));
  });

  socket.on("foldError", (error) => {
    store.dispatch(playerFoldError(error.message));
  });

  socket.on("pot_transferred", (data) => {
    console.log("Received pot_transferred event with data:", data);
    store.dispatch(potToPlayerSuccess(data));
  });

  socket.on("potTransferError", (error) => {
    store.dispatch(potToPlayerError(error.message));
  });


  return (next) => (action) => {
    switch (action.type) {
      case requestGames.toString():
        socket.emit("getGames");
        break;

      case requestGame.toString():
        const rGameId = action.payload;
        console.log("Emitting getGame event with gameId:", rGameId);
        socket.emit("getGame", rGameId);
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

      case startUpdateCurrentPlayer.toString():
        const { gameId: ucGameId } = action.payload;
        socket.emit("updateCurrentPlayer", { gameId: ucGameId });
        break;

      case startEndGame.toString():
        const { gameId: eGameId } = action.payload;
        socket.emit("end_game", { gameId: eGameId });
        break;

      case startDealFlop.toString():
        const { gameId: dfGameId } = action.payload;
        socket.emit("deal_flop", { gameId: dfGameId });
        break;

      case startDealTurn.toString():
        const { gameId: dtGameId } = action.payload;
        socket.emit("deal_turn", { gameId: dtGameId });
        break;

      case startDealRiver.toString():
        const { gameId: drGameId } = action.payload;
        socket.emit("deal_river", { gameId: drGameId });
        break;

      case startPlayerBet.toString():
        console.log(
          "Emitting player_bet event with payload:",
          action.payload
        );
        socket.emit("player_bet", action.payload);
        break;

      case startPlayerRaise.toString():
        console.log("Emitting raise event with payload:", action.payload);
        socket.emit("player_raise", action.payload);
        break;

      case startPlayerCall.toString():
        console.log("Emitting call event with payload:", action.payload);
        socket.emit("player_call", action.payload);
        break;

      case startPlayerCheck.toString():
        console.log("Emitting check event with payload:", action.payload);
        socket.emit("check", action.payload);
        break;

      case startPlayerFold.toString():
        console.log("Emitting fold event with payload:", action.payload);
        socket.emit("fold", action.payload);
        break;

      case startPotToPlayer.toString():
        console.log("Emitting pot_to_player event with payload:", action.payload);
        socket.emit("pot_to_player", action.payload);
        break;

      default:
        break;
    }

    return next(action);
  };
};

export { socketMiddleware, socket };
