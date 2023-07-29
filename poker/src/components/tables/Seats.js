import { useDispatch, useSelector } from "react-redux";
import Slider from "react-input-slider";
import { joinGame, viewTable } from "../../rtk/slices/serverSlice";
import { fetchUpdatedUser } from "../../rtk/slices/authenticationSlice";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

const Seat = ({ seat }) => {
  const user = useSelector((state) => state.auth.user);
  const seatId = seat._id;
  const { viewedGame } = useSelector((state) => state.server);
  const maxBuyIn = viewedGame.game.max;
  const minBuyIn = viewedGame.game.min;

  const [sliderValue, setSliderValue] = useState(minBuyIn);
  const [seatChoice, setSeatChoice] = useState(false);

  const dispatch = useDispatch();

  const tableId = viewedGame.game._id;



  const handleClick = () => {
    setSeatChoice(true);
  };

  const handleConfirm = () => {
    if (!user) {
      console.log('User is undefined');
      return;
    }
  
    console.log("Seat ID:", seatId);
    console.log("User ID:", user.id);
    console.log("Table ID:", tableId);
    console.log("Max Buy In:", maxBuyIn);
  
    dispatch(
      joinGame({
        userId: user.id,
        gameId: tableId,
        buyIn: sliderValue,
        seatId: seatId,
      })
    )
      .then(() => dispatch(viewTable(tableId)))
      console.log("user after join", user)
  };
  

  return (
    <div className="d-flex justify-content-center seat">
      {seat && (
        <>
          <p>{`Seat ${seat.id}`}</p>
          {seat.player ? (
            <>
              <p>{`Username: ${user.username}`}</p>
              <p>{`Chips: ${seat.player.chips}`}</p>
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
                    onChange={({x}) => setSliderValue(x)}
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