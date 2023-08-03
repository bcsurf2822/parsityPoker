import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGames, viewTable, leaveGame } from "../../rtk/slices/serverSlice";
import Chatbox from "./Chatbox";

import Seat from "./Seats";

const Room = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.auth.user);
  const games = useSelector((state) => state.server.games);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const viewedGame = games.find(game => game._id === id); 
  console.log("viewedGame", viewedGame);

  if (!viewedGame) {
    return null;
  }

  const seatArray = viewedGame.seats;
  console.log("seatArray", seatArray);

  const leaveTable = () => {
    if (!user) {
      console.log('User is undefined');
      return;
    }

    dispatch(leaveGame({ gameId: id, userId: user.id }))
      .then(() => {
        const updatedGame = games.find(game => game._id === id);
        if (!updatedGame) {
          navigate("/Tables");
        }
      })
      .catch(error => console.log("Error leaving the game:", error));
  };

  return (
    <Container fluid className="h-100 bg">
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <Button variant="warning" onClick={leaveTable}>
            Leave Table
          </Button>
        </Col>
      </Row>
      <Row className="h-50">
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[0]} viewedGame={viewedGame} />
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[1]} viewedGame={viewedGame} />
        </Col>
        <Col></Col>
      </Row>
      <Row className="h-50">
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[2]} viewedGame={viewedGame} />
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          {/* <div className="table">{gameName}</div> */}
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[3]} viewedGame={viewedGame} />
        </Col>
      </Row>
      <Row className="h-50">
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[4]} viewedGame={viewedGame} />
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[5]} viewedGame={viewedGame} />
        </Col>
        <Col></Col>
      </Row>
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <Button variant="danger" onClick={console.log("CloseTable")}>
            X
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Chatbox gameId={id} />
        </Col>
      </Row>
    </Container>
  );
  
}
 
export default Room;
