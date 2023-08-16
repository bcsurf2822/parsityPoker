import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button'

export default function BetBox({ playerChips, onBetChange }) {
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

  const confirmBet = () => {
    onBetChange(selectedBet);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Bet slider"
        defaultValue={0}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        max={playerChips}
        onChange={handleSliderChange}
      />
      <Button variant="outlined" onClick={confirmBet}>Confirm Bet</Button>
    </Box>
  );
}