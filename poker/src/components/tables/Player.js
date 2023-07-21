import { Button, Card } from "react-bootstrap";
import Slider from "react-input-slider";
import { useEffect, useState } from "react";
import { joinGame } from "../../rtk/slices/serverSlice";
import { useDispatch, useSelector } from "react-redux";

const Player = ({
  gameId,
  name,
  avatar,
  chips,
  bet,
  isDealer,
  seat = {},
  userInfo,
  dispatch,
  isPlayerSitting,
  setIsPlayerSitting,
  gameMin,
  gameMax,
}) => {
  const [isSitting, setIsSitting] = useState(false);
  const [buyIn, setBuyIn] = useState(gameMin);
  const [showBuyIn, setShowBuyIn] = useState(false);

  const sitHere = () => {
    setShowBuyIn(true);
  };

  const currentGame = useSelector((state) => state.server.currentGame);

  const joinGameHandler = () => {
    if (seat && !seat.player && userInfo) {
      console.log('buyIn:', buyIn);
      dispatch(
        joinGame({
          userId: userInfo.id,
          gameId: gameId,
          buyIn: buyIn,
          seatId: seat._id,
        })
      );
      setShowBuyIn(false);
      setIsSitting(true);
      setIsPlayerSitting(true);
    }
  };

  useEffect(() => {
    setIsSitting(seat && seat.player && seat.player.userId === userInfo.id);
  }, [seat, userInfo]);

  if (seat && seat.player) {
    name = userInfo.username;
    chips = seat.player.chips;
    bet = seat.player.bet;
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>
          {isSitting ? userInfo.username : name} {isDealer ? "(Dealer)" : ""}
        </Card.Title>
        <div>
          {userInfo && !isSitting && !isPlayerSitting && (
            <>
              <Button variant="success" onClick={sitHere}>
                Sit Here
              </Button>
              {showBuyIn && (
                <div>
                  <Slider
                    axis="x"
                    xstep={1}
                    xmin={gameMin}
                    xmax={gameMax}
                    x={buyIn}
                    onChange={({ x }) => setBuyIn(x)}
                  />
                  <Button variant="success" onClick={joinGameHandler}>
                    Confirm Buy-in
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <Card.Text>Chips: {chips}</Card.Text>
        <Card.Text>Current Bet: {bet}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Player;