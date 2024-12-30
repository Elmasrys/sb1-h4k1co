import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { LoadingState } from '../common/LoadingState';

export default function DashboardLayout() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <LoadingState message="Loading..." fullScreen />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-[#040707] flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto bg-[#040707]/10 p-6 relative z-0">
          <Suspense fallback={<LoadingState message="Loading content..." />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}