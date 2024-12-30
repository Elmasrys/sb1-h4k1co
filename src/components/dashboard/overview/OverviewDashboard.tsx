import React from 'react';
import { useCompanyStore } from '../../../store/companyStore';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoadingState } from '../../common/LoadingState';
import { useQuery } from '../../../hooks/useQuery';

export default function OverviewDashboard() {
  const { company } = useCompanyStore();
  const { data: companyData, isLoading, error } = useQuery(
    ['company', company?.id],
    `/api/companies/${company?.id}`,
    {
      enabled: !!company?.id
    }
  );

  if (isLoading) {
    return <LoadingState message="Loading company data..." />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
          Failed to load company data. Please try again.
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-8 border border-white/10">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Welcome to mavrika</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Let's get started by setting up your company profile.
            </p>
            <Link
              to="/setup"
              className="inline-flex items-center px-6 py-3 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Setup Company
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome to {company.name}</h1>
          <p className="mt-1 text-sm text-gray-400">
            Let's get started by setting up your first EVE™
          </p>
        </div>
      </div>

      <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-8 border border-white/10">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Create Your First EVE™</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            EVEs™ (Enterprise Virtual Employees) help automate and manage your company operations.
            Start by creating your first EVE™ to begin automating tasks.
          </p>
          <Link
            to="/dashboard/agents"
            className="inline-flex items-center px-6 py-3 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create EVE™
          </Link>
        </div>
      </div>
    </div>
  );
}