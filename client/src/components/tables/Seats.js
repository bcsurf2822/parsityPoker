import { useDispatch, useSelector } from "react-redux";
import Slider from "react-input-slider";
import { socket } from "../../socket";
import {
  joinGame,
  playerJoined,
  updatePositionsAndBlinds,
  chipsToPot,
} from "../../rtk/slices/serverSlice";

import { Button } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
// import Slider from '@mui/joy/Slider';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'
import { useState } from "react";
import { useEffect } from "react";
import { fetchUsernameById } from "../../rtk/slices/usersSlice";
import BetBox from "./betButtons";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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
  
  // console.log("Seat", seat);

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

  const handleTestUpdate = () => {
    dispatch(updatePositionsAndBlinds(currentGame._id));
  };

  const isDealer = currentGame.dealerPosition + 1;

  // const handleSliderBet = (betValue) => {
  //   dispatch(
  //     chipsToPot({
  //       gameId: tableId,
  //       seatId: seat._id,
  //       action: 'bet',
  //       bet: betValue
  //     })
  //   );
  // };

  const handleAllIn = () => {
    dispatch(
      chipsToPot({
        gameId: tableId,
        seatId: seat._id,
        action: 'all-in'
      })
    );
  };

  const handleCall = () => {
    dispatch(
      chipsToPot({
        gameId: tableId,
        seatId: seat._id,
        action: 'call'
      })
    );
  };

  const handleSliderBet = (betValue) => {
    dispatch(
      chipsToPot({
        gameId: tableId,
        seatId: seat._id,
        bet: betValue,
        action: 'bet'
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
              <Button onClick={handleTestUpdate}>TEST BLINDS</Button>
              <p>{`Username: ${username}`}</p>
              <p>{`Chips: ${seat.player.chips}`}</p>
              <p>{`Bet: ${seat.player.bet}`}</p>
              <p>{`Dealer: ${isDealer === seat.id ? "true" : "false"}`}</p>
              <p>{`Card 1 ${cards[0]}`}</p>
              <p>{`Card 2 ${cards[1]}`}</p>
              <Button onClick={handleAllIn}>All In</Button>
            <Button onClick={handleCall}>Call</Button>
              <BetBox
                playerChips={seat.player.chips}
                onBetChange={handleSliderBet}
              />{" "}
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
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
            Do you wish to buy in with {sliderValue} chips and sit here?
        </Typography>
        <Button className="buyIn" onClick={() => {
            handleConfirm();
            handleClose();
        }}>
            Buy In for ${sliderValue}
        </Button>
    </Box>
</Modal>
                </>
              ) : (
                // <Button className="sit-here" onClick={handleClick}>
                //   Sit here
                // </Button>
                <IconButton aria-label="add" onClick={() => { handleClick(); handleOpen(); }}>
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
