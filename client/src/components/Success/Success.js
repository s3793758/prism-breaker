import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const timeout = 5000;
  const navigate = useNavigate();
  useEffect(() => {
    window.setTimeout(() => {
      navigate('/');
    }, timeout);
  }, []);
  return (
    <>
      <h2>
        Payment is successful. You will be redirected to home page in{' '}
        {timeout / 1000} seconds
      </h2>
      <Confetti />
    </>
  );
};

export default Success;
