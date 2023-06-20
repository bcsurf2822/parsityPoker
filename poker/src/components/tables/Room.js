import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Player from "./Players";
import PlayerOptions from "./PlayerOptions";
import {
  startNewGame,
  dealToPlayers,
  revealFlop,
  revealTurn,
  revealRiver,
} from "../../rtk/slices/gameSlice";

const Room = () => {
  const userInfo = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch();

  const handleNewGame = () => {
    dispatch(startNewGame());
    dispatch(dealToPlayers());
  };

  const handleDealCards = () => {
    dispatch(dealToPlayers());
  };

  const handleRevealFlop = () => {
    dispatch(revealFlop());
  };

  const handleRevealTurn = () => {
    dispatch(revealTurn());
  };

  const handleRevealRiver = () => {
    dispatch(revealRiver());
  };

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
          <div className="table">Table</div>
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

      <button onClick={handleNewGame}>Start New Game</button>
      <button onClick={handleDealCards}>Deal Cards</button>
      <button onClick={handleRevealFlop}>Reveal Flop</button>
      <button onClick={handleRevealTurn}>Reveal Turn</button>
      <button onClick={handleRevealRiver}>Reveal River</button>
    </Container>
  );
};

export default Room;
