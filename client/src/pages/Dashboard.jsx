import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import lodash from 'lodash';
import Select from 'react-select';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cube from '../components/Cube';

import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { useUserStore } from '../common/useUserStore';
import { useForm, Controller } from 'react-hook-form';

import {
  Tabs,
  Tab,
  Box,
  Alert,
  Button,
  FormControl,
  Typography,
  Input,
  Checkbox,
  FormControlLabel,
  Grid,
  CssBaseline,
} from '@mui/material';

import SevereColdTwoToneIcon from '@mui/icons-material/SevereColdTwoTone';
import AcUnitTwoToneIcon from '@mui/icons-material/AcUnitTwoTone';
import CloudTwoToneIcon from '@mui/icons-material/CloudTwoTone';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';

import parameters from './resources/parameters.json';
import cubeSides from './resources/cubeSides.json';
import countriesParameters from './resources/countriesParameters.json';
import { LineCharts } from './LineCharts';

const Dashboard = () => {
  const [parameter, setParameter] = useState('');
  const [expand, setExpand] = useState(false);
  const [tab, setTab] = useState(0);
  const [checked, setChecked] = useState([false, false]);
  const [forApiCall, setForApiCall] = useState([]);
  const [notifications, setNotifications] = useState({
    lamp: false,
    vibration: false,
    color: '#000000',
  });
  const [cubes, setCubes] = useState([]);
  const [weather, setWeather] = useState({});
  const [cube, setCube] = useState('');
  const [cubeSide, setCubeSide] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [token] = useToken();

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      lamp: '#000000',
      weather: '',
    },
  });

  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
  }

  const notifcationLamp = () => (
    <>
      <FormControl>
        <Typography variant='h6' gutterBottom>
          Lamp color:
        </Typography>
        <Input
          autoFocus={true}
          onChange={handleChange4}
          type='color'
          value={notifications.color}
        />
      </FormControl>
    </>
  );

  const handleChange1 = (event) => {
    setNotifications({
      ...notifications,
      lamp: event.target.checked,
      vibration: event.target.checked,
    });
  };

  const handleChange2 = (event) => {
    let value = event.target.checked;
    setNotifications({ ...notifications, lamp: value });
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    let value = event.target.checked;
    setNotifications({ ...notifications, vibration: value });
  };

  const handleChange4 = (event) => {
    setNotifications({
      ...notifications,
      color: event.target.value,
    });
  };

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    (async () => {
      const [country, lat, lon] = ['Finland', 64.0, 26.0];
      const { data } = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const { current_weather } = data;
      setWeather({
        country: country,
        temperature: current_weather.temperature,
      });
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage('');
    }, 2500);
  }, [successMessage]);

  useEffect(() => {
    (async () => {
      if (user) {
        const { data } = await axios.post(
          '/api/owned-cubes',
          { userId: user.id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCubes(data);
      }
    })();
  }, [token, user]);

  const handleChange = (e, v) => {
    setTab(v);
    setExpand(true);
    const [selectedCube] = cubes.filter((availableCube) => {
      console.log(`Name: ${availableCube.name}\nText: ${e.target.innerText}`);
      return availableCube.name === e.target.innerText.toLowerCase();
    });
    setCube(selectedCube);
  };

  const functionSelect = () => {
    switch (parameter.value) {
      case 'lamp':
        return (
          <FormControl>
            <Typography variant='h6' gutterBottom>
              Lamp color:
            </Typography>
            <Controller
              name='lamp'
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  onChange={onChange}
                  type='color'
                  value={getValues('lamp')}
                />
              )}
            />
          </FormControl>
        );

      case 'weather':
        return (
          <FormControl>
            <Typography variant='h6' gutterBottom>
              Enter country:
            </Typography>
            <Controller
              name='weather'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  defaultValue={getValues('weather')}
                  variant='outlined'
                  autoWidth={true}
                  options={countriesParameters}
                />
              )}
            />
          </FormControl>
        );

      case 'notifications':
        return (
          <FormControl>
            <Box sx={{ display: 'flex', flexDirection: 'row', ml: 3 }}>
              <FormControlLabel
                label='Lamp'
                control={
                  <Checkbox
                    checked={notifications.lamp}
                    onChange={handleChange2}
                  />
                }
              />
              <FormControlLabel
                label='Vibration'
                control={
                  <Checkbox
                    checked={notifications.vibration}
                    onChange={handleChange3}
                  />
                }
              />
              <FormControlLabel
                label='Both'
                control={
                  <Checkbox
                    checked={notifications.lamp && notifications.vibration}
                    indeterminate={
                      notifications.lamp !== notifications.vibration
                    }
                    onChange={handleChange1}
                  />
                }
              />
            </Box>
            {notifications.lamp ? notifcationLamp() : null}
          </FormControl>
        );

      default:
        return null;
    }
  };

  const sendForm = async (e) => {
    try {
      if (parameter.value === 'notifications') {
        const { data } = await axios.post(
          '/api/form-details',
          {
            cube_id: cube.cube_id,
            id: cube.id,
            user: cube.user,
            cubeSide: cubeSide.value,
            function: parameter.value,
            functionTarget: notifications,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuccessMessage(data.message);
      }

      let functionTarget;
      if (lodash.has(e[parameter.value], 'value')) {
        const [country, lat, lon] = e[parameter.value].value.split(',');
        setForApiCall(e[parameter.value].value.split(','));
        const { data } = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const { current_weather } = data;
        functionTarget = {
          country: country,
          temperature: current_weather.temperature,
        };
        setWeather({
          country: functionTarget.country,
          temperature: functionTarget.temperature,
        });
      } else {
        functionTarget = e[parameter.value];
      }

      const { data } = await axios.post(
        '/api/form-details',
        {
          cube_id: cube.cube_id,
          id: cube.id,
          user: cube.user,
          cubeSide: cubeSide.value,
          function: parameter.value,
          functionTarget: functionTarget,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage(data.message);
    } catch (e) {}
  };

  const currentWeather = () => {
    console.log(weather.temperature);
    if (parseInt(weather.temperature) >= 25) {
      return (
        <Box item='true' style={{ width: '300px' }}>
          <Typography> Country: {weather.country}</Typography>
          <Typography>
            Temperature: {weather.temperature}°C
            <WbSunnyTwoToneIcon color={'error'} style={{ paddingTop: '5px' }} />
          </Typography>
        </Box>
      );
    } else if (
      parseInt(weather.temperature) >= 10 &&
      weather.temperature < 25
    ) {
      return (
        <Box item='true' style={{ width: '400px' }}>
          <Typography variant='h6'> Country: {weather.country}</Typography>
          <Typography variant='h6'>
            Temperature: {weather.temperature}°C
            <CloudTwoToneIcon color={'warning'} style={{ paddingTop: '5px' }} />
          </Typography>
        </Box>
      );
    } else if (parseInt(weather.temperature) >= 0 && weather.temperature < 10) {
      return (
        <Box item='true' style={{ width: '400px' }}>
          <Typography variant='h6'> Country: {weather.country}</Typography>
          <Typography variant='h6'>
            Temperature: {weather.temperature}°C
            <AcUnitTwoToneIcon
              color={'primary'}
              style={{ paddingTop: '5px' }}
            />
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box item='true' style={{ width: '400px' }}>
          <Typography variant='h6'> Country: {weather.country}</Typography>
          <Typography variant='h6'>
            Temperature: {weather.temperature}°C
            <SevereColdTwoToneIcon
              color={'info'}
              style={{ paddingTop: '5px' }}
            />
          </Typography>
        </Box>
      );
    }
  };

  const formBuilder = () => {
    return (
      <form onSubmit={handleSubmit(sendForm)}>
        <FormControl key={uuid()}>
          {functionSelect()}
          <FormControl>
            <FormControl margin='dense' sx={{ minWidth: 300 }}>
              <Typography variant='h6' gutterBottom>
                Select Cube Side:
              </Typography>
              <Select
                labelId='0'
                id='selectSide'
                label='Cube side:'
                autoWidth
                defaultValue={cubeSide}
                variant='outlined'
                color='primary'
                onChange={setCubeSide}
                options={cubeSides}
              />
            </FormControl>
            <FormControl>
              <Button
                variant='outlined'
                color='primary'
                type='submit'
                className='mt-3 fs-5'
              >
                Submit
              </Button>
            </FormControl>
          </FormControl>
        </FormControl>
      </form>
    );
  };

  return (
    <Grid
      container
      component='main'
      direction='row'
      alignContent='center'
      alignItems='center'
      wrap='wrap'
    >
      {successMessage && (
        <Alert
          severity='success'
          style={{ top: 0, right: 0, position: 'absolute' }}
        >
          {successMessage}
        </Alert>
      )}

      <CssBaseline />

      <Grid
        item
        xs={10}
        lg={9}
        sx={{ backgroundColor: '#CED0CB', margin: 'auto', paddingBottom: '1%' }}
      >
        <Tabs
          value={tab}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons
          allowScrollButtonsMobile
        >
          {cubes.map((cube) => (
            <Tab label={cube.name} key={uuid()} />
          ))}
        </Tabs>
        {console.log(`expand ${expand}\ncube ${cube}`)}
        {lodash.isEmpty(cube) ? null : (
          <Grid
            container
            direction='row'
            alignContent='center'
            alignItems='center'
            sx={{
              background: '#E8EAE6',
              paddingTop: '2%',
              paddingLeft: '10%',
              paddingBottom: '2%',
              boxShadow: 2,
              borderRadius: 8,
              width: '95%',
              margin: 'auto',
            }}
          >
            <Grid item xs={6} lg={4}>
              <FormControl sx={{ minWidth: 300 }}>
                <Typography variant='h6' gutterBottom>
                  Select Function
                </Typography>
                <Controller
                  name='selectFunction'
                  control={control}
                  render={({ field }) => (
                    <Select
                      id='dropDownSelectFunction'
                      label='Select Function'
                      autoWidth
                      variant='outlined'
                      defaultValue={parameter}
                      onChange={setParameter}
                      options={parameters}
                    />
                  )}
                />
              </FormControl>
              {parameter ? formBuilder() : null}
              {weather.temperature ? currentWeather() : null}
            </Grid>
            <Grid item xs={6} lg={8}>
              <Canvas style={{ height: '400px', paddingRight: '10%' }}>
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[-2, 5, 2]} intensity={1} />
                <Cube />
              </Canvas>
            </Grid>
          </Grid>
        )}
      </Grid>

      <LineCharts style={{ margin: 'auto' }} />
    </Grid>
  );
};

export default Dashboard;
