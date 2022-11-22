import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { useAuthContext } from '../auth/useAuthContext';
import { AuthContext } from '../auth/authContext';

export const Navbar = () => {
  const { dispatch } = useAuthContext();
  const { user } = useContext(AuthContext);

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch({ state: 'LOGOUT' });
  };

  return (
    <Box
    sx={{

      backgroundColor:"#7C9473"
    }}
  >
    <nav>
      {user ? (
        <>
          <div>
            <Link to='cube-pool'>Cube Pool</Link>
            <Link to='/dashboard'>Dashboard</Link>
          </div>
          <div>
            <Link to='user-page'>{user?.username}</Link>
            <Link to='/' onClick={logOut}>
              Log out
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to='/'>Homepage</Link>
          </div>
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Register</Link>
          </div>
        </>
      )}
      <Outlet />
    </nav>
    </Box>
  
  );
};
