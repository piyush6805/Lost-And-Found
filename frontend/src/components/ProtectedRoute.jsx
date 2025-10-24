import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  let location = useLocation();

    // If there is no token, redirect to login.
  if (!token) {
    // Redirect them to the /login page, but save the location they were
    // trying to go to so we can send them there after they login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If there is a token, show the page.
  // The 'App.jsx' component is responsible for fetching the user data.
  return children;
};

export default ProtectedRoute;