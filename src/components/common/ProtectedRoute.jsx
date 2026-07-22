import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/authentication/authContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // If the user is not logged in, redirect them to the login page safely
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, render the page they requested
  return children;
}