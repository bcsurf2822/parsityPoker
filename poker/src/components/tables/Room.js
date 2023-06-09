import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Player from "./Players";
import PlayerOptions from "./PlayerOptions";

const Room = () => {
  const userInfo = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return (
    <Container fluid className="h-100 bg">
      <Row className="h-50">
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player name="Player 1"  chips={500} bet={20} isDealer={true} />      
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player name="Player 2"  chips={500} bet={20} isDealer={true} />            
        </Col>
        <Col></Col>
      </Row>
      <Row className="h-50">
        <Col className="d-flex justify-content-center">
          <Player name="Player 3" chips={500} bet={20} isDealer={true} />      
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <div className="table">Table</div>
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player name="Player 4"  chips={500} bet={20} isDealer={true} />            
        </Col>
      </Row>
      <Row className="h-50">
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Player name="Player 5"  chips={500} bet={20} isDealer={true} />            
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
  {isAuthenticated ? (
    <div>
      <Player name={userInfo.username}  chips={userInfo.balance} bet={20} isDealer={true} />
      <PlayerOptions />
    </div>
  ) : (
    <Player name="Player 6"  chips={500} bet={20} isDealer={true} />
  )}
</Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Room;

{/* <div className="App" style={{ 
  backgroundImage: `url(/table/Table.jpg)`,  // Note this line 
  backgroundSize: 'cover', 
  backgroundPosition: 'center center', 
  height: '80vh', 
  width: '100vw'
}}>
</div> */}