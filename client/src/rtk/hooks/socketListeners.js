import { useDispatch } from "react-redux";
import {
  playerJoined,
  playerLeft,
  playerFolded,
  playerChecked,
  cardsDealt,
  flopDealt,
  turnDealt,
  riverDealt,
  gameEnded,
  winnerReceived,
  potTransferred,
  updatedBlinds,
  playerUpdated,
  chipsCollected,
} from "../slices/serverSlice";
import { useEffect } from "react";

function useSocketListeners(socket, currentGame, id) {
  const dispatch = useDispatch();

  useEffect(() => {
    const eventMapping = {
      playerLeft: playerLeft,
      playerJoined: playerJoined,
      new_deck: cardsDealt,
      flop: flopDealt,
      turn: turnDealt,
      river: riverDealt,
      game_ended: gameEnded,
      winner: winnerReceived,
      cards_dealt: cardsDealt,
      pot_transfer: potTransferred,
      updated_blinds: updatedBlinds,
      current_player: playerUpdated,
      check: playerChecked,
      fold: playerFolded,
      bet_placed: chipsCollected,
    };

    Object.entries(eventMapping).forEach(([event, actionCreator]) => {
      socket.on(event, (updatedGame) => {
        dispatch(actionCreator(updatedGame));
      });
    });

    return () => {
      Object.keys(eventMapping).forEach((event) => {
        socket.off(event);
      });
    };
  }, [socket, currentGame, id, dispatch]);
}

export default useSocketListeners;