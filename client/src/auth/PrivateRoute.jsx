import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './useUser';
import { useEffect } from 'react';
import { useAuthContext } from '../auth/useAuthContext';

export const PrivateRoute = () => {
  const user = useUser();
  const { dispatch } = useAuthContext();

  useEffect(() => {
    if (user) {
      dispatch({ state: 'LOGIN', payload: user });
    }
  }, [dispatch, user]);

  return user?.isVerified && user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};
