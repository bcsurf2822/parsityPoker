// import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  requestGame,
  startUpdatePositionsAndBlinds,
  startEndGame,
  startDealFlop,
  startDealTurn,
  startDealRiver,
  startGetWinner,
  startPotToPlayer,
  showLoading,
  startPlayerFold,
  startPlayerCheck,
  startPlayerBet,
  startPlayerCall,
} from "../../rtk/slices/currentGameSlice";


import Table from "./TableDetails/Table";
import Seat from "./Seats";
import WinnerAlert from "./WinnerAlert";
import Spinner from "./Spinner";
import BetBox from "./BetBox";

const Room = () => {
  console.log("===============Room component rendered================");

  const { id } = useParams();
  console.log("Game ID:", id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatBalance = (balance) => balance.toFixed(2);

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
  console.log("Is Authenticated:", isAuthenticated);

  // console.log("USER:", user.username);

  const [previousSeatCount, setPreviousSeatCount] = useState(0);

  const seatArray = currentGame ? currentGame.seats : [];
  console.log("Seat Array:", seatArray);

  //User if logged in user is seated at the table
  const isUserSeated = () => {
    return seatArray.some(
      (seat) => seat.player && seat.player.username === user.username
    );
  };
  const userIsSeated = isUserSeated();
  console.log("Is User Seated:", userIsSeated);

  const findUserSeat = () => {
    return seatArray.find(
      (seat) => seat.player && seat.player.username === user.username
    );
  };

  // Use the function to get the user's seat information
  const userSeat = findUserSeat();

  console.log("userSeat", userSeat);

  //For if the user is the current player
  const isCurrentPlayer = userSeat && (userSeat.id - 1) === currentGame.currentPlayerTurn;
  console.log("Is Current Player:", isCurrentPlayer);

  //For if the user is the dealer
  const isDealer = userSeat && (userSeat.id - 1) === currentGame.dealerPosition;
  console.log("Is Dealer:", isDealer);

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

  const handleFold = (gameId, seatId) => {
    dispatch(
      startPlayerFold({ gameId: gameId, seatId: seatId, action: "fold" })
    );
  };

  const handleCheck = (gameId, seatId) => {
    dispatch(
      startPlayerCheck({ gameId: gameId, seatId: seatId, action: "check" })
    );
  };

  const handleAllIn = (gameId, seatId) => {
    dispatch(
      startPlayerBet({
        gameId: gameId,
        seatId: seatId,
        action: "all-in",
        // bet: seat.player.chips,
      })
    );
  };

  const handleCall = (gameId, seatId) => {
    dispatch(
      startPlayerCall({
        gameId: gameId,
        seatId: seatId,
        bet: currentGame.highestBet,
        action: "call",
      })
    );
  };

  const handleSliderBet = (gameId, seatId, betValue) => {
    dispatch(
      startPlayerBet({
        gameId: gameId,
        seatId: seatId,
        bet: betValue,
        action: "bet",
      })
    );
  };

  const handleRaise = (gameId, seatId, raiseValue) => {
    dispatch(
      startPlayerBet({
        gameId: gameId,
        seatId: seatId,
        bet: raiseValue,
        action: "raise",
      })
    );
  };

  //How many players are at the table?
  const occupiedSeatCount = seatArray.filter(
    (seat) => seat.player !== null
  ).length;
  console.log("Occupied Seat Count:", occupiedSeatCount);

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
    if (
      currentGame &&
      currentGame.stage === "showdown" &&
      playersWithHandCards.length > 1
    ) {
      console.log(
        "--------------------Showdown Stage. Getting winner-------------------------------------"
      );
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
    <div
      className="room-new container text-center d-flex flex-column justify-content-center"
      style={{ height: "97vh" }}
    >
      <div className="seat-row row">
        <div className="empty-l-top col bordered-col">
          {" "}
          {currentGameLoading && <Spinner />}
        </div>
        <div className="seat-top col-2 bordered-col">
          <Seat seatIndex={0} />
        </div>
        <div className="seat-top col-2 bordered-col">
          <Seat seatIndex={1} />
        </div>
        <div className="empty-r-top col bordered-col">Empty R Top</div>
      </div>

      <div className="table-row row ml-3">
        <div className="seat-mid-l col-2 bordered-col seat-height">
          <Seat seatIndex={5} />
        </div>
        <div className="table-mid col-6 bordered-col table-css">
          <Table cards={currentGame.communityCards} pot={currentGame.pot} />
        </div>
        <div className="seat-mid-r col-2 bordered-col seat-height">
          <Seat seatIndex={2} />
        </div>
      </div>

      <div className="seat-row row">
        <div className="empty-l-bot col bordered-col">Empty L Bottom</div>
        <div className="seat-bot col-2 bordered-col">
          <Seat seatIndex={3} />
        </div>
        <div className="seat-bot col-2 bordered-col">
          <Seat seatIndex={4} />
        </div>
        <div className="empty-r-bot col bordered-col">
          {" "}
          {userIsSeated && (
            <BetBox
              currentPlayer={isCurrentPlayer}
              chipsInPot={formatBalance(currentGame.pot)}
              highestBet={formatBalance(currentGame.highestBet)}
              playerChips={formatBalance(userSeat.player.chips)}
              onBet={(betValue) =>
                handleSliderBet(currentGame._id, userSeat._id, betValue)
              }
              onCall={() => handleCall(currentGame._id, userSeat._id)}
              onAllIn={() => handleAllIn(currentGame._id, userSeat._id)}
              onCheck={() => handleCheck(currentGame._id, userSeat._id)}
              onFold={() => handleFold(currentGame._id, userSeat._id)}
              onRaise={(betValue) =>
                handleRaise(currentGame, userSeat._id, betValue)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
