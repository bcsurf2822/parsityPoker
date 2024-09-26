import React from "react";
import { Button } from "react-bootstrap";

const OpenRoomButton = ({ gameId }) => {
  const openPokerRoom = () => {
    const pokerRoomUrl = `/room/${gameId}`;
    const windowFeatures =
      "menubar=no,toolbar=no,status=no,width=800,height=600";
    window.open(pokerRoomUrl, `PokerRoomWindow_${gameId}`, windowFeatures);
  };

  const switchedRoom = () => {
    const pokerRoomUrl = `/poker/${gameId}`;

    const windowFeatures =
      "menubar=no,toolbar=no,status=no,width=800,height=600";
    window.open(pokerRoomUrl, `PokerRoomWindow_${gameId}`, windowFeatures);
  };

  return (
    <div>
      {/* <Button variant="secondary" onClick={openPokerRoom}>
        Main
      </Button> */}
      <Button variant="primary" onClick={switchedRoom}>
        New
      </Button>
    </div>
  );
};

export default OpenRoomButton;
