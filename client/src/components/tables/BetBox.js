import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import MuiInput from "@mui/material/Input";
import ButtonGroup from '@mui/material/ButtonGroup';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function BetBox({ playerChips, onBetChange, onCall, onAllIn, onCheck, onFold, onRaise, chipsInPot, highestBet }) {
  const [selectedBet, setSelectedBet] = useState(highestBet);

  useEffect(() => {
    setSelectedBet(highestBet);
  }, [highestBet]);

  const handleSliderChange = (_, value) => {
    setSelectedBet(Math.max(value, highestBet));
  };

  const handleInputChange = (event) => {
    setSelectedBet(Math.max(event.target.value === "" ? 0 : Number(event.target.value), highestBet));
  };

  const handleBlur = () => {
    if (selectedBet < highestBet) {
      setSelectedBet(highestBet);
    } else if (selectedBet > playerChips) {
      setSelectedBet(playerChips);
    }
  };

  const confirmBet = () => {
    onBetChange(selectedBet);
  };

  const canRaise = selectedBet > highestBet;

  return (
    <Box sx={{ width: 300 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >

        <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={onCall} variant="contained" color="primary">
          Call {highestBet}
        </Button>
        <Button onClick={() => onRaise(selectedBet)} variant="contained" color="primary" disabled={!canRaise}>
          Raise to {selectedBet}
        </Button>
        <Button onClick={onAllIn} variant="contained" color="secondary">
          All In
        </Button>
        <Button onClick={onCheck} variant="contained" color="secondary">
          Check
        </Button>
        <Button onClick={onFold} variant="contained" color="secondary">
          Fold
        </Button>
      </ButtonGroup>
      </Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof selectedBet === "number" ? selectedBet : highestBet}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={0.25}
            valueLabelDisplay="auto"
            max={playerChips}
            min={highestBet}
          />
        </Grid>
        <Grid item>
          <Input
            value={selectedBet}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 0.25,
              min: highestBet,
              max: playerChips,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        <Button variant="outlined" onClick={confirmBet} disabled={!canRaise}>
          Bet $ {selectedBet}
        </Button>
      </Box>
    </Box>
  );
}