import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/');
  }

  return <>{children}</>;
};

export default ProtectedRoute;
