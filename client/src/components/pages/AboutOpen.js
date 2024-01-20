import React from 'react';

const AboutOpenPokerRoomButton = () => {
    const openPokerRoom = () => {
        const pokerRoomUrl = "/poker-room"; // URL of your poker room route
        const windowFeatures = "menubar=no,toolbar=no,status=no,width=800,height=600";
        window.open(pokerRoomUrl, 'PokerRoomWindow', windowFeatures);
    };

    return (
        <button onClick={openPokerRoom}>Open Poker Room</button>
    );
};

export default AboutOpenPokerRoomButton;
