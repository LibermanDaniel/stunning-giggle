import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import io from 'socket.io-client';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Grid,
  Box,
  Divider,
  CssBaseline,
  CardHeader,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useUser } from '../auth/useUser';
import { positions } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';

import { experimentalStyled as styled } from '@mui/material/styles';
import { ClassNames } from '@emotion/react';

const socket = io();

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

export const CubePool = () => {
  const user = useUser();
  const [token, setToken] = useToken();
  const [, setIsConnected] = useState(socket.connected);
  const [availableCubes, setAvailableCubes] = useState([]);

  const { id, isVerified } = user;

  const navigate = useNavigate();

  if (!isVerified) {
    navigate('/');
  }

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/available-cubes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data) {
        setAvailableCubes(data);
      }
    })();
  }, [token]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('cubePool', (data) => {
      setAvailableCubes(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('cubePool');
    };
  }, []);

  const onClickOwnCube = async (cube) => {
    const response = await axios.put(
      `/api/own-cube/${id}`,
      { cube },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    setToken(response.data.token);
    setAvailableCubes(response.data.cubes);
  };

  const parseSides = (side) => {
    return (
      [
        'side_one',
        'side_two',
        'side_three',
        'side_four',
        'side_five',
        'side_six',
      ].indexOf(side) + 1
    );
  };
  return (
    <ThemeProvider theme={theme}>
    <Grid
      container
      spacing={10}
      direction='row'
      justifyContent='space-evenly'
      wrap='wrap'
      alignItems='flex-start'
    >
      <CssBaseline />
      {availableCubes
        ? availableCubes.map((cube) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ marginTop: '2%', marginLeft: '1%', marginBottom: '1%' }}
            >
              <Card
                sx={{
                  minWidth: 440,
                  maxWidth: 440,
                  minHeight: 530,
                  maxHeight: 530,
                }}
              >
                <CardActionArea
                  onClick={() => {
                    onClickOwnCube(cube);
                  }}
                >
                  <CardHeader
                    component='div'
                    height='200'
                    title={cube.name}
                    sx={{
                      backgroundColor: `#${Math.floor(
                        Math.random() * 16777215
                      ).toString(16)}`,justifyContent: 'center',alignContent: 'center',textAlign:'center' 
                    }}
                  />
                  <CardContent sx={{ minWidth: 400 ,justifyContent: 'center',alignContent: 'center',textAlign:'center' }} >
                    <Typography>Current Side: {cube.currentSide}</Typography>
                    {Object.entries(cube.config).map(([key, value, index]) => (
                      <Grid item xs={3}>
                        <Box>Side {parseSides(key)}</Box>
                        {Object.entries(value).map(([key, value]) => (
                          <Typography sx={{ minWidth: 400 }}>
                            {key}: {value}
                          </Typography>
                        ))}
                      </Grid>
                    ))}
                  </CardContent>
                </CardActionArea>
                <CardActions>
                <Box alignItems="flex-end" >
                  <Button
                    size='small'
                    color='secondary'
                    onClick={() => {
                      onClickOwnCube(cube);
                    }}
                    sx={{ width:450,mt:10,position :'bottom'}}  
                    
                  >
                    Take me!
                  </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))
        : null}
    </Grid>
    </ThemeProvider>
  );
};
