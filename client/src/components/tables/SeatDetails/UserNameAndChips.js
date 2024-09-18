import React from "react";

export default function UserNameAndChips({
  user,
  chipCount,
  seatNumber,
  isDealer,
  isCurrentPlayer,
}) {
  return (
    <div>
      <div className="player-name">{user}</div>
      <div className="player-chips">${chipCount}</div>
      {/* <div className="dealer">
        {" "}
        Dealer: {isDealer ? "Yes" : "No"} | Current Player:{" "}
        {isCurrentPlayer ? "Yes" : "No"}{" "}
      </div> */}
    </div>
  );
}
