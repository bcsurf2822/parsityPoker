import React, { useState } from "react";

export default function SquareContent({
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
          <div className="player-cards">
            <div className="card">{card1 || "Card 1"}</div>
            <div className="card">{card2 || "Card 2"}</div>
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
