import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchGames,
  viewTable,
  leaveGame,
} from "../../rtk/slices/serverSlice";
import Player from "./Player";
import cardToFilename from "../../actions/cardImages";

const Room = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.user);
  const { viewedGame } = useSelector((state) => state.server);
  console.log("viewedGame from Room", viewedGame)

  const [isPlayerSitting, setIsPlayerSitting] = useState(false);

  const { games } = useSelector((state) => state.server);
  console.log("Games from Rooms", games)
  
  useEffect(() => {
    if (viewedGame && viewedGame.game) {
      setIsPlayerSitting(
        viewedGame.game.seats.some(
          (seat) => seat.player && seat.player.userId === userInfo.id
        )
      );
    }
  }, [viewedGame, userInfo]);

  const findSeat = (index) => {
    const seat =
      viewedGame && viewedGame.game.seats ? viewedGame.game.seats[index] : null;
    return seat;
  };

  useEffect(() => {
    dispatch(fetchGames()).then(() => {
      dispatch(viewTable(id)).then(() => {      });
    });
  }, [id, dispatch]);

  const closeTable = () => {
    navigate("/Tables");
  };

  const handleLeaveGame = async () => {
    try {
      await dispatch(leaveGame({ gameId: id, userId: userInfo.id }));
      dispatch(viewTable(id));
    } catch (error) {
      console.log("Error leaving the game:", error);
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
                setIsPlayerSitting={setIsPlayerSitting} 
                isSitting={
                  isPlayerSitting &&
                  viewedGame.game.seats[0].player?.userId === userInfo.id
                }
                gameMin={viewedGame.game.min} 
                gameMax={viewedGame.game.max} 
                chips={findSeat(0).player ? findSeat(0).player.chips : 0}
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
                isPlayerSitting={isPlayerSitting}
                setIsPlayerSitting={setIsPlayerSitting} 
                isSitting={
                  isPlayerSitting &&
                  viewedGame.game.seats[1].player?.userId === userInfo.id
                }
                gameMin={viewedGame.game.min} 
                gameMax={viewedGame.game.max}
                chips={findSeat(1).player ? findSeat(1).player.chips : 0}
              />
            </Col>
            <Col></Col>
          </Row>
          <Row className="h-50">
            <Col className="d-flex justify-content-center">
              <Player
                gameId={id}
                name={`Seat ${viewedGame.game.seats[2].id}`}
                seat={findSeat(2)}
                isDealer={false}
                userInfo={userInfo}
                dispatch={dispatch}
                isPlayerSitting={isPlayerSitting}
                setIsPlayerSitting={setIsPlayerSitting} 
                isSitting={
                  isPlayerSitting &&
                  viewedGame.game.seats[2].player?.userId === userInfo.id
                }
                gameMin={viewedGame.game.min} 
                gameMax={viewedGame.game.max}
                chips={findSeat(2).player ? findSeat(2).player.chips : 0}
                
              />
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-center">
              <div className="table">{viewedGame.game.name}</div>
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-center">
              <Player
                gameId={id}
                name={`Seat ${viewedGame.game.seats[3].id}`}
                seat={findSeat(3)}
                isDealer={false}
                userInfo={userInfo}
                dispatch={dispatch}
                isPlayerSitting={isPlayerSitting}
                setIsPlayerSitting={setIsPlayerSitting} 
                isSitting={
                  isPlayerSitting &&
                  viewedGame.game.seats[3].player?.userId === userInfo.id
                }
                gameMin={viewedGame.game.min} 
                gameMax={viewedGame.game.max}
                chips={findSeat(3).player ? findSeat(3).player.chips : 0}
              />
            </Col>
          </Row>
          <Row className="h-50">
            <Col></Col>
            <Col className="d-flex justify-content-center">
              <Player
                gameId={id}
                name={`Seat ${viewedGame.game.seats[4].id}`}
                seat={findSeat(4)}
                isDealer={false}
                userInfo={userInfo}
                dispatch={dispatch}
                isPlayerSitting={isPlayerSitting}
                setIsPlayerSitting={setIsPlayerSitting}
                isSitting={
                  isPlayerSitting &&
                  viewedGame.game.seats[4].player?.userId === userInfo.id
                }
                gameMin={viewedGame.game.min} 
                gameMax={viewedGame.game.max}
                chips={findSeat(4).player ? findSeat(4).player.chips : 0}
              />
            </Col>
            <Col></Col>
            <Col className="d-flex justify-content-center">
              <Player
                gameId={id}
                name={`Seat ${viewedGame.game.seats[5].id}`}
                seat={findSeat(5)}
                isDealer={false}
                userInfo={userInfo}
                dispatch={dispatch}
                isPlayerSitting={isPlayerSitting}
                setIsPlayerSitting={setIsPlayerSitting}
                isSitting={
                  isPlayerSitting &&
                  viewedGame.game.seats[5].player?.userId === userInfo.id
                }
                gameMin={viewedGame.game.min} 
                gameMax={viewedGame.game.max}
                chips={findSeat(5).player ? findSeat(5).player.chips : 0}
              />
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
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};

export default Room;
