import React from 'react';
import { Brain, TrendingUp, Zap, Target } from 'lucide-react';
import InsightCard from './InsightCard';
import OptimizationSuggestions from './OptimizationSuggestions';
import PerformanceMetrics from './PerformanceMetrics';

const insights = [
  {
    id: 1,
    department: 'Marketing',
    insight: 'Email campaign open rates could be improved by 23% using EVE™-optimized subject lines',
    impact: 'high',
    timeToImplement: '2 hours',
    aiTeam: 'Marketing EVE™',
    status: 'ready',
  },
  {
    id: 2,
    department: 'Sales',
    insight: 'Customer response time can be reduced by 45% through EVE™ automated initial contact',
    impact: 'medium',
    timeToImplement: '4 hours',
    aiTeam: 'Sales EVE™',
    status: 'in_progress',
  },
  {
    id: 3,
    department: 'Development',
    insight: 'Code review efficiency can be increased by 30% using EVE™-assisted analysis',
    impact: 'high',
    timeToImplement: '1 day',
    aiTeam: 'Dev EVE™',
    status: 'pending',
  },
] as const;

const metrics = {
  efficiency: 89,
  accuracy: 95,
  satisfaction: 92,
  trend: '+5.2%',
};

export default function FeedbackLoopView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">EVE™ Feedback Loop</h1>
          <p className="mt-1 text-sm text-gray-400">
            Real-time insights and optimizations across all departments
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#72f68e]/10 rounded-lg px-4 py-2">
          <Brain className="h-5 w-5 text-[#72f68e]" />
          <span className="text-sm text-[#72f68e]">EVE™ Analysis Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-[#040707]/40 transition-all duration-300">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-[#72f68e] mr-2" />
            <h2 className="text-lg font-semibold text-white">Efficiency Score</h2>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{metrics.efficiency}%</div>
          <p className="text-sm text-gray-400">Overall system efficiency</p>
        </div>
        
        <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-[#040707]/40 transition-all duration-300">
          <div className="flex items-center mb-4">
            <Zap className="h-5 w-5 text-[#72f68e] mr-2" />
            <h2 className="text-lg font-semibold text-white">EVE™ Accuracy</h2>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{metrics.accuracy}%</div>
          <p className="text-sm text-gray-400">Decision-making accuracy</p>
        </div>
        
        <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-[#040707]/40 transition-all duration-300">
          <div className="flex items-center mb-4">
            <Target className="h-5 w-5 text-[#72f68e] mr-2" />
            <h2 className="text-lg font-semibold text-white">Goal Achievement</h2>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{metrics.satisfaction}%</div>
          <p className="text-sm text-gray-400">Target objectives met</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Latest Insights</h2>
          <div className="space-y-4">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
        
        <div>
          <OptimizationSuggestions />
          <PerformanceMetrics className="mt-6" />
        </div>
      </div>
    </div>
  );
}