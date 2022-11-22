import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuid } from 'uuid';

export const CubeSide = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <FormControl sx={{ m: 3, minWidth: 150 }}>
        <InputLabel id='0' defaultValue hidden>
          Cube side:
        </InputLabel>
        <Select
          labelId='0'
          id='selectSide'
          label='Cube side:'
          autoWidth
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value || ''}
        >
          <MenuItem key={uuid()} value={1}>
            {' '}
            1{' '}
          </MenuItem>
          <MenuItem key={uuid()} value={2}>
            {' '}
            2{' '}
          </MenuItem>
          <MenuItem key={uuid()} value={3}>
            {' '}
            3{' '}
          </MenuItem>
          <MenuItem key={uuid()} value={4}>
            {' '}
            4{' '}
          </MenuItem>
          <MenuItem key={uuid()} value={5}>
            {' '}
            5{' '}
          </MenuItem>
          <MenuItem key={uuid()} value={6}>
            {' '}
            6{' '}
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
