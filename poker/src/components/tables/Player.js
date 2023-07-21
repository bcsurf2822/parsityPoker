import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import {

  joinGame
} from "../../rtk/slices/serverSlice";

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
}) => {
  const [isSitting, setIsSitting] = useState(false);

  const sitHere = () => {
    console.log("seat:", seat);
    console.log("user:", userInfo);
    console.log("Param gameId", gameId);
    if (seat && !seat.player && userInfo) {
      dispatch(
        joinGame({
          userId: userInfo.id,
          gameId: gameId,
          buyIn: 500,
          seatId: seat._id,
        })
      );

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
            <Button variant="success" onClick={sitHere}>
              Sit Here
            </Button>
          )}
        </div>
        <Card.Text>Chips: {chips}</Card.Text>
        <Card.Text>Current Bet: {bet}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Player;