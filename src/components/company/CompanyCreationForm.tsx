import React, { useState } from 'react';
import { Building2, Globe2, Briefcase, ArrowRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCompanyStore } from '../../store/companyStore';
import { CompanySchema } from '../../types/company';
import { z } from 'zod';

type CompanyFormData = z.infer<typeof CompanySchema>;

export default function CompanyCreationForm() {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    type: 'corporation',
    jurisdiction: '',
    contact: {
      email: '',
      phone: ''
    },
    settings: {
      autonomy_level: 'medium',
      human_oversight_required: ['financial_decisions', 'legal_matters'],
      notification_preferences: {
        email: true,
        push: true,
        urgency_threshold: 'medium'
      },
      industry: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { createCompany } = useCompanyStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create company and redirect to EVE creation
      await createCompany(formData);
      navigate('/dashboard/create-eve');
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error && err.message.includes('sign in')) {
        setError('Please sign in to create a company');
        navigate('/auth');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to create company');
      }
      console.error('Error creating company:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040707] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <div className="flex justify-center items-center mb-6">
            <div className="w-3 h-3 rounded-full bg-[#72f68e]" />
            <span className="text-2xl font-bold text-white ml-2">mavrika</span>
          </div>
          <h2 className="text-center text-3xl font-bold text-white">
            Create Your Company
          </h2>
          <p className="mt-2 text-center text-gray-400">
            Set up your company profile to get started with EVE™ automation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Company Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as CompanyFormData['type'] })}
                  className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                >
                  <option value="corporation">Corporation</option>
                  <option value="llc">LLC</option>
                  <option value="nonprofit">Non-Profit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Jurisdiction
                </label>
                <input
                  type="text"
                  value={formData.jurisdiction}
                  onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                  className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                  placeholder="e.g., Delaware, USA"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Industry
                </label>
                <input
                  type="text"
                  value={formData.settings.industry}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: { ...formData.settings, industry: e.target.value }
                  })}
                  className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                  placeholder="e.g., Technology, Healthcare"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, email: e.target.value }
                  })}
                  className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Autonomy Level
                </label>
                <select
                  value={formData.settings.autonomy_level}
                  onChange={(e) => setFormData({
                    ...formData,
                    settings: { ...formData.settings, autonomy_level: e.target.value as CompanyFormData['settings']['autonomy_level'] }
                  })}
                  className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                >
                  <option value="full">Full - Complete Automation</option>
                  <option value="high">High - Minimal Human Oversight</option>
                  <option value="medium">Medium - Balanced Automation</option>
                  <option value="low">Low - High Human Oversight</option>
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#040707] bg-[#72f68e] hover:bg-[#72f68e]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#72f68e] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-[#040707]/20 border-t-[#040707] rounded-full animate-spin" />
            ) : (
              <div className="flex items-center">
                Create Company
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}