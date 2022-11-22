import React from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

export const HumidTarget = () => {
  return (
    <FormControl sx={{ m: 3, minWidth: 100 }}>
      <Typography>Humid target:</Typography>
      <input type='number' placeholder='30%' />
    </FormControl>
  );
};
