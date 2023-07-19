import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGames, viewTable } from "../../rtk/slices/serverSlice";
import Player from "./Players";
import PlayerOptions from "./PlayerOptions";

const Room = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const { games, viewedGame } = useSelector((state) => state.server); // changed state.games to state.server
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  useEffect(() => {
    dispatch(fetchGames()).then(() => {
      dispatch(viewTable(id));
    });
  }, [id, dispatch]);

  useEffect(() => {
    const game = games.find(game => game._id === id); // make sure 'id' corresponds to '_id' in your 'games' objects
    
    if (game) {
      console.log(game.name);
    }
  }, [games, id]);
  
  return (
    <Container fluid className="h-100 bg">
      <Row className="h-50">
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player id={1} name="Player 1"  chips={500} bet={20} isDealer={true} />      
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player id={2} name="Player 2"  chips={500} bet={20} isDealer={true} />            
        </Col>
        <Col></Col>
      </Row>
      <Row className="h-50">
        <Col className="d-flex justify-content-center">
          <Player id={3} name="Player 3" chips={500} bet={20} isDealer={true} />      
        </Col>
        <Col></Col>
<Col className="d-flex justify-content-center">
  <div className="table">
 {viewedGame.game.name}
  </div>
</Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player id={4} name="Player 4"  chips={500} bet={20} isDealer={true} />            
        </Col>
      </Row>
      <Row className="h-50">
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player id={5} name="Player 5"  chips={500} bet={20} isDealer={true} />            
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
  {isAuthenticated ? (
    <div>
      <Player id={userInfo.id} name={userInfo.username}  chips={userInfo.balance} bet={20} isDealer={true} />
      <PlayerOptions />
    </div>
  ) : (
    <Player id={6} name="Player 6"  chips={500} bet={20} isDealer={true} />
  )}
</Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Room;