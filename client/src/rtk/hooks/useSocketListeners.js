import { useDispatch } from "react-redux";
import { socket } from "../middleware/socketMiddleware";
import { useEffect } from "react";
import {
  joinGameSuccess,
  receiveGames,
  joinGameError,
  playerJoined,
  leaveGameError,
  playerLeftGame,
  updatePositionsAndBlindsSuccess,
  updatePositionsAndBlindsError,
  updateCurrentPlayerSuccess,
  updateCurrentPlayerError,
  endGameSuccess,
  endGameError
} from "../slices/socketSlice";

function useSocketListeners() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listener for game updates
    socket.on("gamesData", (games) => {
      console.log("Games data received:", games);
      dispatch(receiveGames(games));
    });

    // Listener for a successful game join
    socket.on("gameJoined", (data) => {
      console.log("Game joined:", data);
      dispatch(joinGameSuccess(data));
    });

    socket.on("joinError", (error) => {
      console.log("Error while joining game:", error);
      dispatch(joinGameError(error));
    });

    socket.on("playerJoin", (data) => {
      console.log("Player joined:", data);
      dispatch(playerJoined(data));
    });

    socket.on("gameLeft", (data) => {
      console.log("Game left:", data);
      dispatch(playerLeftGame(data));
    });

    socket.on("leaveGameError", (error) => {
      console.log("Error while leaving game:", error);
      dispatch(leaveGameError(error));
    });

    socket.on("positions_and_blinds", (data) => {
      console.log("Positions and blinds updated:", data);
      dispatch(updatePositionsAndBlindsSuccess(data));
    });

    socket.on("positionsAndBlindsError", (error) => {
      console.log("Error while updating positions and blinds:", error);
      dispatch(updatePositionsAndBlindsError(error));
    });

    socket.on("current_player", (data) => {
      console.log("Current Player Positions updated:", data);
      dispatch(updateCurrentPlayerSuccess(data));
    });

    socket.on("currentPlayerError", (error) => {
      console.log("Error while updating current player:", error);
      dispatch(updateCurrentPlayerError(error));
    });

    socket.on("end_game", (data) => {
      console.log("Game Ended:", data);
      dispatch(endGameSuccess(data));
    });

    socket.on("endGameError", (error) => {
      console.log("Error while ending game:", error);
      dispatch(endGameError(error));
    });

    return () => {
      socket.off("gamesData");
      socket.off("gameJoined");
      socket.off("joinError");
      socket.off("playerJoin");
      socket.off("gameLeft");
      socket.off("leaveGameError");
      socket.off("positions_and_blinds");
      socket.off("positionsAndBlindsError");
      socket.off("current_player");
      socket.off("currentPlayerError");
      socket.off("end_game");
      socket.off("endGameError");
    };
  }, [dispatch]);
}

export default useSocketListeners;
