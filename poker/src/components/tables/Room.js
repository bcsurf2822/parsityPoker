import { Container, Row, Col, Button  } from "react-bootstrap";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGames, viewTable } from "../../rtk/slices/serverSlice";
import Player from "./Players";
import PlayerOptions from "./PlayerOptions";

const Room = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.user);
  const { games, viewedGame } = useSelector((state) => state.server);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  useEffect(() => {
    dispatch(fetchGames()).then(() => {
      dispatch(viewTable(id));
    });
  }, [id, dispatch]);

  const closeTable = () => {
    navigate("/Tables");
    console.log("Table closed");
  };

  console.log(viewedGame, "gamename");
  console.log(games)
  
  return (
    <Container fluid className="h-100 bg">
      <Row className="h-50">
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player id={1} name="Seat 1"   isDealer={false} />      
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player id={2} name="Seat 2"  isDealer={false} />            
        </Col>
        <Col></Col>
      </Row>
      <Row className="h-50">
        <Col className="d-flex justify-content-center">
          <Player id={3} name="Seat 3"  isDealer={false} />      
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
  <div className="table">
    {viewedGame && viewedGame.game ? viewedGame.game.name : 'Loading...'}
  </div>
</Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player id={4} name="Seat 4"  isDealer={false} />            
        </Col>
      </Row>
      <Row className="h-50">
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player id={5} name="Seat 5"  isDealer={false} />            
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
  {isAuthenticated ? (
    <div>
      <Player id={userInfo.id} name={userInfo.username}  chips={userInfo.balance} bet={20} isDealer={false} />
      <PlayerOptions />
    </div>
  ) : (
    <Player id={6} name="Seat 6" isDealer={false}  />
  )}
</Col>
        <Col></Col>
      </Row>
      <Row className="mt-2"> {/* Add some margin on the top */}
        <Col className="d-flex justify-content-center">
          <Button variant="danger" onClick={closeTable}>X</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Room;