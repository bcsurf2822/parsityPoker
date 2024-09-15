import React from "react";
import SampleTableChairs from "./SampleTableChairs";

export default function SampleRoom() {
  return (
    <div className="responsive-box">
      <div className="sRoomExit"><button type="button" class="btn-close" aria-label="Close"></button></div>
      <SampleTableChairs />
  </div>
  );
}
