import React from 'react';
import { DollarSign, TrendingUp, Clock, Users } from 'lucide-react';

interface Props {
  timeRange: string;
}

export default function CostSavings({ timeRange }: Props) {
  const savings = [
    {
      category: 'Labor Cost Reduction',
      amount: '$125,000',
      percentage: '45%',
      description: 'Through EVE™ automation of routine tasks',
      trend: 'up',
      icon: Users
    },
    {
      category: 'Process Optimization',
      amount: '$85,000',
      percentage: '32%',
      description: 'Improved efficiency with EVE™ operations',
      trend: 'up',
      icon: TrendingUp
    },
    {
      category: 'Time Savings',
      amount: '$95,000',
      percentage: '38%',
      description: 'Faster decision-making by EVEs™',
      trend: 'up',
      icon: Clock
    }
  ];

  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-6">Cost Analysis & Savings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {savings.map((item, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-[#72f68e]/20">
                <item.icon className="h-5 w-5 text-[#72f68e]" />
              </div>
              <h3 className="text-white font-medium">{item.category}</h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-white">{item.amount}</span>
                <span className="text-[#72f68e] text-sm">+{item.percentage}</span>
              </div>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-[#72f68e]" />
            <h3 className="text-white font-medium">Total Projected Annual Savings</h3>
          </div>
          <span className="text-2xl font-bold text-white">$305,000</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-[#72f68e] to-[#f4f4f4] rounded-full" />
        </div>
        <p className="mt-2 text-sm text-gray-400">75% of projected target achieved</p>
      </div>
    </div>
  );
}