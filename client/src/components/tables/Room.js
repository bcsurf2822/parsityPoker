// import { Container, Row, Col, Button } from "react-bootstrap";
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

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import Chatbox from "./Chatbox";
import Table from "./TableDetails/Table";
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
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      className="bg"
    >
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <IconButton
              onClick={() => handleLeaveGame(user.id, id)}
              style={{ marginRight: "-12px", marginTop: "-12px" }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          {/* Top Row */}
          <Grid item xs={3}></Grid>
          <Grid item xs={3} className="d-flex justify-content-center">
            <Seat seat={seatArray[0]} currentGame={currentGame} />
          </Grid>
          <Grid item xs={3} className="d-flex justify-content-center">
            <Seat seat={seatArray[1]} currentGame={currentGame} />
          </Grid>
          <Grid item xs={3}></Grid>

          {/* Middle Row with Table */}
          <Grid item xs={3} className="d-flex justify-content-center">
            <Seat seat={seatArray[2]} currentGame={currentGame} />
          </Grid>
          <Grid
            item
            xs={6}
            className="pokerTable d-flex justify-content-center flex-column align-items-center"
            style={{ height: '300px', width: '600px' }}
          >
            <Grid item xs={12}>
              {currentGameLoading && <Spinner />}
            </Grid>

            <Table cards={currentGame.communityCards} pot={currentGame.pot} />
          </Grid>
          <Grid item xs={3} className="d-flex justify-content-center">
            <Seat seat={seatArray[3]} currentGame={currentGame} />
          </Grid>

          {/* Bottom Row */}
          <Grid item xs={3}></Grid>
          <Grid item xs={3} className="d-flex justify-content-center">
            <Seat seat={seatArray[4]} currentGame={currentGame} />
          </Grid>
          <Grid item xs={3} className="d-flex justify-content-center">
            <Seat seat={seatArray[5]} currentGame={currentGame} />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Room;
