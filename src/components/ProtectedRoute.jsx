
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function ProtectedRoute({ children }) {
  const { doctor } = useAppContext(); // useContext: check if logged in

  // If not logged in, send user to login page
  if (!doctor) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, show the actual page
  return children;
}

export default ProtectedRoute;
