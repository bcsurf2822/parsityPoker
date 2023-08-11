import React from "react";

export default function Hands({ cards }) {
  return (
    <div>
      <div>{cards[0]?.suit} {cards[0]?.rank}</div>
      <div>{cards[1]?.suit} {cards[1]?.rank}</div>
    </div>
  );
}
