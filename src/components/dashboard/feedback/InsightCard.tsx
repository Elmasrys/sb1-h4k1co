import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Brain } from 'lucide-react';

interface InsightCardProps {
  insight: {
    department: string;
    insight: string;
    impact: 'high' | 'medium' | 'low';
    timeToImplement: string;
    aiTeam: string;
    status: 'ready' | 'in_progress' | 'pending';
  };
}

export default function InsightCard({ insight }: InsightCardProps) {
  const getImpactColor = () => {
    switch (insight.impact) {
      case 'high':
        return 'text-[#72f68e]';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (insight.status) {
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-[#72f68e]" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-[#040707]/40 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Brain className="h-4 w-4 text-[#72f68e] mr-2" />
            <span className="text-sm font-medium text-[#72f68e]">{insight.aiTeam}</span>
          </div>
          <p className="text-sm text-white mb-2">{insight.insight}</p>
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-gray-400">Department: {insight.department}</span>
            <span className={getImpactColor()}>Impact: {insight.impact}</span>
            <span className="text-gray-400">Time: {insight.timeToImplement}</span>
          </div>
        </div>
        <div className="ml-4">{getStatusIcon()}</div>
      </div>
    </div>
  );
}