import React from 'react';
import { Activity } from 'lucide-react';

interface PerformanceMetricsProps {
  className?: string;
}

const metrics = [
  {
    name: 'EVE™ Response Time',
    current: 2.3,
    previous: 3.8,
    unit: 'minutes',
    trend: 'decrease',
  },
  {
    name: 'Task Completion',
    current: 94,
    previous: 88,
    unit: '%',
    trend: 'increase',
  },
  {
    name: 'Error Rate',
    current: 0.5,
    previous: 1.2,
    unit: '%',
    trend: 'decrease',
  },
] as const;

export default function PerformanceMetrics({ className = '' }: PerformanceMetricsProps) {
  return (
    <div className={`bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 ${className}`}>
      <div className="flex items-center mb-6">
        <Activity className="h-5 w-5 text-[#72f68e] mr-2" />
        <h2 className="text-lg font-semibold text-white">Performance Metrics</h2>
      </div>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{metric.name}</span>
              <span className="text-sm font-medium text-white">
                {metric.current}{metric.unit}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Previous: {metric.previous}{metric.unit}</span>
              <span className={metric.trend === 'increase' ? 'text-[#72f68e]' : 'text-[#72f68e]'}>
                {metric.trend === 'increase' ? '↑' : '↓'} 
                {Math.abs(((metric.current - metric.previous) / metric.previous) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}