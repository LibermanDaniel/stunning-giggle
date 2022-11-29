import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { useUserStore } from '../common/useUserStore';
import { useAuthContext } from '../auth/useAuthContext';
import { useToken } from '../auth/useToken';
import { AuthContext } from '../auth/authContext';

export const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);
  const [, setToken] = useToken();

  const logOut = () => {
    setToken(null);
    removeUser();
  };

  return (
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
  );
};
