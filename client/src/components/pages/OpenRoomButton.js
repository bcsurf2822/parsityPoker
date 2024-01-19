import React from 'react';
import { Button } from 'react-bootstrap';

const OpenPokerRoomButton = ({ gameId }) => {
    const openPokerRoom = () => {
        const pokerRoomUrl = `/room/${gameId}`;
        const windowFeatures = "menubar=no,toolbar=no,status=no,width=800,height=600";
        // Use gameId to create a unique window name for each game
        window.open(pokerRoomUrl, `PokerRoomWindow_${gameId}`, windowFeatures);
    };

    return (
        <Button variant='primary' onClick={openPokerRoom}>View</Button>
    );
};

export default OpenPokerRoomButton;
