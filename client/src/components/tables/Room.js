import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  startLeaveGame,
  requestGame,
  startUpdatePositionsAndBlinds,
  startEndGame,
  startDealFlop,
  startDealTurn,
  startDealRiver,
  startGetWinner,
  startPotToPlayer,
  showLoading,
} from "../../rtk/slices/currentGameSlice";

import { getCards } from "../../actions/getCards";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Chatbox from "./Chatbox";
import Seat from "./Seats";
import WinnerAlert from "./WinnerAlert";
import Spinner from "./Spinner";

const Room = () => {
  console.log("===============Room component rendered================");
  const formatBalance = (balance) => balance.toFixed(2);

  const { id } = useParams();
  console.log("Game ID:", id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(requestGame(id));
  }, [dispatch, id]);

  const currentGame = useSelector((state) => state.currentGame.currentGame);
  console.log("Current Game:", currentGame);

  const currentGameLoading = useSelector(
    (state) => state.currentGame.currentGameLoading
  );

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [previousSeatCount, setPreviousSeatCount] = useState(0);

  const seatArray = currentGame ? currentGame.seats : [];
  console.log("Seat Array:", seatArray);

  const playersWithHandCards =
    currentGame && currentGame.seats
      ? currentGame.seats.filter(
          (seat) =>
            seat.player &&
            seat.player.handCards &&
            seat.player.handCards.length > 0
        )
      : [];
  console.log("PLayers with cards--", playersWithHandCards);

  //How many players are at the table?
  const occupiedSeatCount = seatArray.filter(
    (seat) => seat.player !== null
  ).length;
  console.log("Occupied Seat Count:", occupiedSeatCount);

  const handleLeaveGame = (userId, gameId) => {
    console.log("Dispatching startLeaveGame with params:", userId, gameId);
    dispatch(startLeaveGame({ userId, gameId }));
  };

  const closeTable = () => {
    navigate("/Tables");
  };

  //For Use When 2nd Player Joins Table
  useEffect(() => {
    const handlePlayerJoin = async () => {
      if (
        occupiedSeatCount > previousSeatCount &&
        occupiedSeatCount === 2 &&
        currentGame.gameEnd
      ) {
        console.log("2nd player has joined the table!");
        await dispatch(showLoading());
        dispatch(startUpdatePositionsAndBlinds({ gameId: id }));
      }
      setPreviousSeatCount(occupiedSeatCount);
    };

    handlePlayerJoin();
  }, [seatArray, currentGame]);

  //For when Only 1 player Remains EndGame Will be triggered
  useEffect(() => {
    if (occupiedSeatCount === 1) {
      console.log("Only one player left at the table. Ending game...");
      dispatch(startEndGame({ gameId: id }));
    }
  }, [occupiedSeatCount, id, dispatch]);

  //FLOP RULES
  useEffect(() => {
    if (
      currentGame &&
      currentGame.stage === "flop" &&
      currentGame.communityCards.length === 0 &&
      playersWithHandCards.length > 1 &&
      currentGame.gameRunning
    ) {
      dispatch(startDealFlop({ gameId: id }));
    }
  }, [currentGame, id, dispatch]);

  //TURN RULES
  useEffect(() => {
    if (
      currentGame &&
      currentGame.stage === "turn" &&
      currentGame.communityCards.length === 3 &&
      playersWithHandCards.length > 1 &&
      currentGame.gameRunning
    ) {
      dispatch(startDealTurn({ gameId: id }));
    }
  }, [currentGame, id, dispatch]);

  //RIVER RULES
  useEffect(() => {
    if (
      currentGame &&
      currentGame.stage === "river" &&
      currentGame.communityCards.length === 4 &&
      playersWithHandCards.length > 1 &&
      currentGame.gameRunning
    ) {
      dispatch(startDealRiver({ gameId: id }));
    }
  }, [currentGame, id, dispatch]);

  //When stage is showdown and there is more than 1 player with handCards
  useEffect(() => {
    if (currentGame && currentGame.stage === "showdown" && playersWithHandCards.length > 1) {
      console.log("--------------------Showdown Stage. Getting winner-------------------------------------");
      dispatch(startGetWinner({ gameId: id }));
    }
  }, [currentGame, playersWithHandCards, dispatch, id]);

  //When All players Fold
  useEffect(() => {
    if (
      playersWithHandCards.length === 1 &&
      currentGame &&
      currentGame.gameRunning
    ) {
      console.log("Only one player with hand cards. Transferring pot...");
      dispatch(startPotToPlayer({ gameId: id }));
    }
  }, [playersWithHandCards, currentGame, id, dispatch]);

  useEffect(() => {
    const restartGameIfConditionsMet = async () => {
      if (
        currentGame &&
        currentGame.stage === "end" &&
        occupiedSeatCount >= 2
      ) {
        console.log("Restarting the game...");
        await dispatch(showLoading());
        dispatch(startUpdatePositionsAndBlinds({ gameId: id }));
      }
    };

    restartGameIfConditionsMet();
  }, [currentGame, occupiedSeatCount, dispatch, id]);

  if (!currentGame) {
    return null;
  }

  return (
    <Container fluid className="h-100 bg">
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
        </Col>
      </Row>
      <Row className="mt-2">
        <Row className="mt-2">
          <Col className="d-flex justify-content-center">
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
        <Col className="communityCards d-flex justify-content-center flex-column align-items-center">
          <div className="loading">{currentGameLoading && <Spinner />}</div>
          <div className="pot">
            <AttachMoneyIcon />
            {formatBalance(currentGame.pot)}
          </div>
          {currentGame.communityCards &&
            currentGame.communityCards.length > 0 && (
              <div className="community-cards">
                {currentGame.communityCards.map((card, index) => (
                  <img
                    key={index}
                    src={getCards(card)}
                    alt={`Card ${card}`}
                    className="card-image"
                  />
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
    </Container>
  );
};

export default Room;
