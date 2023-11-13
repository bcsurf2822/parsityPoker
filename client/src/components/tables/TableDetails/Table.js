import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getCards } from '../../../actions/getCards';

export default function Table({ pot, cards }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* Community Cards */}
      <Box
        display="flex"
        justifyContent="space-around"
        width="100%" // Adjust as necessary
        mb={2} // Margin bottom
      >
        {cards.map((card, index) => (
          <Box key={index} p={1} /* Padding */>
            <img src={getCards(card)} alt={`Card ${card}`} />
          </Box>
        ))}
      </Box>

      {/* Pot Amount */}
      <Typography variant="h6">
        Pot: {pot}
      </Typography>

      {/* Placeholder for Chip Animation */}
      <Box mt={2} /* Margin top */>
        {/* Chip animation will go here */}
      </Box>
    </Box>
  );
}