import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

export const WeatherChecker = () => {
  return (
    <FormControl sx={{ m: 3, minWidth: 100 }}>
      <InputLabel>Set city:</InputLabel>
      <Input type='text' value={''} placeholder='City' />
    </FormControl>
  );
};
