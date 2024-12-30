import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCompanyStore } from '../store/companyStore';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { LoadingState } from '../components/common/LoadingState';

export function ProtectedRoute() {
  const { user, loading: authLoading } = useAuthStore();
  const { company, loading: companyLoading } = useCompanyStore();
  const { subscription, loading: subscriptionLoading } = useSubscriptionStore();

  if (authLoading || companyLoading || subscriptionLoading) {
    return <LoadingState fullScreen />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If no company, redirect to setup
  if (!company && window.location.pathname !== '/setup') {
    return <Navigate to="/setup" replace />;
  }

  // If company exists but no subscription, redirect to setup
  if (company && !subscription && window.location.pathname !== '/setup') {
    return <Navigate to="/setup" replace />;
  }

  return <Outlet />;
}