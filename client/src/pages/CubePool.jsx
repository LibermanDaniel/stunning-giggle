import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import io from 'socket.io-client';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { useNavigate } from 'react-router-dom';
import { Paper, Grid, Box, Divider, CssBaseline } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useUser } from '../auth/useUser';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';


import { experimentalStyled as styled } from '@mui/material/styles';
import { ClassNames } from '@emotion/react';

const socket = io();

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
    <Grid container spacing={10}
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
    >
      <CssBaseline />
      {availableCubes ? availableCubes.map((cube) => (
        <Grid item xs={12} sm={6} md={4}
        sx={{mx: 2}}
      >
        <Card sx={{ maxWidth: 500 }}>
          <CardActionArea>
            <CardMedia  component="img"
              height="140"
              alt={cube.name}
              sx={{
                  backgroundColor: `#${Math.floor(
                    Math.random() * 16777215
                  ).toString(16)}`
              }}
            />
            <CardContent>
              <Typography>
                Current Side: {cube.currentSide}
              </Typography>
              {Object.entries(cube.config).map(([key, value, index]) => (
                <Grid item sx={3}>
                  <Box>{parseSides(key)}</Box>
                  {Object.entries(value).map(([key, value]) => (
                    <Typography>
                      {key}: {value}
                    </Typography>
                  ))}
                </Grid>
              ))}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary"
              onClick={() => {
                onClickOwnCube(cube);
              }}
            >
              OWN ME
            </Button>
          </CardActions>
        </Card>
      </Grid>
      )):null}

    </Grid>
  );
};
