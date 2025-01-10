import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export const PublicRoute = () => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};