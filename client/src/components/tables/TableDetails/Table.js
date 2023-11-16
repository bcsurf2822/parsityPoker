import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getCards } from "../../../actions/getCards";

const cardStyle = {
  width: "100px",
  height: "140px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #ddd",
  margin: "0 5px",
  boxSizing: "border-box",
};

const imgStyle = {
  maxWidth: "100%", 
  maxHeight: "100%",
};

export default function Table({ pot, cards }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >

      <Box display="flex" justifyContent="center" width="100%" mb={2}>
        {[...Array(5)].map((_, index) => (
          <Box key={index} style={cardStyle}>
            {index < cards.length ? (
              <img
                src={getCards(cards[index])}
                alt={`Card ${cards[index]}`}
                style={imgStyle}
              />
            ) : null}
          </Box>
        ))}
      </Box>
      <Typography variant="h6">Pot: {pot}</Typography>

      <Box mt={2}></Box>
    </Box>
  );
}
