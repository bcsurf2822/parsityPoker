import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGames, viewTable, joinGame, leaveGame } from "../../rtk/slices/serverSlice";
import cardToFilename from "../../actions/cardImages";

const Player = ({ gameId, name, avatar, chips, bet, isDealer, seat = {}, userInfo, dispatch, isPlayerSitting }) => {
  const [isSitting, setIsSitting] = useState(false);

  const sitHere = () => {
    console.log('sitHere was called');
    console.log('seat:', seat);
    console.log('user:', userInfo);
    console.log("Param gameId", gameId)
    if (seat && !seat.player && userInfo) {
      dispatch(joinGame({ userId: userInfo.id, gameId: gameId, buyIn: 500, seatId: seat._id }));
      // Update the state once the user sits
      setIsSitting(true);
    }
  };
  if (seat && seat.player) {
    name = userInfo.username;
    chips = seat.player.chips;
    bet = seat.player.bet;
  }
  
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>{isSitting ? userInfo.username : name} {isDealer ? "(Dealer)" : ""}</Card.Title>
        <div>
          {userInfo && !isPlayerSitting && (
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

const Room = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.user);
  const { games, viewedGame } = useSelector((state) => state.server);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [isPlayerSitting, setIsPlayerSitting] = useState(false); 

// This will update isPlayerSitting state once a user sits down
useEffect(() => {
  if (viewedGame && viewedGame.game) {
    setIsPlayerSitting(viewedGame.game.seats.some(seat => seat.player && seat.player.userId === userInfo.id));
  }
}, [viewedGame, userInfo]);

  console.log("RoomID", id)
  console.log("userInfo", userInfo)
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

  const handleLeaveGame = async () => {
    try {
      await dispatch(leaveGame({ gameId: id, userId: userInfo.id }));
      // After the user leaves the table, refetch the game data to update the viewedGame state
      dispatch(viewTable(id));
    } catch (error) {
      console.log('Error leaving the game:', error);
    }
  };
  
  return (
    <Container fluid className="h-100 bg">
      {viewedGame && viewedGame.game ? (
        
        <>
        <Row className="mt-2">
  <Col className="d-flex justify-content-center">
    <Button variant="warning" onClick={handleLeaveGame}>
      Leave Table
    </Button>
  </Col>
</Row>
          <Row className="h-50">
            <Col></Col>
            <Col className="d-flex justify-content-center">
              <Player
                gameId={id}
                name={`Seat ${viewedGame.game.seats[0].id}`}
                seat={findSeat(0)}
                isDealer={false}
                userInfo={userInfo}
                dispatch={dispatch}
                isPlayerSitting={isPlayerSitting}
                isSitting={isPlayerSitting && viewedGame.game.seats[0].player?.userId === userInfo.id}
              />
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-center">
              <Player
                gameId={id}
                name={`Seat ${viewedGame.game.seats[1].id}`}
                seat={findSeat(1)}
                isDealer={false}
                userInfo={userInfo}
                dispatch={dispatch}
                isSitting={isPlayerSitting && viewedGame.game.seats[1].player?.userId === userInfo.id}
              />
            </Col>
            <Col></Col>
          </Row>
          <Row className="h-50">
            <Col className="d-flex justify-content-center">
            <Player gameId={id} name={`Seat ${viewedGame.game.seats[2].id}`} seat={findSeat(2)}  isDealer={false} userInfo={userInfo} dispatch={dispatch} />     
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-center">
            <div className="table">
              {viewedGame.game.name}
            </div>
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-center">
            <Player gameId={id} name={`Seat ${viewedGame.game.seats[3].id}`} seat={findSeat(3)}  isDealer={false} userInfo={userInfo} dispatch={dispatch}        isSitting={isPlayerSitting && viewedGame.game.seats[2].player?.userId === userInfo.id}  />       
            </Col>
          </Row>
          <Row className="h-50">
            <Col></Col>
            <Col className="d-flex justify-content-center">
            <Player gameId={id} name={`Seat ${viewedGame.game.seats[4].id}`} seat={findSeat(4)}  isDealer={false} userInfo={userInfo} dispatch={dispatch}        isSitting={isPlayerSitting && viewedGame.game.seats[4].player?.userId === userInfo.id} />          
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-center">
            <Player gameId={id} name={`Seat ${viewedGame.game.seats[5].id}`} seat={findSeat(5)}  isDealer={false} userInfo={userInfo} dispatch={dispatch}        isSitting={isPlayerSitting && viewedGame.game.seats[1].player?.userId === userInfo.id} /> 
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
