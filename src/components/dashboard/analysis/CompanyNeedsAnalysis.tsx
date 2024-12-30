import React, { useState } from 'react';
import { Building2, Users, Globe2, Brain, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAtlas } from '../../../hooks/useAtlas';
import { EVE } from '../../../types/eve';

interface CompanyNeedsAnalysisProps {
  onAnalysisComplete: (recommendations: Partial<EVE>[]) => void;
}

export default function CompanyNeedsAnalysis({ onAnalysisComplete }: CompanyNeedsAnalysisProps) {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    size: '',
    location: '',
    operations: [] as string[],
    requirements: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { analyzeCompanyNeeds } = useAtlas();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const recommendations = await analyzeCompanyNeeds(JSON.stringify(formData));
      onAnalysisComplete(recommendations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const operationOptions = [
    'Customer Service',
    'Marketing & Sales',
    'Finance & Accounting',
    'HR & Recruitment',
    'IT & Development',
    'Legal & Compliance',
    'Research & Development',
    'Supply Chain',
  ];

  const requirementOptions = [
    'Automation',
    'Data Analysis',
    'Customer Support',
    'Content Creation',
    'Financial Management',
    'Compliance Monitoring',
    'Process Optimization',
    'Risk Management',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Company Needs Analysis</h2>
        <p className="text-gray-400 mt-1">
          Help Atlas understand your company's needs to recommend the optimal EVE™ configuration
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-medium text-white mb-6">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Industry
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Company Size
              </label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                required
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Primary Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-medium text-white mb-6">Operations & Requirements</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-4">
                Key Operational Areas
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {operationOptions.map((operation) => (
                  <label key={operation} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.operations.includes(operation)}
                      onChange={(e) => {
                        const newOperations = e.target.checked
                          ? [...formData.operations, operation]
                          : formData.operations.filter(op => op !== operation);
                        setFormData({ ...formData, operations: newOperations });
                      }}
                      className="rounded border-white/10 text-[#72f68e] focus:ring-[#72f68e]"
                    />
                    <span className="text-gray-300">{operation}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-4">
                Key Requirements
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {requirementOptions.map((requirement) => (
                  <label key={requirement} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.requirements.includes(requirement)}
                      onChange={(e) => {
                        const newRequirements = e.target.checked
                          ? [...formData.requirements, requirement]
                          : formData.requirements.filter(req => req !== requirement);
                        setFormData({ ...formData, requirements: newRequirements });
                      }}
                      className="rounded border-white/10 text-[#72f68e] focus:ring-[#72f68e]"
                    />
                    <span className="text-gray-300">{requirement}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 border-2 border-[#040707]/20 border-t-[#040707] rounded-full animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Needs
                <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}