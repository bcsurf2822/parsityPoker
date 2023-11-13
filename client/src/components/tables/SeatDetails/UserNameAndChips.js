import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function UserNameAndChips({user, chipCount}) {
  return (
    <Grid container alignItems="center">
      <Grid item xs>
        <Typography gutterBottom variant="h4" component="div">
          {user}
        </Typography>
      </Grid>
      <Grid item>
        <Typography gutterBottom variant="h6" component="div">
          {chipCount}
        </Typography>
      </Grid>
    </Grid>
  )
}
