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
  const { viewedGame } = useSelector((state) => state.server);
  console.log("viewedGame from New", viewedGame)

  useEffect(() => {
    dispatch(fetchGames()).then(() => {
      dispatch(viewTable(id)).then(() => {
      });
    });
  }, [id, dispatch]);

  if (!viewedGame) {
    return null;
  }

  const gameName = viewedGame.game.name;

  const seatInfo = viewedGame.game.seats;
  console.log("seatInfo from New", seatInfo[0].player)

  const closeTable = () => {
    navigate("/Tables");
  };

  const leaveTable = () => {
    if (!user) {
      console.log('User is undefined');
      return;
    }
  
    console.log('Dispatching leaveGame with user:', user);
    dispatch(leaveGame({ gameId: id, userId: user.id }))
      .then(() => dispatch(viewTable(id)))
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
          <Seat seat={seatInfo[0]} />
          </Col>
          <Col></Col>
          <Col className="d-flex justify-content-center">
          <Seat seat={seatInfo[1]} />
          </Col>
          <Col></Col>
        </Row>
        <Row className="h-50">
          <Col className="d-flex justify-content-center">
          <Seat seat={seatInfo[2]} />
          </Col>
          <Col></Col>
          <Col className="d-flex justify-content-center ">
            <div className="table">{gameName}</div>
          </Col>
          <Col></Col>
          <Col className="d-flex justify-content-center">
          <Seat seat={seatInfo[3]} />
          </Col>
        </Row>
        <Row className="h-50">
          <Col></Col>
          <Col className="d-flex justify-content-center">
          <Seat seat={seatInfo[4]} />
          </Col>
          <Col></Col>
          <Col className="d-flex justify-content-center">
          <Seat seat={seatInfo[5]} />
          </Col>
          <Col></Col>
        </Row>
        <Row className="mt-2">
          <Col className="d-flex justify-content-center">
            <Button variant="danger" onClick={closeTable}>
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

