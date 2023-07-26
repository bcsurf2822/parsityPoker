import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { joinGame, leaveGame, viewTable } from "../../rtk/slices/serverSlice";
import { Button } from "react-bootstrap";

const Seat = ({ seat }) => {
  const user = useSelector((state) => state.auth.user);
  const seatId = seat._id;
  const { viewedGame } = useSelector((state) => state.server);
  const maxBuyIn = viewedGame.game.max;
  const dispatch = useDispatch();

  const tableId = viewedGame.game._id;

  const handleClick = () => {
    console.log("Seat ID:", seatId);
    console.log("User ID:", user.id);
    console.log("Table ID:", tableId);
    console.log("Max Buy In:", maxBuyIn);
  
    dispatch(
      joinGame({
        userId: user.id,
        gameId: tableId,
        buyIn: maxBuyIn,
        seatId: seatId,
      })
    ).then(() => dispatch(viewTable(tableId)));  
  };

  const leaveTable = async () => {
    try {
      await dispatch(leaveGame({ gameId: tableId, userId: user.id }));
      dispatch(viewTable(tableId));
    } catch (error) {
      console.log("Error leaving the game:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center seat">
      <p>{seat && `Seat ${seat.id}`}</p>
      {seat && !seat.player && (
        <Button className="sit-here" onClick={handleClick}>
          Sit here
        </Button>
      )}
    </div>
  );
};

export default Seat;
