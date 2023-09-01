import { Container, Row, Col, Button } from "react-bootstrap";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "lodash/isEqual";
import { useParams } from "react-router-dom";
import {
  fetchGames,
  leaveGame,
  dealCards,
  dealFlop,
  dealTurn,
  dealRiver,
  endGame,
  getWinner,
  updateCurrentPlayer,
  updatePositionsAndBlinds,
  potToPlayer
} from "../../rtk/slices/serverSlice";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import Chatbox from "./Chatbox";
import { socket } from "../../socket";
import { fetchNewDeck } from "../../rtk/slices/deckOfCardsSlice";
import Seat from "./Seats";
import useSocketListeners from "../../rtk/hooks/socketListeners";
import { setCountdown, decrementCountdown, stopCountdown } from "../../rtk/slices/timingSlice";

const Room = () => {
  console.log("===============Room component rendered================");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const user = useSelector((state) => state.auth.user);
  const games = useSelector((state) => state.server.games);
  const countDown = useSelector((state) => state.timing.value);
  const counting = useSelector((state) => state.timing.isCounting);



  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const currentGame = games.find((game) => game._id === id);
  console.log("currentGame-----------------------------------:", currentGame);
  useSocketListeners(socket, currentGame, id);

  const playersWithHandCards = useMemo(() => {
    if (currentGame && currentGame.seats) {
      return currentGame.seats.filter(
        (seat) =>
          seat.player &&
          seat.player.handCards &&
          seat.player.handCards.length > 0
      );
    }
    return [];
  }, [currentGame]);
  
  console.log("PLayers with cards---------------", playersWithHandCards)

  const seatArray = currentGame ? currentGame.seats : [];

  //Number of Seats Occupied
  const occupiedSeats = currentGame
    ? currentGame.seats.filter((seat) => seat.player !== null).length
    : 0;

    console.log("seat Info:", seatArray)


  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);


  useEffect(() => {
    if (currentGame && (!currentGame.currentDeck || currentGame.currentDeck.length === 0)) {
      console.log("Deck is empty. Fetching a new one...");
      dispatch(fetchNewDeck(id));
    }
  }, [currentGame, dispatch, id]);

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

  const handleCurrentPlayer = () => {
    dispatch(updateCurrentPlayer(id));
  };

  const handlePositionsAndBlinds = useCallback(() => {
    dispatch(updatePositionsAndBlinds(id));
}, [dispatch, id]);

  const handleEndGame = () => {
    dispatch(endGame(id));
  };

  const handleDealCards = () => {
    dispatch(dealCards(id));
  };

  const handleDealFlop = () => {
    dispatch(dealFlop(id));
  };

  const handleDealTurn = () => {
    dispatch(dealTurn(id));
  };

  const handleDealRiver = () => {
    dispatch(dealRiver(id));
  };

  
  const handleGetWinner = () => {
    console.log("get Winner called")
    dispatch(getWinner(id));
  };

  useEffect(() => {
    if (currentGame && currentGame.stage === 'flop' && currentGame.communityCards.length === 0 && playersWithHandCards.length > 1) {
      handleDealFlop();
    }
  }, [currentGame]);

  useEffect(() => {
    if (currentGame && currentGame.stage === 'turn' && currentGame.communityCards.length === 3 && playersWithHandCards.length > 1) {
      handleDealTurn();
    }
  }, [currentGame]);

  useEffect(() => {
    if (currentGame && currentGame.stage === 'river' && currentGame.communityCards.length === 4 && playersWithHandCards.length > 1) {
      handleDealRiver();
    }
  }, [currentGame]);


  useEffect(() => {
    if (playersWithHandCards.length >= 2) {
      if (currentGame && currentGame.stage === 'showdown' && !currentGame.gameEnd) {
        console.log("GETTING WINNER");
        handleGetWinner();
      }
    }
  }, [playersWithHandCards, currentGame]);

  useEffect(() => {
    console.log("About to decrement countdown");
    let interval;
    if (counting && countDown > 0) {
      interval = setInterval(() => {
        console.log("Interval is running");
        dispatch(decrementCountdown());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [dispatch, countDown, counting]);





  

// useEffect(() => {
//   if (playersWithHandCards.length === 1) {
//     console.log("GETTING WINNER DUE TO FOLD")
//     dispatch(potToPlayer(id));
//   }
// }, []);

  // useEffect(() => {
  //   if (currentGame && currentGame.stage === 'showdown' && playe)rsWithHandCards.length > 1 {
  //     console.log("GETTING WINNER")
  //     handleGetWinner();
  //   }
  // }, [currentGame]);


  if (!currentGame) {
    return null;
  }

  return (
    <Container fluid className="h-100 bg">
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <div className="table">{currentGame.name} 
          {counting && (
  <div className="countdown-display">
    Game starts in: {countDown} seconds
  </div>
)}
          </div>

          <Button variant="warning" onClick={leaveTable}>
            Leave Table
          </Button>
        </Col>
      </Row>
      <Row className="mt-2">
        <Row className="mt-2">
          <Col className="d-flex justify-content-center">
            <Button variant="success" onClick={handleCurrentPlayer}>
              Current Player
            </Button>
            <Button variant="success" onClick={handlePositionsAndBlinds}>
              Dealer
            </Button>
            <Button variant="success" onClick={handleDealCards}>
              Deal Cards
            </Button>
            <Button variant="primary" onClick={handleDealFlop}>
              Deal Flop
            </Button>
            <Button variant="primary" onClick={handleDealTurn}>
              Deal Turn
            </Button>
            <Button variant="primary" onClick={handleDealRiver}>
              Deal River
            </Button>
            <Button variant="danger" onClick={handleEndGame}>
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
