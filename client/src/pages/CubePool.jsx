import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import { v4 as uuid } from 'uuid';

import io from 'socket.io-client';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useUser } from '../auth/useUser';

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
  }, [availableCubes]);

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
  /**
   * TODO:
   * 1. Modify the list into mui
   * 2. Make functions for name corrections(name, config, etc)
   * 3. Break down the available cubes into 2 components
   * 4. Component 1: AvailableCubes
   * 5. Component 2: AvailableCube
   *
   */
  return (
    <>
      {availableCubes
        ? availableCubes.map((cube) => (
            <Card
              sx={{ maxWidth: 500, maxHeight: 650 }}
              style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap' }}
              key={uuid()}
            >
              <CardContent
                style={{
                  marginBottom: '10px',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <Typography gutterBottom variant='h5' component='div'>
                  {cube.name} - {cube.cube_id}
                </Typography>
                <div
                  style={{
                    height: '100px',
                    width: '100px',
                    backgroundColor: `#${Math.floor(
                      Math.random() * 16777215
                    ).toString(16)}`,
                  }}
                />
                <Typography variant='h5'>Config</Typography>
                <ul>
                  <li>Current Side: {cube.currentSide}</li>
                  {Object.entries(cube.config).map(([key, value]) => (
                    <li key={uuid()}>
                      {key}{' '}
                      <ol>
                        {Object.entries(value).map(([key, value]) => (
                          <li key={uuid()}>
                            {' '}
                            {key}: {value}{' '}
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => {
                    onClickOwnCube(cube);
                  }}
                >
                  Own now!
                </Button>
              </CardContent>
            </Card>
          ))
        : null}
    </>
  );
};
