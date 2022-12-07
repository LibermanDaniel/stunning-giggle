import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { AuthContext } from '../auth/authContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { register } from '../services/register';
import { Paper, Image } from '@mui/material';

import '../styles/auth.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7C9473',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#CFDBC7',
      contrastText: '#FFFFFF',
    },
  },
});

export const SignUp = () => {
  const [, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const { token } = await register({ username, password, email });
      setToken(token);

      navigate('/please-verify');
    } catch (error) {
      setErrorMessage('Error occurred!');
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

  const handleConfirmPassword = (event) => {
    event.preventDefault();
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
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
          className='signUpContainer'
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
              {errorMessage && <div className='fail'>{errorMessage}</div>}
              <Typography component='h1' variant='h5'>
                Sign up
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleRegistration}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete='user-name'
                      name='userName'
                      required
                      fullWidth
                      id='userName'
                      label='Username'
                      autoFocus
                      onChange={handleUsernameChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                      onChange={handleEmailChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      autoComplete='new-password'
                      onChange={handlePasswordChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name='confirmPassword'
                      label='Confirm Password'
                      type='password'
                      id='confirmPassword'
                      autoComplete='new-password'
                      onChange={handleConfirmPassword}
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={
                    !username ||
                    !email ||
                    !password ||
                    password !== confirmPassword
                  }
                >
                  Sign Up
                </Button>
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Link href='login' variant='body2'>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
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
            <img src='./sign-up.png' alt='gyro-logo' className='signUpIllu' />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
