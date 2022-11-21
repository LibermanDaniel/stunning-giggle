import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import lodash from 'lodash';

import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';

import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ColorPicker } from '../components/formComponents/ColorPicker';
import { WeatherChecker } from '../components/formComponents/WeatherChecker';
import { TempTarget } from '../components/formComponents/TempTarget';
import { HumidTarget } from '../components/formComponents/HumidTarget';
import { CubeSide } from '../components/formComponents/CubeSide';
import parameters from './resources/parameters.json';

const theme = createTheme({
  palette: {
    primary: {
      main: '#CFDBC7',
      dark: '#7C9473',
      contrastText: '#fff',
    },
  },
});

const Dashboard = () => {
  const [parameter, setParameter] = useState('');
  const [cubes, setCubes] = useState([]);
  const [cube, setCube] = useState({});
  const [value, setValue] = useState(null);
  const [token] = useToken();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
  }

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

  const handleCubeSelect = (event) => {
    event.preventDefault();
    setCube(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const [selected] = parameters.filter((parameter) => {
      return parameter.name === event.target.value;
    });
    setParameter(selected);
    console.log('parameter', parameter);
  };

  const formBuilder = (parameter) => {
    return (
      <FormControl key={uuid()}>
        {parameter.inputFields.map((inputField) => {
          console.log(inputField);
          switch (inputField) {
            case 'targetTemp':
              return <TempTarget key={uuid()} />;

            case 'targetHumid':
              return <HumidTarget key={uuid()} />;

            case 'lamp':
              return <ColorPicker key={uuid()} />;

            case 'weather':
              return <WeatherChecker key={uuid()} />;

            case 'cubeSide':
              console.log('moi');
              return <CubeSide key={uuid()} />;

            default:
              return null;
          }
        })}
        <Button variant='primary' type='submit' className='mt-3 fs-5'>
          Submit
        </Button>
      </FormControl>
    );
  };

  return (
    <>
      <Typography variant='h1' gutterBottom>
        WELCOME TO THE DASHBOARD
      </Typography>

      <Typography variant='h6' gutterBottom>
        Select Cube
      </Typography>
      <ThemeProvider theme={theme}>
        <FormControl sx={{ m: 3, minWidth: 150 }}>
          <InputLabel id='0' defaultValue hidden>
            Select Cube
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Select Cube'
            autoWidth
            value={cube || ''}
            onChange={handleCubeSelect}
          >
            {cubes &&
              cubes.map((cubeData) => {
                return (
                  <MenuItem value={cubeData.name} key={uuid()}>
                    {cubeData.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </ThemeProvider>
      {console.log(cube)}
      {lodash.isEmpty(cube) ? null : (
        <>
          <Typography variant='h6' gutterBottom>
            Select Function
          </Typography>
          <ThemeProvider theme={theme}>
            <FormControl sx={{ m: 3, minWidth: 150 }}>
              <InputLabel id='0' defaultValue hidden>
                Select Function
              </InputLabel>

              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Select Function'
                autoWidth
                value={parameter?.name || ''}
                onChange={handleClick}
              >
                {parameters.map((parameter) => {
                  return (
                    <MenuItem value={parameter.name} key={uuid()}>
                      {parameter.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </ThemeProvider>
          {parameter === '' ? null : formBuilder(parameter)}
        </>
      )}
    </>
  );
};

export default Dashboard;
