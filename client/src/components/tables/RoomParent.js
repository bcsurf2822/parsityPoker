import React from "react";
import NewRoom from "./NewRoom";

import { useDispatch } from "react-redux";

import { startLeaveGame } from "../../rtk/slices/currentGameSlice";

export default function RoomParent() {
  const dispatch = useDispatch();

  const handleLeaveGame = (userId, gameId) => {
    console.log("Dispatching startLeaveGame with params:", userId, gameId);
    dispatch(startLeaveGame({ userId, gameId }));
  };

  return (
    <div className="responsive-box">
      <button type="button" class="btn-close" aria-label="Close"></button>

      <NewRoom />
    </div>
  );
}
