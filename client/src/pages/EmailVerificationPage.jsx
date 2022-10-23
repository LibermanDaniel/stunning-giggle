import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import axios from 'axios';
import { EmailVerificationSuccess } from './EmailVerificationSuccess';
import { EmailVerificationFail } from './EmailVerificationFail';

export const EmailVerificationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationString } = useParams();
  const [, setToken] = useToken();

  useEffect(() => {
    const loadVerification = async () => {
      try {
        const res = await axios.put('/api/verify-email', {
          verificationString,
        });
        const { token } = res.data;
        setToken(token);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (err) {
        setIsSuccess(false);
        setIsLoading(true);
      }
    };

    loadVerification();
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!isSuccess) return <EmailVerificationFail />;
  return <EmailVerificationSuccess />;
};
