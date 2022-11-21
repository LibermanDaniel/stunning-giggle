import React from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

export const ColorPicker = () => {
  return (
    <FormControl sx={{ m: 3, minWidth: 100 }}>
      <Typography>Color:</Typography>
      <input type='color' defaultValue />
    </FormControl>
  );
};
