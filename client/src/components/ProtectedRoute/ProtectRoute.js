import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ isLoggedIn });
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  return isLoggedIn && <>{children}</>;
};

export default ProtectedRoute;
