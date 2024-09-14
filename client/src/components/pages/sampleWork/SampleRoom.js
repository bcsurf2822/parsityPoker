import React from "react";
import TableAndChairs from "./TableAndChairs";

export default function SampleRoom() {
  return (
    <div className="responsive-box">
      <div className="sRoomExit"><button type="button" class="btn-close" aria-label="Close"></button></div>
      <TableAndChairs />
  </div>
  );
}
