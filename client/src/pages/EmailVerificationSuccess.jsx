import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const EmailVerificationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (() =>
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000))();
  });

  return (
    <div>
      <h1>Success!</h1>
      <p>Thanks for verifying your email!</p>
      <button
        onClick={() => {
          navigate('/dashboard');
        }}
      >
        Go to dashboard
      </button>
    </div>
  );
};
