import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { startLeaveGame } from '../../../rtk/slices/currentGameSlice';


const LeaveGameButton = ({ userId, tableId }) => {
  const dispatch = useDispatch();

  const handleLeaveGame = () => {
    console.log("Dispatching startLeaveGame with params:", userId, tableId);
    dispatch(startLeaveGame({ userId, tableId }));
  };

  return (
    <Button variant="primary" type="button" onClick={handleLeaveGame}>
      Leave
    </Button>
  );
};

export default LeaveGameButton;