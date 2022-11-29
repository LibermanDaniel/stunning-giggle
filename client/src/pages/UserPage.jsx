import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';
import { useAuthContext } from '../auth/useAuthContext';
import axios from 'axios';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';




const theme = createTheme({
  palette: {
    primary: {
      main: '#CFDBC7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7C9473',
      contrastText: '#FFFFFF',
    },
  },
});


export const UserPage = () => {
  

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) {
    navigate('/');
  }


        
  return (
    <ThemeProvider theme={theme}>
      
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CssBaseline>
              <Stack direction='row' spacing={1}>
                <Avatar
                  src='../avatar/gyro.jpg'
                  sx={{ width: 56, height: 56 }}
                />

                <IconButton  aria-label='edit'>
                  <EditIcon />
                </IconButton>
              </Stack>

              <Stack direction='row' spacing={1}>
                <Typography component='h5'>USERNAME：</Typography>
                <Typography component='b1'>{user?.username}</Typography>
                <IconButton  aria-label='edit'>
                  <EditIcon />
                </IconButton>
              </Stack>

              <Stack direction='row' spacing={1}>
                <Typography component='b1'>EMAIL：</Typography>
                <Typography component='h5'>{user?.email}</Typography>
                <IconButton aria-label='edit'>
                  <EditIcon />
                </IconButton>
              </Stack>

              <button variant='contained' color='#primary'>
              <Link href='reset-password' variant='body2'>
              Reset Password
              </Link>
               
              </button>
            </CssBaseline>
          </Box>

   
    </ThemeProvider>
  );
};
