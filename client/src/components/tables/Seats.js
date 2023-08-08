import { useDispatch, useSelector } from "react-redux";
import Slider from "react-input-slider";
import {socket} from '../../socket';
import { joinGame, playerJoined } from "../../rtk/slices/serverSlice";

import { Button } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { fetchUsernameById } from "../../rtk/slices/usersSlice";

const Seat = ({ seat, viewedGame}) => {

  console.log("SEAT GAME", viewedGame)

  const user = useSelector((state) => state.auth.user);
  const seatId = seat._id;
  const maxBuyIn = viewedGame.max;
  const minBuyIn = viewedGame.min;

  const [sliderValue, setSliderValue] = useState(minBuyIn);
  const [seatChoice, setSeatChoice] = useState(false);

  const [username, setUsername] = useState(''); 
  const dispatch = useDispatch();

  const tableId = viewedGame._id;



  useEffect(() => {
    const fetchUsername = async (player) => {
      if (player) {
        console.log("player", player)
        const result = await dispatch(fetchUsernameById(player.user));
        console.log("result", result);
        setUsername(result.payload);
      }
    };
  
    if(seat.player) fetchUsername(seat.player); 
  }, [seat, dispatch]);



  
  useEffect(() => {
    socket.on('playerJoined', (updatedGame) => {
      dispatch(playerJoined(updatedGame));
    });


    return () => {
      socket.off('playerJoined');
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
  
    console.log("user before join", user);
  
    console.log("Seat ID:", seatId);
    console.log("User ID:", user.id);
    console.log("Table ID:", tableId);
    console.log("Max Buy In:", maxBuyIn);
  
    dispatch(joinGame({ userId: user.id, gameId: tableId, buyIn: sliderValue, seatId: seatId }));
    console.log(joinGame)
  
  
  };

  console.log("viewedGame", viewedGame)
  console.log("seat", seat)


  return (
    <div className="d-flex justify-content-center seat">
      {seat && (
        <>
          <p>{`Seat ${seat.id}`}</p>
          {seat.player ? (
            <>
                    <Button onClick={console.log("test")}>Test Update</Button>
              <p>{`Username: ${username}`}</p>
              <p>{`Chips: ${seat.player.chips}`}</p>
              <p>{`Bet: ${seat.player.bet}`}</p>
              <p>{'Dealer:'}</p>
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