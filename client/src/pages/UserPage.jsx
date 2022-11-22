import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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
  return (
    <ThemeProvider theme={theme}>
       <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#7C9473',
        }}
      >
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
              <Avatar src='../avatar/gyro.jpg' sx={{ width: 56, height: 56 }} />

              <IconButton color='secondary' aria-label='edit'>
                <EditIcon />
              </IconButton>
            </Stack>

            <Stack direction='row' spacing={1}>
              <Typography component='h5'>USERNAME</Typography>
              <Typography component='b1'>GYRO ZEPPELI</Typography>
              <IconButton color='secondary' aria-label='edit'>
                <EditIcon />
              </IconButton>
            </Stack>

            <Stack direction='row' spacing={1}>
              <Typography component='b1'>EMAIL</Typography>
              <Typography component='h5'>GYRO.ZEPPELI@GYROCUBE.FI</Typography>
              <IconButton color='primary' aria-label='edit'>
                <EditIcon />
              </IconButton>
            </Stack>

            <button variant='contained' color='#primary'>
              Reset Password
            </button>
          </CssBaseline>
        </Box>
      </Box>
      </Container>
    </ThemeProvider>
  );
};
