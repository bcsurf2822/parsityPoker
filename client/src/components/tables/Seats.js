import { useDispatch, useSelector } from "react-redux";
import Slider from "react-input-slider";
import { joinGame, viewTable } from "../../rtk/slices/serverSlice";
import { fetchUpdatedUser } from "../../rtk/slices/authenticationSlice";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { fetchUsernameById } from "../../rtk/slices/usersSlice";

const Seat = ({ seat, viewedGame}) => {

  const user = useSelector((state) => state.auth.user);
  const seatId = seat._id;
  const maxBuyIn = viewedGame.max;
  const minBuyIn = viewedGame.min;
  

  const [sliderValue, setSliderValue] = useState(minBuyIn);
  const [seatChoice, setSeatChoice] = useState(false);

  const [username, setUsername] = useState(''); // we only need one username state

  const dispatch = useDispatch();

  const tableId = viewedGame._id;

  useEffect(() => {
    const fetchUsername = async (player) => {
      if (player) {
        const result = await dispatch(fetchUsernameById(player.user));
        console.log("result", result)
        setUsername(result.payload);
      }
    };

    if(seat.player) fetchUsername(seat.player); // if there is a player on the seat, fetch its username
  }, [seat, dispatch]); // depend on seat, not seatInfo


  const handleClick = () => {
    setSeatChoice(true);
  };

  const handleConfirm = () => {
    if (!user) {
      console.log("User is undefined");
      return;
    }

    console.log("user before join", user);

    console.log("Seat ID:", seatId);
    console.log("User ID:", user.id);
    console.log("Table ID:", tableId);
    console.log("Max Buy In:", maxBuyIn);

    dispatch(joinGame({ userId: user.id, gameId: tableId, buyIn: sliderValue, seatId: seatId }))
    .then(() => {
      dispatch(fetchUpdatedUser(user.id))
        .then(updatedUser => {
          console.log("user after join", updatedUser);
        });
      dispatch(viewTable(tableId));
    });
  
  };

  return (
    <div className="d-flex justify-content-center seat">
      {seat && (
        <>
          <p>{`Seat ${seat.id}`}</p>
          {seat.player ? (
            <>
              <p>{`Username: ${username}`}</p>
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