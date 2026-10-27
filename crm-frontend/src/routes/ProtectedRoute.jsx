import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isRouteAllowed, getDefaultRouteForRole } from '../utils/rbac';

export const ProtectedRoute = ({ product = 'crm' }) => {
  const location = useLocation();
  const { isCrmAuthenticated, isOalAuthenticated, crmUser, oalUser } = useAuth();

  const isAuthenticated = product === 'crm' ? isCrmAuthenticated : isOalAuthenticated;
  const currentUser = product === 'crm' ? crmUser : oalUser;

  // 1. Authentication check
  if (!isAuthenticated) {
    return <Navigate to={product === 'crm' ? '/crm/login' : '/oal/login'} state={{ from: location }} replace />;
  }

  // 2. Role-Based Access Control (RBAC) Route Protection
  const isAllowed = isRouteAllowed(location.pathname, product, currentUser);

  if (!isAllowed) {
    const fallbackRoute = getDefaultRouteForRole(product, currentUser);
    return <Navigate to={fallbackRoute} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
