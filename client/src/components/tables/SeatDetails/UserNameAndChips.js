import React from "react";
import Typography from "@mui/material/Typography";

export default function UserNameAndChips({ user, chipCount, seatNumber }) {
  return (
    <div>
      <Typography gutterBottom variant="h4" component="div" align="center">
        {user}
      </Typography>
      <Typography gutterBottom variant="h6" component="div" align="center">
        ${chipCount}
      </Typography>
    </div>
  );
}
