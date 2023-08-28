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
  updatePositionsAndBlinds
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

    // Attach socket event listeners
    Object.entries(eventMapping).forEach(([event, actionCreator]) => {
      socket.on(event, (updatedGame) => {
        console.log(`Event ${event} received.`);
        if (!updatedGame) {
          console.error(`Socket event "${event}" received with no data.`);
          return;
        }

        dispatch(actionCreator(updatedGame));
        
        if (event === "playerJoined") {
          const playerCount = updatedGame?.seats?.filter(seat => seat?.player !== null).length;
          console.log("playerJoined event triggered, playerCount:", playerCount);
          if (playerCount === 2) {
            console.log("Dispatching updatePositionsAndBlinds due to playerJoined event.");
            dispatch(updatePositionsAndBlinds(id));
          }
        }
      });
    });

    // Cleanup function to remove the event listeners
    return () => {
      Object.keys(eventMapping).forEach((event) => {
        socket.off(event);
      });
    };
  }, [socket, currentGame, id, dispatch]);

  return; // This is not needed unless you plan on returning something from the hook.
}

export default useSocketListeners;
