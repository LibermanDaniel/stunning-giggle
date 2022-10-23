import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (() =>
      setTimeout(() => {
        navigate('/login');
      }, 3000))();
  });

  return (
    <div>
      <h1>Success!</h1>
      <p>Your password has been reset successfully!</p>
      <button
        onClick={() => {
          navigate('/login');
        }}
      >
        Go to login
      </button>
    </div>
  );
};
