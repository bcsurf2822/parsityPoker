import { useDispatch, useSelector } from "react-redux";
import Slider from "react-input-slider";
import { socket } from "../../socket";
import {
  joinGame,
  playerJoined,
  updatePositionsAndBlinds,
  gameUpdated,
} from "../../rtk/slices/serverSlice";

import { Button } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { fetchUsernameById } from "../../rtk/slices/usersSlice";

const Seat = ({ seat, currentGame }) => {
  const user = useSelector((state) => state.auth.user);
  const seatId = seat._id;
  const maxBuyIn = currentGame.max;
  const minBuyIn = currentGame.min;
  console.log('Seat:', seat);
  const cards = seat.player ? seat.player.handCards : []; 
  console.log('Cards:', cards);

  const [sliderValue, setSliderValue] = useState(minBuyIn);
  const [seatChoice, setSeatChoice] = useState(false);

  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const tableId = currentGame._id;

  useEffect(() => {
    socket.on("gameUpdated", (updatedGame) => {
      dispatch(gameUpdated(updatedGame));
    });

    return () => {
      socket.off("gameUpdated");
    };
  }, [dispatch]);

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
              {" "}
            </>
          ) : (
            <>
              {seatChoice ? (
                <>
                  <Slider
                    axis="x"
                    xstep={1}
                    xmin={minBuyIn}
                    xmax={maxBuyIn}
                    x={sliderValue}
                    onChange={({ x }) => setSliderValue(x)}
                  />
                  <p>{`Buy In: ${sliderValue}`}</p>
                  <Button className="confirm-seat" onClick={handleConfirm}>
                    Confirm
                  </Button>
                </>
              ) : (
                <Button className="sit-here" onClick={handleClick}>
                  Sit here
                </Button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Seat;
