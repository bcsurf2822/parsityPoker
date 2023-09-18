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
  startDealCards,
  dealCardsSuccess,
  dealCardsError,
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
  startPlayerCheck,
  playerCheckSuccess,
  playerCheckError,
  startPlayerFold,
  playerFoldSuccess,
  playerFoldError,
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

  socket.on("cards_dealt", (data) => {
    store.dispatch(dealCardsSuccess(data));
  });

  socket.on("dealCardsError", (error) => {
    store.dispatch(dealCardsError(error));
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

  socket.on("player_acted", (data) => {
    console.log("Received player_acted event with data:", data);
    store.dispatch(playerBetSuccess(data));
  });

  socket.on("playerBetError", (error) => {
    store.dispatch(playerBetError(error.message));
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

      case startUpdateCurrentPlayer.toString():
        const { gameId: ucGameId } = action.payload;
        socket.emit("updateCurrentPlayer", { gameId: ucGameId });
        break;

      case startEndGame.toString():
        const { gameId: eGameId } = action.payload;
        socket.emit("end_game", { gameId: eGameId });
        break;

      case startDealCards.toString():
        const { gameId: dGameId } = action.payload;
        socket.emit("deal_cards", { gameId: dGameId });
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
          "Emitting player_to_pot event with payload:",
          action.payload
        );
        socket.emit("player_to_pot", action.payload);
        break;

      case startPlayerCheck.toString():
        console.log("Emitting check event with payload:", action.payload);
        socket.emit("check", action.payload);
        break;

      case startPlayerFold.toString():
        console.log("Emitting fold event with payload:", action.payload);
        socket.emit("fold", action.payload);
        break;

      default:
        break;
    }

    return next(action);
  };
};

export { socketMiddleware, socket };
