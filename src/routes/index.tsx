import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingState } from '../components/common/LoadingState';
import { ProtectedRoute } from './ProtectedRoute';

// Lazy load components
const LandingPage = lazy(() => import('../components/LandingPage'));
const AuthForm = lazy(() => import('../components/auth/AuthForm'));
const SetupWizard = lazy(() => import('../components/setup/SetupWizard'));
const DashboardLayout = lazy(() => import('../components/dashboard/DashboardLayout'));
const OverviewDashboard = lazy(() => import('../components/dashboard/overview/OverviewDashboard'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingState fullScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthForm />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/setup" element={<SetupWizard />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<OverviewDashboard />} />
            {/* Other dashboard routes */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}