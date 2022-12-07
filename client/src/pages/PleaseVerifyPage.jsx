import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';

export const PleaseVerifyPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (user) {
    navigate('/dashboard');
  }

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 5000);
  }, [navigate]);

  return (
    <div>
      <h1>Thanks for signing up!</h1>
      <p>
        You will receive a verification email shortly to the email you have
        provided.
      </p>
      <p>Please verify to utilize the web application's features.</p>
    </div>
  );
};
