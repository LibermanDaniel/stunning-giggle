import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { useAuthContext } from '../auth/useAuthContext';
import { AuthContext } from '../auth/authContext';
import * as React from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export const Navbar = () => {
  const { dispatch } = useAuthContext();
  const { user } = useContext(AuthContext);

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch({ state: 'LOGOUT' });
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: '#7C9473',
        }}
      >
        <AppBar
          position='static'
          color='default'
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              GYROCUBE
            </Typography>
            <nav className='navigation'>
              {user ? (
                <>
                  <div className='navigation-menu'>
                    <Link
                      variant='button'
                      color='text.primary'
                      href='#'
                      underline='none'
                      sx={{ my: 1, mx: 1.5 }}
                      to='cube-pool'
                    >
                      Cube Pool
                    </Link>

                    <Link
                      variant='button'
                      color='text.primary'
                      href='#'
                      underline='none'
                      sx={{ my: 1, mx: 1.5 }}
                      to='/dashboard'
                    >
                      Dashboard
                    </Link>

                    <IconButton
                      size='large'
                      aria-label='account of current user'
                      aria-haspopup='true'
                      color='inherit'
                    >
                      <Link to='user-page'>{user?.username}</Link>
                    </IconButton>

                    <button
                      size='medium'
                      variant='outlined'
                      sx={{ my: 1, mx: 1.5 }}
                      color='#primary'
                    >
                      <Link to='/' underline='none' onClick={logOut}>
                        Log out
                      </Link>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className='navigation-menu'>
                    <Link
                      variant='button'
                      underline='none'
                      href='#'
                      color='text.primary'
                      sx={{ my: 1, mx: 1.5 }}
                      to='/'
                    >
                      Homepage
                    </Link>

                    <button>
                      <Link to='/login'>Login</Link>
                    </button>

                    <button>
                      <Link to='/signup'>Register</Link>
                    </button>
                  </div>
                </>
              )}
              <Outlet />
            </nav>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};
