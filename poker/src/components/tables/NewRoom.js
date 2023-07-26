import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchGames, viewTable, leaveGame } from "../../rtk/slices/serverSlice";

const NewRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const seatInfo = useSelector((state) => state.server);
  console.log("seatInfo from NewRoom", seatInfo)

  const { viewedGame } = useSelector((state) => state.server);
  console.log("viewedGame from New", viewedGame)

  const gameName = viewedGame.game.name;
  console.log("gameName from New", gameName)

  useEffect(() => {
    dispatch(fetchGames()).then(() => {
      dispatch(viewTable(id)).then(() => {      });
    });
  }, [id, dispatch]);

  return (  
    <Container fluid className="h-100 bg">
        <Row className="mt-2">
          <Col className="d-flex justify-content-center">
            <Button variant="warning">
              Leave Table
            </Button>
          </Col>
        </Row>
        <Row className="h-50">
          <Col></Col>
          <Col className="d-flex justify-content-center">
<p>seat1</p>
          </Col>
          <Col></Col>
          <Col className="d-flex justify-content-center">
          <p>seat2</p>
          </Col>
          <Col></Col>
        </Row>
        <Row className="h-50">
          <Col className="d-flex justify-content-center">
          <p>seat3</p>
          </Col>
          <Col></Col>
          <Col className="d-flex justify-content-center">
            <div className="table">Table Name</div>
          </Col>
          <Col></Col>
          <Col className="d-flex justify-content-center">
          <p>seat4</p>
          </Col>
        </Row>
        <Row className="h-50">
          <Col></Col>
          <Col className="d-flex justify-content-center">
          <p>seat5</p>
          </Col>
          <Col></Col>
          <Col className="d-flex justify-content-center">
          <p>seat6</p>
          </Col>
          <Col></Col>
        </Row>
        <Row className="mt-2">
          <Col className="d-flex justify-content-center">
            <Button variant="danger">
              X
            </Button>
          </Col>
        </Row>
  </Container>
);
}
 
export default NewRoom;