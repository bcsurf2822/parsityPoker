import { useDispatch, useSelector } from "react-redux";
import Slider from "react-input-slider";

import {
  startPlayerBet,
  startPlayerCheck,
  startPlayerFold,
  startJoinGame,
  startPlayerCall,
  startLeaveGame,
} from "../../rtk/slices/currentGameSlice";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";

import Typography from "@mui/material/Typography";


import Modal from "@mui/material/Modal";
import { useState } from "react";
import BetBox from "./BetBox";
import HandCards from "./SeatDetails/HandCards";
import UserNameAndChips from "./SeatDetails/UserNameAndChips";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const OldSeat = ({ seatIndex }) => {
  const user = useSelector((state) => state.auth.user);

  const seat = useSelector(
    (state) => state.currentGame.currentGame.seats[seatIndex]
  );
  const currentGame = useSelector((state) => state.currentGame.currentGame);

  const formatBalance = (balance) => balance.toFixed(2);

  const dispatch = useDispatch();

  const tableId = currentGame._id;
  const maxBuyIn = currentGame.max;
  const minBuyIn = currentGame.min;
  const cards = seat.player ? seat.player.handCards : [];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSeatChoice(false);
  };

  const [sliderValue, setSliderValue] = useState(minBuyIn);
  const [seatChoice, setSeatChoice] = useState(false);

  const handleClick = () => {
    setSeatChoice(true);
  };

  const handleConfirm = (gameId, userId, seatId, buyIn) => {
    console.log(
      "Dispatching startJoinGame with params:",
      gameId,
      userId,
      seatId,
      buyIn
    );
    dispatch(startJoinGame({ userId, gameId, seatId, buyIn }));
  };

  const isDealer = currentGame.dealerPosition === seat.id - 1;
  const isCurrentPlayer = currentGame.currentPlayerTurn === seat.id - 1;

  const handleLeaveGame = (userId, gameId) => {
    console.log("Dispatching startLeaveGame with params:", userId, gameId);
    dispatch(startLeaveGame({ userId, gameId }));
  };

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
        bet: seat.player.chips,
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

  return (
    <div className="d-flex justify-content-center seat">
      {" "}
      {seat && (
        <>
          {seat.player ? (
            <>
              <div className="bg-light p-3" style={{ maxWidth: "360px" }}>
                <div className="mt-3 ml-1 mb-1">
                  <HandCards cards={cards} />
                </div>
                <hr />
                <div className="my-3 mx-2">
                  <UserNameAndChips
                    user={seat.player.username}
                    chipCount={seat.player.chips}
                    seatNumber={seat.id}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleLeaveGame(user.id, tableId)}
                  >
                    Leave
                  </Button>
                </div>

                {isCurrentPlayer && (
                  <div className="m-2">
                    <div className="d-flex justify-content-between">
                      <BetBox
                        chipsInPot={formatBalance(currentGame.pot)}
                        highestBet={formatBalance(currentGame.highestBet)}
                        playerChips={formatBalance(seat.player.chips)}
                        onBet={(betValue) =>
                          handleSliderBet(tableId, seat._id, betValue)
                        }
                        onCall={() => handleCall(tableId, seat._id)}
                        onAllIn={() => handleAllIn(tableId, seat._id)}
                        onCheck={() => handleCheck(tableId, seat._id)}
                        onFold={() => handleFold(tableId, seat._id)}
                        onRaise={(betValue) =>
                          handleRaise(tableId, seat._id, betValue)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {seatChoice ? (
                <>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Select Buy-In Amount
                      </Typography>
                      <Slider
                        xstep={1}
                        xmin={minBuyIn}
                        xmax={maxBuyIn}
                        x={sliderValue}
                        onChange={({ x }) => setSliderValue(x)}
                      />
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Do you wish to buy in with {sliderValue} chips and sit
                        here?
                      </Typography>
                      <Button
                        className="buyIn"
                        onClick={() => {
                          handleConfirm(
                            tableId,
                            user.id,
                            seat._id,
                            sliderValue
                          );
                          handleClose();
                        }}
                      >
                        Buy In for ${sliderValue}
                      </Button>
                    </Box>
                  </Modal>
                </>
              ) : (
                <IconButton
                  aria-label="add"
                  onClick={() => {
                    handleClick();
                    handleOpen();
                  }}
                >
                  <AddIcon />
                </IconButton>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OldSeat;
