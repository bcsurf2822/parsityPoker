import React from "react";

export default function SquareContent({ seatNumber, onClick, className }) {
  return (
    <div className={className}>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onClick}
      >
        Sit Here {seatNumber}
      </button>
    </div>
  );
}