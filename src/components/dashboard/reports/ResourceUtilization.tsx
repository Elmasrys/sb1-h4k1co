import React from 'react';
import { Cpu, Brain, Network, Database } from 'lucide-react';

interface Props {
  timeRange: string;
}

export default function ResourceUtilization({ timeRange }: Props) {
  const resources = [
    {
      name: 'EVE™ Model Usage',
      total: '1.2M',
      used: '820K',
      percentage: 68,
      icon: Brain,
      color: 'from-[#72f68e] to-[#f4f4f4]',
    },
    {
      name: 'API Calls',
      total: '5M',
      used: '3.1M',
      percentage: 62,
      icon: Network,
      color: 'from-[#72f68e] to-[#040707]',
    },
    {
      name: 'Data Processing',
      total: '500GB',
      used: '275GB',
      percentage: 55,
      icon: Database,
      color: 'from-[#040707] to-[#72f68e]',
    },
    {
      name: 'Compute Resources',
      total: '1000 hrs',
      used: '680 hrs',
      percentage: 68,
      icon: Cpu,
      color: 'from-[#72f68e] to-[#f4f4f4]',
    },
  ];

  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-6">Resource Utilization</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <div key={resource.name} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg bg-[#72f68e]/20`}>
                <resource.icon className="h-5 w-5 text-[#72f68e]" />
              </div>
              <h3 className="text-white font-medium">{resource.name}</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Used: {resource.used}</span>
                <span className="text-gray-400">Total: {resource.total}</span>
              </div>
              
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${resource.color}`}
                  style={{ width: `${resource.percentage}%` }}
                />
              </div>
              
              <div className="text-right">
                <span className="text-sm text-[#72f68e]">{resource.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}