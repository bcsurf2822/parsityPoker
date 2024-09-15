import React, { useState } from "react";
import SampleCards from "./SampleCards";

export default function SampleSeats({
  seatNumber,
  playerName,
  isDealer,
  card1,
  card2,
  onClick,
  className,
}) {
  const [isSeatTaken, setIsSeatTaken] = useState(false);

  const handleClick = () => {
    setIsSeatTaken(true);
  };

  return (
    <div className={className}>
      {isSeatTaken ? (
        <div className="player-info">
          {" "}
          <div className="s-player-cards">
            <SampleCards card1={card1} card2={card2} />
          </div>
          <div className="player-chips">$0.00</div>
          <div className="player-name">
            {playerName || `Player ${seatNumber}`}
          </div>
          <div className="dealer">{isDealer ? "Dealer" : ""}</div>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleClick}
        >
          Sit Here {seatNumber}
        </button>
      )}
    </div>
  );
}
