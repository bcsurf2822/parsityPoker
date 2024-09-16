import React from "react";
import { Button } from "react-bootstrap";

const OpenRoomButton = ({ gameId }) => {
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

  const switchedRoom = () => {
    const pokerRoomUrl = `/new-room/${gameId}`;

    const windowFeatures =
      "menubar=no,toolbar=no,status=no,width=800,height=600";
    window.open(pokerRoomUrl, `PokerRoomWindow_${gameId}`, windowFeatures);
  };

  return (
    <div>
      <Button variant="secondary" onClick={openPokerRoom}>
        Main
      </Button>
      <Button variant="primary" onClick={openSamplePokerRoom}>
        Sample
      </Button>
      <Button variant="primary" onClick={switchedRoom}>
      New
      </Button>
    </div>
  );
};

export default OpenRoomButton;
