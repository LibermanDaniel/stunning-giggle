import { Link, Outlet } from 'react-router-dom';
import { useUserStore } from '../common/useUserStore';
import { useToken } from '../auth/useToken';
import React from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);
  const [, setToken] = useToken();

  console.log(user);
  const logOut = () => {
    setToken(null);
    removeUser();
  };

  const main_c = "#7C9473"
  const pages = ['Products', 'Pricing', 'Blog'];

  return (
    <>
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
          <Container>
            <Toolbar sx={{ flexWrap: 'wrap' }}>
              <Typography
                variant="h5"
                noWrap
                component={Link} to="/"
                sx={{
                  mr: 2,
                  display: { md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                GYROGAY
              </Typography>
              {user ? (
                <><Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    component={Link} to="/cube-pool"
                    size="large"
                    sx={{ my: 2, color: 'black', display: 'block', }}
                  >
                    Cube Pool
                  </Button>
                  <Button
                    component={Link} to="/dashboard"
                    size="large"
                    sx={{ m: 2, color: 'black', display: 'block' }}
                  >
                    Dashboard
                  </Button>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' } }}>
                    <Button
                      component={Link} to="/user-page"
                      size="large"
                      variant="contained"
                      sx={{ m: 2, color: 'white', display: 'block'}}
                    >
                      {user?.username}
                    </Button>
                    <Button
                      component={Link} to="/"
                      size="large"
                      variant="outlined"
                      sx={{ my: 2, color: 'black', display: 'block'}}
                      onClick={() => {
                        logOut();
                      }}
                    >
                      Log Out
                    </Button>
                  </Box></>
              ) : (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' } }}>
                  <Button
                    component={Link} to="/login"
                    size="large"
                    variant="contained"
                    sx={{ m: 2, color: 'white', display: 'block'}}
                  >
                    Log in
                  </Button>
                  <Button
                    component={Link} to="/signup"
                    size="large"
                    variant="outlined"
                    sx={{ my: 2, color: 'black', display: 'block'}}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};
