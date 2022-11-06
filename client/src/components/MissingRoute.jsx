import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';

export const MissingRoute = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <Navigate to={{ pathname: '/dashboard' }} />
      ) : (
        <Navigate to={{ pathname: '/' }} />
      )}
    </>
  );
};
