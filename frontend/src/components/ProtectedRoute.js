import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Get user and loading state from AuthContext

  // Show a loading indicator while checking authentication status
  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or skeleton loader if needed
  }

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    alert("You must log in to access this page.");
    return <Navigate to="/login" />;
  }

  // Render the protected content if the user is authenticated
  return children;
};

export default ProtectedRoute;
