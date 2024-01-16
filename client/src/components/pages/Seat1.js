import React from 'react';

const Seat1 = ({ seatNumber }) => {
    return <div className={`poker-seat seat-${seatNumber}`}>Seat {seatNumber}</div>;
};

export default Seat1;
