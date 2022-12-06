import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import lodash from 'lodash';
import Select from 'react-select';

import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { useUserStore } from '../common/useUserStore';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import SevereColdTwoToneIcon from '@mui/icons-material/SevereColdTwoTone';
import AcUnitTwoToneIcon from '@mui/icons-material/AcUnitTwoTone';
import CloudTwoToneIcon from '@mui/icons-material/CloudTwoTone';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from '@mui/material';

import parameters from './resources/parameters.json';
import cubeSides from './resources/cubeSides.json';
import countriesParameters from './resources/countriesParameters.json';
import { LineCharts } from './LineCharts';

const Dashboard = () => {
  const [parameter, setParameter] = useState('');
  const [options, setOptions] = useState([]);
  const [checked, setChecked] = useState([false, false]);
  const [notifications, setNotifications] = useState({
    lamp: false,
    vibration: false,
    color: null,
  });
  const [cubes, setCubes] = useState([]);
  const [weather, setWeather] = useState({});
  const [cube, setCube] = useState('');
  const [cubeSide, setCubeSide] = useState(null);
  const [formDetails, setFormDetails] = useState({});
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
    (async () => {
      let tempFilter;
      if (user) {
        const { data } = await axios.post(
          '/api/owned-cubes',
          { userId: user.id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        tempFilter = data.map((cubeData) => ({
          value: cubeData.name,
          label: toTitleCase(cubeData.name.replaceAll('_', ' ')),
        }));
        setCubes(data);
        setOptions(tempFilter);
      }
    })();
  }, [token, user]);

  useEffect(() => {
    if (cube) {
      const [selectedCube] = cubes.filter(
        (cubeForm) => cubeForm.name === cube.value
      );
      setFormDetails({
        cube_id: selectedCube.cube_id,
        id: selectedCube.id,
        user: selectedCube.user,
      });
    }
  }, [cube, cubes]);

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
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
              <FormControlLabel
                label='Lamp'
                control={
                  <Checkbox
                    checked={notifications.lamp}
                    onChange={handleChange2}
                  />
                }
              />

              {notifications.lamp ? notifcationLamp() : null}
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
          </FormControl>
        );

      default:
        return null;
    }
  };

  const sendForm = async (e) => {
    if (parameter.value === 'notifications') {
      await axios.post(
        '/api/form-details',
        {
          cube_id: formDetails.cube_id,
          id: formDetails.id,
          user: formDetails.user,
          cubeSide: cubeSide.value,
          function: parameter.value,
          functionTarget: notifications,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    let functionTarget;
    if (lodash.has(e[parameter.value], 'value')) {
      const [country, lat, lon] = e[parameter.value].value.split(',');
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

    await axios.post(
      '/api/form-details',
      {
        cube_id: formDetails.cube_id,
        id: formDetails.id,
        user: formDetails.user,
        cubeSide: cubeSide.value,
        function: parameter.value,
        functionTarget: functionTarget,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  const currentWeather = () => {
    console.log(weather.temperature);
    if (parseInt(weather.temperature) >= 25) {
      return (
        <Grid>
          <Box item='true' xs={6} style={{ width: '300px' }}>
            <Typography> Country: {weather.country}</Typography>
            <Typography>
              Temperature: {weather.temperature}°C
              <WbSunnyTwoToneIcon
                color={'error'}
                style={{ paddingTop: '5px' }}
              />
            </Typography>
          </Box>
        </Grid>
      );
    } else if (
      parseInt(weather.temperature) >= 10 &&
      weather.temperature < 25
    ) {
      return (
        <Grid>
          <Box item='true' xs={6} style={{ width: '300px' }}>
            <Typography> Country: {weather.country}</Typography>
            <Typography>
              {' '}
              Temperature: {weather.temperature}°C
              <CloudTwoToneIcon
                color={'warning'}
                style={{ paddingTop: '5px' }}
              />
            </Typography>
          </Box>
        </Grid>
      );
    } else if (parseInt(weather.temperature) >= 0 && weather.temperature < 10) {
      return (
        <Grid>
          <Box item='true' xs={6} style={{ width: '300px' }}>
            <Typography> Country: {weather.country}</Typography>
            <Typography>
              {' '}
              Temperature: {weather.temperature}°C
              <AcUnitTwoToneIcon
                color={'primary'}
                style={{ paddingTop: '5px' }}
              />
            </Typography>
          </Box>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <Box item='true' xs={6} style={{ width: '300px' }}>
            <Typography> Country: {weather.country}</Typography>
            <Typography>
              {' '}
              Temperature: {weather.temperature}°C
              <SevereColdTwoToneIcon
                color={'info'}
                style={{ paddingTop: '5px' }}
              />
            </Typography>
          </Box>
        </Grid>
      );
    }
  };

  const formBuilder = () => {
    return (
      <form onSubmit={handleSubmit(sendForm)}>
        <FormControl key={uuid()}>
          {functionSelect()}
          <FormControl>
            <FormControl margin='dense'>
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
    <>
    <Box display="flex"
          justifyContent="center"
           alignItems="center">

      <Typography variant='h1' gutterBottom >
        WELCOME TO THE DASHBOARD
      </Typography>
      </Box>

      <Box
          sx={{

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

      <FormControl sx={{ m: 3, minWidth: 275 }}>
        <Typography variant='h6' gutterBottom>
          Select cube
        </Typography>
        <Controller
          name='selectCube'
          control={control}
          render={({ field }) => (
            <Select
              id='dropDownSelectCube'
              label='Select Cube'
              variant='outlined'
              autoWidth={true}
              defaultValue={cube}
              onChange={setCube}
              options={options}
            />
          )}
        />
      </FormControl>

      {lodash.isEmpty(cube) ? null : (
        <>
          <FormControl sx={{ m: 3, minWidth: 150 }}>
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
        </>
      )}
      {weather.temperature ? currentWeather() : null}
      <LineCharts />
    </>
  );
};

export default Dashboard;
