import { useDispatch, useSelector } from "react-redux";
import Slider from "react-input-slider";
import { socket } from "../../socket";
import {
  joinGame,
  playerJoined,
  chipsToPot,
  playerUpdated,
  fold,
  check
} from "../../rtk/slices/serverSlice";
import DeactivatedBet from "./DeactivatedBet";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { fetchUsernameById } from "../../rtk/slices/usersSlice";
import BetBox from "./BetBox";

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

const Seat = ({ seat, currentGame }) => {
  const user = useSelector((state) => state.auth.user);
  const seatId = seat._id;
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

  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const tableId = currentGame._id;

  useEffect(() => {
    const fetchUsername = async (player) => {
      if (player) {
        const result = await dispatch(fetchUsernameById(player.user));
        setUsername(result.payload);
      }
    };

    if (seat.player) fetchUsername(seat.player);
  }, [seat, dispatch]);


  useEffect(() => {
    socket.on("playerJoined", (updatedGame) => {
      dispatch(playerJoined(updatedGame));
    });

    return () => {
      socket.off("playerJoined");
    };
  }, [dispatch]);

  useEffect(() => {
    socket.on("current_player", (updatedGame) => {
      dispatch(playerUpdated(updatedGame));
    });

    return () => {
      socket.off("current_player");
    };
  }, [dispatch]);


  const handleClick = () => {
    setSeatChoice(true);
  };

  const handleConfirm = () => {
    if (!user) {
      console.log("User is undefined");
      return;
    }

    dispatch(
      joinGame({
        userId: user.id,
        gameId: tableId,
        buyIn: sliderValue,
        seatId: seatId,
      })
    );
    console.log(joinGame);
  };

  const isDealer = currentGame.dealerPosition === seat.id - 1;
  const isCurrentPlayer = currentGame.currentPlayerTurn === seat.id - 1;

  const handleFold = () => {
    dispatch(fold({ gameId: tableId, seatId: seat._id }));
  };

  const handleCheck = () => {
    dispatch(check({ gameId: tableId, seatId: seat._id }));
  };

  const handleAllIn = () => {
    dispatch(
      chipsToPot({
        gameId: tableId,
        seatId: seat._id,
        action: "all-in",
      })
    );
  };

  const handleCall = () => {
    dispatch(
      chipsToPot({
        gameId: tableId,
        seatId: seat._id,
        action: "call",
      })
    );
  };

  const handleSliderBet = (betValue) => {
    dispatch(
      chipsToPot({
        gameId: tableId,
        seatId: seat._id,
        bet: betValue,
        action: "bet",
      })
    );
  };

  return (
    <div className="d-flex justify-content-center seat">
      {seat && (
        <>
          <p>{`Seat ${seat.id}`}</p>
          {seat.player ? (
            <>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <Box sx={{ my: 3, mx: 2 }}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Typography gutterBottom variant="h4" component="div">
                        {username}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="h6" component="div">
                        $ {parseFloat(seat.player.chips).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider variant="middle" />
                <Box sx={{ m: 2 }}>
                  <Stack direction="row" spacing={1}>
                    {isCurrentPlayer ? (
                      <BetBox
                        playerChips={parseFloat(seat.player.chips).toFixed(2)}
                        onBetChange={handleSliderBet}
                        onCall={handleCall}
                        onAllIn={handleAllIn}
                        onCheck={handleCheck}
                        onFold={handleFold}
                      />
                    ) : (
                      <DeactivatedBet
                        playerChips={parseFloat(seat.player.chips).toFixed(2)}
                        onBetChange={handleSliderBet}
                        onCall={handleCall}
                        onAllIn={handleAllIn}
                      />
                    )}
                  </Stack>
                </Box>
                <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                  <p>{`Card 1 ${cards[0]}`}</p>
                  <p>{`Card 2 ${cards[1]}`}</p>
                  {isDealer && <RadioButtonCheckedIcon />}
                  <p>Current Player: {isCurrentPlayer ? "True" : "False"}</p>
                </Box>
              </Box>
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
                          handleConfirm();
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

export default Seat;
