import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-input-slider";

import { joinGame } from "../../rtk/slices/serverSlice";

const Seat = ({ seat }) => {
  const user = useSelector((state) => state.auth.user);
  const {tableId} = useParams();
  const seatId = seat._id;

  const { viewedGame } = useSelector((state) => state.server);

  const maxBuyIn = viewedGame.game.max;
  const minBuyIn = viewedGame.game.min;

  return (
    <div className="d-flex justify-content-center seat">
      <p>{seat && `Seat ${seat.id}`}</p>
      {seat && !seat.player && <Button className="sit-here">Sit here</Button>}
    </div>
  );
};

export default Seat;