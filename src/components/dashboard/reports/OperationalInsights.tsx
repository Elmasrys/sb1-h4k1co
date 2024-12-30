import React from 'react';
import { Activity, ArrowRight, Brain, Zap, Target, Shield } from 'lucide-react';

interface Props {
  timeRange: string;
}

export default function OperationalInsights({ timeRange }: Props) {
  const insights = [
    {
      category: 'EVE™ Optimization',
      insight: 'Customer support response time reduced by 45% through EVE™-powered ticket routing',
      impact: 'High',
      department: 'Customer Service',
      status: 'Implemented',
      icon: Brain
    },
    {
      category: 'Resource Allocation',
      insight: 'EVEs™ redistributed workload during peak hours, improving efficiency by 32%',
      impact: 'Medium',
      department: 'Operations',
      status: 'In Progress',
      icon: Zap
    },
    {
      category: 'Cost Reduction',
      insight: 'Automated data processing by EVEs™ reduced operational costs by 65%',
      impact: 'High',
      department: 'Finance',
      status: 'Implemented',
      icon: Target
    },
    {
      category: 'Quality Improvement',
      insight: 'EVE™ review process decreased error rates in documentation by 78%',
      impact: 'Medium',
      department: 'Legal',
      status: 'Monitoring',
      icon: Shield
    }
  ];

  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Operational Insights</h2>
        <button className="text-[#72f68e] hover:text-[#72f68e]/80 text-sm flex items-center">
          View All Insights
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {insights.map((item, index) => (
          <div 
            key={index} 
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-[#72f68e]/20">
                    <item.icon className="h-4 w-4 text-[#72f68e]" />
                  </div>
                  <span className="text-sm font-medium text-[#72f68e]">{item.category}</span>
                </div>
                <p className="text-white">{item.insight}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">Impact: {item.impact}</span>
                  <span className="text-gray-400">Department: {item.department}</span>
                  <span className={`${
                    item.status === 'Implemented' ? 'text-[#72f68e]' :
                    item.status === 'In Progress' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="h-5 w-5 text-[#72f68e]" />
          <span className="text-white font-medium">Overall System Impact</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
          <div className="h-full w-[85%] bg-gradient-to-r from-[#72f68e] to-[#f4f4f4] rounded-full" />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Efficiency Improvement</span>
          <span className="text-[#72f68e]">85%</span>
        </div>
      </div>
    </div>
  );
}