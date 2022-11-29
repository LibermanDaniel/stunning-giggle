import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import lodash from 'lodash';
import Select from 'react-select';

import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { useUserStore } from '../common/useUserStore';
import { useForm, Controller } from 'react-hook-form';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import parameters from './resources/parameters.json';
import cubeSides from './resources/cubeSides.json';

const Dashboard = () => {
  const [parameter, setParameter] = useState('');
  const [options, setOptions] = useState([]);
  const [cubes, setCubes] = useState([]);
  const [cube, setCube] = useState('');
  const [cubeSide, setCubeSide] = useState(null);
  const [functionTarget, setFunctionTarget] = useState(null);
  const [formDetails, setFormDetails] = useState({});
  const [token] = useToken();

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      temp: '',
      humid: '',
      color: '',
      weather: '',
    },
  });

  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
  }

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
          label: cubeData.name,
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
      case 'temp':
        return (
          <FormControl sx={{ m: 3, minWidth: 100 }}>
            <Typography variant='h6' gutterBottom>
              Temp target:
            </Typography>
            <Controller
              name='temp'
              control={control}
              render={({ field: { onChange, placeHolder, value, type } }) => (
                <Input
                  onChange={onChange}
                  placeholder={'25'}
                  type={'number'}
                  value={getValues('temp')}
                />
              )}
            />
          </FormControl>
        );

      default:
        return null;
    }
  };

  const sendForm = async (e) => {
    const { data } = await axios.post(
      '/api/form-details',
      {
        cube_id: formDetails.cube_id,
        id: formDetails.id,
        user: formDetails.user,
        cubeSide: cubeSide.value,
        function: parameter.value,
        functionTarget: e.temp,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  const formBuilder = () => {
    return (
      <form onSubmit={handleSubmit(sendForm)}>
        <FormControl key={uuid()}>
          {functionSelect()}
          <Typography variant='h6' gutterBottom>
            Select Cube Side:
          </Typography>
          <FormControl sx={{ m: 3, minWidth: 150 }}>
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
          <Button
            variant='outlined'
            color='primary'
            type='submit'
            className='mt-3 fs-5'
          >
            Submit
          </Button>
        </FormControl>
      </form>
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
      <FormControl sx={{ m: 3, minWidth: 150 }}>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Select Cube'
          variant='outlined'
          autoWidth
          defaultValue={cube}
          onChange={setCube}
          options={options}
        />
      </FormControl>

      {lodash.isEmpty(cube) ? null : (
        <>
          <Typography variant='h6' gutterBottom>
            Select Function
          </Typography>
          <FormControl sx={{ m: 3, minWidth: 150 }}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Select Function'
              autoWidth
              variant='outlined'
              defaultValue={parameter}
              onChange={setParameter}
              options={parameters}
            ></Select>
          </FormControl>
          {parameter ? formBuilder() : null}
        </>
      )}
    </>
  );
};

export default Dashboard;
