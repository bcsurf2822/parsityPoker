import React, { useState } from "react";

export default function SquareContent({ seatNumber, playerName, isDealer, card1, card2, onClick, className }) {
  const [isSeatTaken, setIsSeatTaken] = useState(false); // Track whether the seat has been clicked

  const handleClick = () => {
    setIsSeatTaken(true); // When clicked, mark the seat as taken
    onClick(); // Call the parent onClick handler if needed
  };

  return (
    <div className={className}>
      {isSeatTaken ? (
        <div className="player-info">
          <div className="player-name">{playerName || `Player ${seatNumber}`}</div>
          <div className="seat-number">Seat {seatNumber}</div>
          <div className="player-cards">
            <div className="card">{card1 || "Card 1"}</div>
            <div className="card">{card2 || "Card 2"}</div>
          </div>
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
