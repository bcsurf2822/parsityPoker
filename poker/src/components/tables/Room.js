import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGames, viewTable, joinGame } from "../../rtk/slices/serverSlice";
import cardToFilename from "../../actions/cardImages";

const Room = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.user);
  const { games, viewedGame } = useSelector((state) => state.server);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("RoomID", id)

  const findSeat = (index) => {
    const seat = viewedGame && viewedGame.game.seats ? viewedGame.game.seats[index] : null;
    console.log("seatID:", seat?._id);
    return seat;
}
  
  useEffect(() => {
    dispatch(fetchGames()).then(() => {
      dispatch(viewTable(id));
    });
  }, [id, dispatch]);

  const closeTable = () => {
    navigate("/Tables");
    console.log("Table closed");
  };
  const Player = ({ gameId, name, avatar, chips, bet, isDealer, seat = {} }) => {
    const sitHere = () => {
      console.log('sitHere was called');
      console.log('seat:', seat);
      console.log('user:', userInfo);
      console.log("Param gameId", gameId)
      if (seat && !seat.player && userInfo) {
        dispatch(joinGame({ userId: userInfo._id, gameId: gameId, buyIn: 500, seatId: seat._id }));
      }
    };
  
    if (seat && seat.player) {
      name = seat.player.user.username;
      avatar = seat.player.user.avatar;
      chips = seat.player.chips;
      bet = seat.player.bet;
    }
  
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={avatar} />
        <Card.Body>
          <Card.Title>{name} {isDealer ? "(Dealer)" : ""}</Card.Title>
          <div>
          {isAuthenticated && (
            <Button variant="success" onClick={sitHere}>Sit Here</Button>
          )}
          </div>
          <Card.Text>
            Chips: {chips}
          </Card.Text>
          <Card.Text>
            Current Bet: {bet}
          </Card.Text>
        </Card.Body>
      </Card>
    );
};
  
  console.log(games)
  
  return (
    <Container fluid className="h-100 bg">
      {viewedGame && viewedGame.game ? (
        <>
          <Row className="h-50">
            <Col></Col>
            <Col className="d-flex justify-content-center">
            <Player gameId={id} name={`Seat ${viewedGame.game.seats[0].id}`} seat={findSeat(0)}  isDealer={false} /> 
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-center">
            <Player gameId={id} name={`Seat ${viewedGame.game.seats[1].id}`} seat={findSeat(1)}  isDealer={false} />        
            </Col>
            <Col></Col>
          </Row>
          <Row className="h-50">
            <Col className="d-flex justify-content-center">
            <Player gameId={id} name={`Seat ${viewedGame.game.seats[2].id}`} seat={findSeat(2)}  isDealer={false} />     
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-center">
            <div className="table">
              {viewedGame.game.name}
            </div>
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-center">
            <Player gameId={id} name={`Seat ${viewedGame.game.seats[3].id}`} seat={findSeat(3)}  isDealer={false} />       
            </Col>
          </Row>
          <Row className="h-50">
            <Col></Col>
            <Col className="d-flex justify-content-center">
            <Player gameId={id} name={`Seat ${viewedGame.game.seats[4].id}`} seat={findSeat(4)}  isDealer={false} />          
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-center">
            <Player gameId={id} name={`Seat ${viewedGame.game.seats[5].id}`} seat={findSeat(5)}  isDealer={false} /> 
            </Col>
            <Col></Col>
          </Row>
          <Row className="mt-2">
            <Col className="d-flex justify-content-center">
              <Button variant="danger" onClick={closeTable}>X</Button>
            </Col>
          </Row>
        </>
      ) : (
        'Loading...'
      )}
    </Container>
  );
};

export default Room;
