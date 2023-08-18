import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsernameById } from '../../rtk/slices/usersSlice';

export default function SeatUsername({seat}) {

  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsername = async (player) => {
      if (player) {
        const result = await dispatch(fetchUsernameById(player.user));
        setUsername(result.payload);
      }
    };

    if (seat.player) fetchUsername(seat.player);
  }, [seat, dispatch]);
  return (
    <Box>
      <Chip>{seat.username}</Chip>
    </Box>
  );
}