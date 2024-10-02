import React from "react";
import { Button } from "react-bootstrap";

const OpenRoomButton = ({ gameId }) => {
  const openExperimentalRoom = () => {

    const expRoomUrl = `/exp/${gameId}`;
    const windowFeatures =
      "menubar=no,toolbar=no,status=no,width=900,height=900";
    window.open(expRoomUrl, `PokerRoomWindow_${gameId}`, windowFeatures);
  };

  const openRoom = () => {
    const pokerRoomUrl = `/poker/${gameId}`;

    const windowFeatures =
      "menubar=no,toolbar=no,status=no,width=900,height=900";
    window.open(pokerRoomUrl, `PokerRoomWindow_${gameId}`, windowFeatures);
  };

  return (
    <div>
      {/* <Button variant="secondary" onClick={openPokerRoom}>
        Main
      </Button> */}
      <Button variant="primary" onClick={openRoom}>
        New
      </Button>
      <Button variant="danger" onClick={openExperimentalRoom}>
    Exp
      </Button>
    </div>
  );
};

export default OpenRoomButton;
