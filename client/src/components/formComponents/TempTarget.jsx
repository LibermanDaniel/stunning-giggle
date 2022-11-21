import React from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

export const TempTarget = () => {
  return (
    <FormControl sx={{ m: 3, minWidth: 100 }}>
      <Typography>Temp target:</Typography>
      <input type='number' placeholder='25' />
    </FormControl>
  );
};
