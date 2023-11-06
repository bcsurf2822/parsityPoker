import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Slider from "@mui/joy/Slider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MuiInput from "@mui/material/Input";
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from "@mui/material/styles";

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function BetBox({ playerChips, onBetChange, onCall, onAllIn, onCheck, onFold, onRaise, chipsInPot, highestBet }) {
  const [selectedBet, setSelectedBet] = useState(highestBet);

  useEffect(() => {
    setSelectedBet(highestBet);
  }, [highestBet]);

  const handleSliderChange = (_, value) => {
    setSelectedBet(value);
  };

  const handleInputChange = (event) => {
    setSelectedBet(event.target.value === "" ? highestBet : Number(event.target.value));
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

  function valueText(value) {
    return `${value} Chips`;
  }

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
            aria-label="Bet slider"
            defaultValue={highestBet}
            getAriaValueText={valueText}
            step={1} // Adjust the step based on the granularity you want for the bet values
            marks
            min={0} // Minimum is set to 0
            max={playerChips} // Maximum is set to the number of player chips
            valueLabelDisplay="auto"
            value={selectedBet} // Controlled value
            onChange={handleSliderChange}
          />
        </Grid>
        <Grid item>
          <Input
            value={selectedBet}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1, // Adjust the step based on the granularity you want for the bet values
              min: 0, // Minimum is set to 0
              max: playerChips, // Maximum is set to the number of player chips
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