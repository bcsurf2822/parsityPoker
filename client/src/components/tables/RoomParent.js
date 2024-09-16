import React from "react";
import NewRoom from "./NewRoom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function RoomParent() {


  const currentGame = useSelector((state) => state.currentGame.currentGame);
  console.log("Current Game Parent Room:", currentGame);




  return (
    <div className="responsive-box">

      <NewRoom />
    </div>
  );
}
