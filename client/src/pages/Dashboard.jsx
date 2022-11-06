import { useState, useContext } from 'react';
import { AuthContext } from '../auth/authContext';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';

import Box from '../components/Box';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  const [parameter, setParameter] = useState(null);
  const [value, setValue] = useState(null);
  const [checks, setChecks] = useState([
    { name: 'Vibrate', checked: false },
    { name: 'Lights', checked: false },
    { name: 'Both', checked: false },
  ]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
  }
  const parameters = [
    { name: 'Temp', id: 1, inputFields: ['cubeSide', 'targetTemp'] },
    { name: 'Humid', id: 2, inputFields: ['cubeSide', 'targetHumid'] },
    { name: 'Weather', id: 3, inputFields: ['cubeSide', 'weather'] },
    { name: 'Notification', id: 4, inputFields: ['cubeSide', 'notifcation'] },
    { name: 'Lamp', id: 5, inputFields: ['cubeSide', 'lamp'] },
    { name: 'Idle', id: 6, inputFields: ['cubeSide'] },
  ];

  const handleClick = (event) => {
    event.preventDefault();
    const [selected] = parameters.filter((parameter) => {
      return parameter.name === event.target.value;
    });
    setParameter(selected);
  };

  const formBuilder = (parameter) => {
    console.log(parameter);
    return (
      <FormControl>
        {parameter.inputFields.map((inputField) => {
          switch (inputField) {
            case 'cubeSide':
              return cubeSide();

            case 'targetTemp':
              return tempTarget();

            case 'targetHumid':
              return humidTarget();

            case 'lamp':
              return colorPicker();

            case 'notifcation':
              return notifcation();

            case 'weather':
              return weather();

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
  const cubeSide = () => {
    return (
      <ThemeProvider theme={theme}>
        <FormControl sx={{ m: 3, minWidth: 100 }}>
          <Box>
            <InputLabel id='0' defaultValue hidden>
              Cube side:
            </InputLabel>
            <Select>
              <MenuItem value={1}> 1 </MenuItem>
              <MenuItem value={2}> 2 </MenuItem>
              <MenuItem value={3}> 3 </MenuItem>
              <MenuItem value={4}> 4 </MenuItem>
              <MenuItem value={5}> 5 </MenuItem>
              <MenuItem value={6}> 6 </MenuItem>
            </Select>
          </Box>
        </FormControl>
      </ThemeProvider>
    );
  };

  const tempTarget = () => {
    return (
      <FormControl sx={{ m: 3, minWidth: 100 }}>
        <Typography>Temp target:</Typography>
        <input type='number' placeholder='25' />
      </FormControl>
    );
  };

  const humidTarget = () => {
    return (
      <FormControl sx={{ m: 3, minWidth: 100 }}>
        <Typography>Humid target:</Typography>
        <input type='number' placeholder='30%' />
      </FormControl>
    );
  };

  const colorPicker = () => {
    return (
      <FormControl sx={{ m: 3, minWidth: 100 }}>
        <Typography>Color:</Typography>
        <input type='color' defaultValue />
      </FormControl>
    );
  };

  const notifcation = () => {
    return (
      <FormControl sx={{ m: 3, minWidth: 100 }}>
        <RadioGroup className='mb-3'>
          <FormControlLabel
            inline
            tcontrol={<Radio />}
            id={`default-${'checkbox'}`}
            value={'Vibrate'}
            label={'Vibrate'}
          />
          <FormControlLabel
            inline
            control={<Radio />}
            id={`default-${'checkbox'}`}
            value={'Lights'}
            label={'Lights'}
          />
          <FormControlLabel
            inline
            control={<Radio />}
            id={`default-${'checkbox'}`}
            value={'Both'}
            label={'Both'}
          />
          {value === 'Lights' || value === 'Both' ? colorPicker() : null}
        </RadioGroup>
      </FormControl>
    );
  };

  const weather = () => {
    return (
      <FormControl sx={{ m: 3, minWidth: 100 }}>
        <InputLabel>Set city:</InputLabel>
        <Input type='text' value={''} placeholder='City' />
      </FormControl>
    );
  };

  return (
    <>
      <Typography textAlign='center' variant='h1' gutterBottom>
        WELCOME TO THE DASHBOARD
      </Typography>

      <Typography variant='h6' gutterBottom>
        Set functionality
      </Typography>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <FormControl sx={{ m: 3, minWidth: 100 }}>
            <InputLabel textAlign='center' id='0' defaultValue hidden>
              Select function
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={''}
              label='Functionality'
              onChange={handleClick}
            >
              {parameters.map((parameter) => {
                return (
                  <MenuItem value={parameter.name}>{parameter.name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </ThemeProvider>
      </CssBaseline>
      {parameter === null ? null : formBuilder(parameter)}
    </>
  );
};

export default Dashboard;
