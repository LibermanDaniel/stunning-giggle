import { useUser } from '../auth/useUser';
import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';


import { useToken } from '../auth/useToken';

export const Navbar = () => {
  const [username, setUsername] = useState('');
  const [verified, setVerified] = useState(false);
  const user = useUser();
  let token = localStorage.getItem('token') || '';

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setVerified(user.isVerified);
    }
  }, [user]);

  const logOut = () => {
    localStorage.removeItem('token');
    setUsername('');
    setVerified(false);
  };
  return (
    <Box
    sx={{

      backgroundColor:"#7C9473"
    }}
  >
    <nav>
      {username && <p>Hello {user.username}</p>}
      <Link to='cube-pool'>Cube Pool</Link>
      <Link to='user-page'>User Page</Link>
      <Link to='/'>Homepage</Link>
      {verified ? (
        <Link to='/' onClick={logOut}>
          Log out
        </Link>
      ) : (
        <Link to='/login'>Login</Link>
      )}
      <Link to='/signup'>Register</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <Outlet />
    </nav>
    </Box>
  
  );
};
