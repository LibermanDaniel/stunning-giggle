import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Box } from '@mui/material';

import { useToken } from '../auth/useToken';
import { LineChart } from './LineChart';

const socket = io();

export const LineCharts = () => {
  const [token] = useToken();
  const [, setIsConnected] = useState(socket.connected);
  const [measurement, setMeasurement] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/get-measurements', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data) {
        console.log(data);
        setMeasurements(data);
      }
    })();
  }, [token]);

  const updateMeasurements = () => {
    let measurementsTemp = measurements;
    measurementsTemp.pop();
    measurementsTemp.unshift(measurement);
    setMeasurements(measurementsTemp);
  };

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('measurements', (data) => {
      setMeasurement(data);
      updateMeasurements();
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('cubePool');
    };
  }, []);

  const labels = useMemo(
    () => measurements.map((data) => data.createdAt),
    [measurements]
  );

  const humidity = useMemo(
    () => measurements.map((data) => data.humidity),
    [measurements]
  );

  const temperature = useMemo(
    () => measurements.map((data) => data.temperature),
    [measurements]
  );

  console.log(measurements);

  return (
    <>
      <Box
        style={{ display: 'flex', flexFlow: 'row' }}
        sx={{ m: 3, width: 700 }}
      >
        <LineChart
          title={'Temperature'}
          labels={labels}
          measurements={temperature}
        />
        <LineChart title={'Humidity'} labels={labels} measurements={humidity} />
      </Box>
    </>
  );
};
