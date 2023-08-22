
import Chip from '@mui/joy/Chip';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';

import Stack from '@mui/material/Stack';

export default function SeatUsername() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
      <Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Avatar"
        variant="outlined"
      />
    </Stack>
  );
}