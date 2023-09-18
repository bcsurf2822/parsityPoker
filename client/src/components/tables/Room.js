import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getWinner } from "../../rtk/slices/serverSlice";

import {
  startDealCards,
  startLeaveGame,
  startUpdatePositionsAndBlinds,
  startEndGame,
  startUpdateCurrentPlayer,
  startDealFlop,
  startDealTurn,
  startDealRiver,
} from "../../rtk/slices/socketSlice";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import Chatbox from "./Chatbox";

import { fetchNewDeck } from "../../rtk/slices/deckOfCardsSlice";
import Seat from "./Seats";

const Room = () => {
  console.log("===============Room component rendered================");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [winnerData, setWinnerData] = useState(null);

  const games = useSelector((state) => state.socket.data);

  const currentGame = games.find((game) => game._id === id);
  console.log("Current Game:", currentGame);

  const playersWithHandCards =
    currentGame && currentGame.seats
      ? currentGame.seats.filter(
          (seat) =>
            seat.player &&
            seat.player.handCards &&
            seat.player.handCards.length > 0
        )
      : [];
  console.log("PLayers with cards---------------", playersWithHandCards);

  const seatArray = currentGame ? currentGame.seats : [];
  console.log("Seat Array:", seatArray);

  useEffect(() => {
    if (
      currentGame &&
      (!currentGame.currentDeck || currentGame.currentDeck.length === 0)
    ) {
      console.log("Deck is empty. Fetching a new one...");
      dispatch(fetchNewDeck(id));
    }
  }, [currentGame, dispatch, id]);

  const handleLeaveGame = (userId, gameId) => {
    console.log("Dispatching startLeaveGame with params:", userId, gameId);
    dispatch(startLeaveGame({ userId, gameId }));
  };

  const closeTable = () => {
    navigate("/Tables");
  };

  const handleCurrentPlayer = (gameId) => {
    console.log("Dispatching Current Player with params:", gameId);
    dispatch(startUpdateCurrentPlayer({ gameId: gameId }));
  };

  const handlePositionsAndBlinds = (gameId) => {
    console.log("Dispatching Pos and Blinds with params:", gameId);
    dispatch(startUpdatePositionsAndBlinds({ gameId: gameId }));
  };

  const handleEndGame = (gameId) => {
    console.log("Dispatching endGame with params:", gameId);
    dispatch(startEndGame({ gameId: gameId }));
  };

  const handleDealCards = (gameId) => {
    console.log("Dispatching dealCards with params:", gameId);
    dispatch(startDealCards({ gameId: gameId }));
  };

  const handleDealFlop = (gameId) => {
    console.log("Dispatching dealFlop with params:", gameId);
    dispatch(startDealFlop({ gameId: gameId }));
  };

  const handleDealTurn = (gameId) => {
    console.log("Dispatching dealTurn with params:", gameId);
    dispatch(startDealTurn({ gameId: gameId }));
  };

  const handleDealRiver = (gameId) => {
    console.log("Dispatching dealRiver with params:", gameId);
    dispatch(startDealRiver({ gameId: gameId }));
  };

  const handleGetWinner = () => {
    console.log("get Winner called");
    dispatch(getWinner(id));
  };

  // useEffect(() => {
  //   if (
  //     currentGame &&
  //     currentGame.stage === "flop" &&
  //     currentGame.communityCards.length === 0 &&
  //     playersWithHandCards.length > 1
  //   ) {
  //     handleDealFlop();
  //   }
  // }, [currentGame]);

  // useEffect(() => {
  //   if (
  //     currentGame &&
  //     currentGame.stage === "turn" &&
  //     currentGame.communityCards.length === 3 &&
  //     playersWithHandCards.length > 1
  //   ) {
  //     handleDealTurn();
  //   }
  // }, [currentGame]);

  // useEffect(() => {
  //   if (
  //     currentGame &&
  //     currentGame.stage === "river" &&
  //     currentGame.communityCards.length === 4 &&
  //     playersWithHandCards.length > 1
  //   ) {
  //     handleDealRiver();
  //   }
  // }, [currentGame]);

  // useEffect(() => {
  //   if (currentGame && currentGame.winnerData) {
  //     setWinnerData(currentGame.winnerData);

  //     console.log("Winner is:", currentGame.winnerData);
  //   }
  // }, [currentGame]);

  if (!currentGame) {
    return null;
  }

  return (
    <Container fluid className="h-100 bg">
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <div className="table">
            {winnerData && (
              <div className="winner-info">
                Winner is: {winnerData.name} with {currentGame.pot} points.
              </div>
            )}
          </div>
          <Button
            variant="warning"
            onClick={() => {
              handleLeaveGame(user.id, id);
            }}
          >
            Leave Table
          </Button>
        </Col>
      </Row>
      <Row className="mt-2">
        <Row className="mt-2">
          <Col className="d-flex justify-content-center">
            <Button
              variant="success"
              onClick={() => {
                handleCurrentPlayer(id);
              }}
            >
              Current Player
            </Button>
            <Button
              variant="success"
              onClick={() => {
                handlePositionsAndBlinds(id);
              }}
            >
              Dealer
            </Button>
            <Button
              variant="success"
              onClick={() => {
                handleDealCards(id);
              }}
            >
              Deal Cards
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleDealFlop(id);
              }}
            >
              Deal Flop
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleDealTurn(id);
              }}
            >
              Deal Turn
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleDealRiver(id);
              }}
            >
              Deal River
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleEndGame(id);
              }}
            >
              EndGame
            </Button>
            <Button variant="success" onClick={handleGetWinner}>
              Winner?
            </Button>
          </Col>
        </Row>
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
        <Col className="d-flex justify-content-center flex-column align-items-center">
          <div className="pot">
            <AttachMoneyIcon />
            {parseFloat(currentGame.pot).toFixed(2)}
          </div>
          {currentGame.communityCards &&
            currentGame.communityCards.length > 0 && (
              <div className="community-cards">
                {currentGame.communityCards.map((card, index) => (
                  <span key={index} className="card">
                    {card}
                  </span>
                ))}
              </div>
            )}
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
      <Row>
        <Col className="d-flex justify-content-center">
          {isAuthenticated && <Chatbox gameId={id} currentGame={currentGame} />}
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
