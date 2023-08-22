import  { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

export default function DeactivatedBet({ playerChips, onBetChange, onCall, onAllIn }) {
  const [selectedBet, setSelectedBet] = useState(0);
  const marks = [
      {
          value: 0,
          label: '0',
      },
      {
          value: Math.round(playerChips / 3),
          label: `${Math.round(playerChips / 3)}`,
      },
      {
          value: Math.round(playerChips / 2),
          label: `${Math.round(playerChips / 2)}`,
      },
      {
          value: playerChips,
          label: `${playerChips}`,
      },
  ];

  const handleSliderChange = (_, value) => {
    setSelectedBet(value);
};

  return (
      <Box sx={{ width: 300 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <Button disabled variant="contained" color="primary">Call</Button>
              <Button disabled variant="contained" color="secondary">All In</Button>
          </Box>
          <Slider
              aria-label="Bet slider"
              defaultValue={0}
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              max={playerChips}
              onChange={handleSliderChange}
          />
          <Box sx={{ marginTop: 2 }}>
              <Button variant="outlined" disabled>Confirm Bet</Button>
          </Box>
      </Box>
  );
}