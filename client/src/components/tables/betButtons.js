import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function BetBox({ playerChips, onBetChange, onCall, onAllIn }) {
  const [selectedBet, setSelectedBet] = useState(0);

  const marks = [
    { value: 0, label: '0' },
    { value: Math.round(playerChips / 3), label: `${Math.round(playerChips / 3)}` },
    { value: Math.round(playerChips / 2), label: `${Math.round(playerChips / 2)}` },
    { value: playerChips, label: `${playerChips}` },
  ];

  const handleSliderChange = (_, value) => {
    setSelectedBet(value);
  };

  const handleInputChange = (event) => {
    setSelectedBet(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (selectedBet < 0) {
      setSelectedBet(0);
    } else if (selectedBet > playerChips) {
      setSelectedBet(playerChips);
    }
  };

  const confirmBet = () => {
    onBetChange(selectedBet);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Button onClick={onCall} variant="contained" color="primary">
          Call
        </Button>
        <Button onClick={onAllIn} variant="contained" color="secondary">
          All In
        </Button>
      </Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof selectedBet === 'number' ? selectedBet : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={.25}
            valueLabelDisplay="auto"
            marks={marks}
            max={playerChips}
          />
        </Grid>
        <Grid item>
          <Input
            value={selectedBet}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              min: 0,
              max: playerChips,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        <Button variant="outlined" onClick={confirmBet}>
          Confirm Bet
        </Button>
      </Box>
    </Box>
  );
}
