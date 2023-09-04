// import { useDispatch } from "react-redux";
// import {
//   playerJoined,
//   playerLeft,
//   playerFolded,
//   playerChecked,
//   cardsDealt,
//   flopDealt,
//   turnDealt,
//   riverDealt,
//   gameEnded,
//   winnerReceived,
//   potTransferred,
//   updatedBlinds,
//   playerUpdated,
//   chipsCollected,
//   dealFlop,
// } from "../slices/serverSlice";
// import { useEffect } from "react";
// import { setCountdown } from "../slices/timingSlice";

// function useSocketListeners(socket, currentGame, id) {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const eventMapping = {
//       playerLeft: playerLeft,
//       playerJoined: playerJoined,
//       new_deck: cardsDealt,
//       flop: (data) => dispatch(dealFlop(data._id)),
//       turn: turnDealt,
//       river: riverDealt,
//       game_ended: gameEnded,
//       winner: winnerReceived,
//       cards_dealt: cardsDealt,
//       pot_transfer: potTransferred,
//       positions_and_blinds: updatedBlinds,
//       current_player: playerUpdated,
//       check: playerChecked,
//       fold: playerFolded,
//       bet_placed: chipsCollected,
//       game_starting: (data) => {
//         console.log("Dispatching setCountdown with value:", data.countdown);
//         return setCountdown(data.countdown);
//       },
//     };

//     Object.entries(eventMapping).forEach(([event, actionCreator]) => {
//       socket.on(event, (data) => {
//         console.log(`Event ${event} received with data:`, data);
//         if (!data) {
//           console.error(`Socket event "${event}" received with no data.`);
//           return;
//         }

//         dispatch(actionCreator(data));
//       });
//     });

//     return () => {
//       Object.keys(eventMapping).forEach((event) => {
//         socket.off(event);
//       });
//     };
//   }, [socket, currentGame, id, dispatch]);

//   return;
// }

// export default useSocketListeners;
