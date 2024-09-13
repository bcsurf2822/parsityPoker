import React from "react";
import { getCardColor } from "../../../actions/getCardColor";

export default function sampleCards() {
  return (
    <div className="card-container">
      <div className="card">{card1 || "Card 1"}</div>
      <div className="card">{card2 || "Card 2"}</div>
    </div>
  );
}
