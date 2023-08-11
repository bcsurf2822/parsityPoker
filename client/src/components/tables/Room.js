import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchGames,
  leaveGame,
  playerLeft,
} from "../../rtk/slices/serverSlice";
import { newDeck, dealCards, endGame } from "../../rtk/slices/deckOfCardsSlice";
import Chatbox from "./Chatbox";
import { socket } from "../../socket";

import Seat from "./Seats";

const Room = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const games = useSelector((state) => state.server.games);
  const currentGame = games.find((game) => game._id === id);
  console.log("Current Game:", currentGame);

  useEffect(() => {
    socket.on("cards_dealt", (updatedGame) => {
      dispatch(dealCards(updatedGame)); // The action that updates the game state with dealt cards
    });

    return () => {
      socket.off("cards_dealt");
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  useEffect(() => {
    socket.on("playerLeft", (updatedGame) => {
      dispatch(playerLeft(updatedGame));
    });

    return () => {
      socket.off("playerLeft");
    };
  }, [dispatch]);

  const seatArray = currentGame ? currentGame.seats : [];
  const occupiedSeats = currentGame
    ? currentGame.seats.filter((seat) => seat.player !== null).length
    : 0;

  console.log(`Number of occupied seats: ${occupiedSeats}`);

  const leaveTable = () => {
    if (!user) {
      console.log("User is undefined");
      return;
    }

    dispatch(leaveGame({ gameId: id, userId: user.id }))
      .then(() => {
        const updatedGame = games.find((game) => game._id === id);
        if (!updatedGame) {
          navigate("/Tables");
        }
      })
      .catch((error) => console.log("Error leaving the game:", error));
  };

  const closeTable = () => {
    navigate("/Tables");
  };

  const handleEndGame = () => {
    if (!currentGame) {
      console.log("Current game is undefined");
      return;
    }

    dispatch(endGame(id))
      .then(() => console.log("Game ended manually"))
      .catch((error) => console.log("Error ending the game:", error));
  };

  if (!currentGame) {
    return null;
  }

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
          <Seat seat={seatArray[0]} currentGame={currentGame} />
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[1]} currentGame={currentGame} />
        </Col>
        <Col></Col>
      </Row>
      <Row className="h-50">
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[2]} currentGame={currentGame} />
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <div className="table">{currentGame.name}</div>
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[3]} currentGame={currentGame} />
        </Col>
      </Row>
      <Row className="h-50">
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[4]} currentGame={currentGame} />
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[5]} currentGame={currentGame} />
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
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <Button variant="danger" onClick={handleEndGame}>
            End Game
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
};

export default Room;
