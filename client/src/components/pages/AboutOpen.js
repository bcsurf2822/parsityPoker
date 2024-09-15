import React from "react";
import { Button } from "react-bootstrap";

const AboutOpenPokerRoomButton = ({ gameId }) => {
    const openPokerRoom = () => {
        const pokerRoomUrl = `/room/${gameId}`;
        const windowFeatures =
        "menubar=no,toolbar=no,status=no,width=800,height=600";
        window.open(pokerRoomUrl, `PokerRoomWindow_${gameId}`, windowFeatures);
    };
  const openSamplePokerRoom = () => {
    const pokerRoomUrl = "/poker-room";

    const windowFeatures =
      "menubar=no,toolbar=no,status=no,width=800,height=600";
    window.open(pokerRoomUrl, "PokerRoomWindow", windowFeatures);
  };

  return (
    <div>
   
      <Button variant="primary" onClick={openSamplePokerRoom}>
        View
      </Button>
         <Button className="btn btn-warning" onClick={openPokerRoom}>View</Button>
    </div>
  );
};

export default AboutOpenPokerRoomButton;
