import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { joinGame } from "../../rtk/slices/serverSlice";
import { Button } from "react-bootstrap";

const Seat = ({ seat }) => {
  const user = useSelector((state) => state.auth.user);
  const {tableId} = useParams();
  const seatId = seat._id;
  const { viewedGame } = useSelector((state) => state.server);
  const maxBuyIn = viewedGame.game.max;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(joinGame(tableId, seatId, user.id, maxBuyIn));
  };

  return (
    <div className="d-flex justify-content-center seat">
      <p>{seat && `Seat ${seat.id}`}</p>
      {seat && !seat.player && <Button className="sit-here" onClick={handleClick}>Sit here</Button>}
    </div>
  );
};

export default Seat;
