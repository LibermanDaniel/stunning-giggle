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
import loginSerivce from '../services/login';

const theme = createTheme();

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  if (user) {
    navigate('/');
  }

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
              <CssBaseline />

          <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
            
          }}
        >
    
      <Container component="main" maxWidth="xs" >

        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 1,
            borderColor: 'grey.200',
            boxShadow: 1,
            borderRadius: '16px',
            backgroundColor:"#FFFFFF"
          }}
        >
          {<Typography component="body" variant="body">{errorMessage}</Typography>}
          
          <Avatar sx={{ m: 1, bgcolor: '#7C9473' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleUsernameChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Box
              component='form'
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 1 }}
            >
             
              <Grid container>
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
        
      </Container>
      </Box>
    </ThemeProvider>
  );
};
