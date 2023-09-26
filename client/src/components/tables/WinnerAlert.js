import React from 'react'

import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';


export default function WinnerAlert({winnerData}) {
  if(!winnerData) return null

  return (
    <Box sx={{ width: '100%', zIndex: 10, position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)' }}>
      <Alert severity="success">
        {`${winnerData.user} won ${winnerData.chips}!`}
      </Alert>
    </Box>
  )
}
