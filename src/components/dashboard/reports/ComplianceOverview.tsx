import React from 'react';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

interface Props {
  timeRange: string;
}

export default function ComplianceOverview({ timeRange }: Props) {
  const compliance = {
    score: 98,
    total: 245,
    passed: 240,
    warning: 5,
    failed: 0,
    categories: [
      {
        name: 'Data Protection',
        status: 'passed',
        checks: 68,
        icon: Shield
      },
      {
        name: 'EVE™ Ethics',
        status: 'warning',
        checks: 45,
        icon: Shield
      },
      {
        name: 'Security',
        status: 'passed',
        checks: 92,
        icon: Shield
      },
      {
        name: 'Operational',
        status: 'passed',
        checks: 40,
        icon: Shield
      }
    ]
  };

  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-6">Compliance & Security</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Card */}
        <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Compliance Score</h3>
            <span className="text-2xl font-bold text-[#72f68e]">{compliance.score}%</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Total Checks</span>
              <span className="text-white">{compliance.total}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Passed</span>
              <span className="text-[#72f68e]">{compliance.passed}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Warnings</span>
              <span className="text-yellow-500">{compliance.warning}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Failed</span>
              <span className="text-red-500">{compliance.failed}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="lg:col-span-2 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
          <h3 className="text-white font-medium mb-4">Compliance Categories</h3>
          
          <div className="space-y-4">
            {compliance.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-[#72f68e]/20">
                    <category.icon className="h-5 w-5 text-[#72f68e]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{category.name}</h4>
                    <p className="text-sm text-gray-400">{category.checks} checks</p>
                  </div>
                </div>
                
                {category.status === 'passed' ? (
                  <CheckCircle className="h-5 w-5 text-[#72f68e]" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}