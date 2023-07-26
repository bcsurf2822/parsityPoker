import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Seat = ({ seat }) => {
  return (
    <div className="d-flex justify-content-center seat">
      <p>{seat && `Seat ${seat.id}`}</p>
      {seat && !seat.player && <Button className="sit-here">Sit here</Button>}
    </div>
  );
};

export default Seat;