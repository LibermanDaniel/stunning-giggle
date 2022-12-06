import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { AuthContext } from '../auth/authContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Image } from '@mui/material';
import loginSerivce from '../services/login';

import '../styles/auth.css';


const theme = createTheme();

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { token } = await loginSerivce.login({
        username,
        password,
      });
      if (token === null) {
        navigate('/login');
        setErrorMessage('Error occurred while trying to log in!');
      } else {
        setToken(token);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage('Invalid username or password!');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      console.log(error);
    }
  };

  const handleUsernameChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      
      <Grid
        container
        component='main'
        sx={{ height: { lg: '93vh', md: '92.9vh' } }}
      >
        <CssBaseline />
        <Grid
          className='logInContainer'
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
        >
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: { lg: '20%' },
                paddingLeft: { lg: '20%' },
              }}
            >


              <Avatar sx={{ m: 1, bgcolor: '#7C9473' }}>
                <LockOutlinedIcon />
              </Avatar>
              {
                <Typography component='body' variant='body'>
                  {errorMessage}
                </Typography>
              }
              <Typography component='h1' variant='h5'>
                Login
              </Typography>
              <Box
                component='form'
                onSubmit={handleLogin}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                  margin='normal'
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                  autoFocus
                  onChange={handleUsernameChange}
                />
                 </Grid>

                <Grid item xs={12}>
                <TextField
                  margin='normal'
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  onChange={handlePasswordChange}
                />
                 </Grid>
                 <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
                </Grid>
                
                </Grid>

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>

                <Box
                  component='form'
                  onSubmit={handleLogin}
                  noValidate
                  sx={{ mt: 10 }}
                >
                   <Grid container justifyContent='flex-end'>
                    <Grid item xs>
                      <Link href='forgot-password' variant='body2'>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href='signup' variant='body2'>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
            </Box>
        </Grid>
        
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: 'flex',
            backgroundColor: '#7C9473',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item sx={{ display: { sx: 'none' } }}>
            <img src='./user-login.png' alt='gyro-logo' className='logInIllu' />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
