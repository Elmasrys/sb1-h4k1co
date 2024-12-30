import React from 'react';
import { Brain, Activity, Clock, Plus, Zap, Bot } from 'lucide-react';
import { EVE } from '../../../types/eve';

interface EVECardProps {
  eve: EVE;
  onClick: () => void;
  isOrchestrator?: boolean;
}

export default function EVECard({ eve, onClick, isOrchestrator = false }: EVECardProps) {
  const statusColors = {
    active: 'bg-[#72f68e]',
    idle: 'bg-yellow-500',
    busy: 'bg-purple-500',
  };

  return (
    <div className={`bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-[#040707]/40 transition-all duration-300 ${
      isOrchestrator ? 'ring-2 ring-[#72f68e]/20' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className={`h-12 w-12 rounded-lg ${
              isOrchestrator ? 'bg-[#72f68e]/30' : 'bg-[#72f68e]/20'
            } flex items-center justify-center`}>
              {isOrchestrator ? (
                <Zap className="h-6 w-6 text-[#72f68e]" />
              ) : (
                <Brain className="h-6 w-6 text-[#72f68e]" />
              )}
            </div>
            <span
              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#040707] ${
                statusColors[eve.status]
              }`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{eve.name}</h3>
            <p className="text-sm text-[#72f68e]">{eve.role}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {eve.capabilities.slice(0, 3).map((capability, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-[#72f68e]/10 text-[#72f68e]"
          >
            {capability}
          </span>
        ))}
        {eve.capabilities.length > 3 && (
          <span className="text-xs px-2 py-1 rounded-full bg-[#72f68e]/10 text-[#72f68e]">
            +{eve.capabilities.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-300">
            {eve.performance.tasks_completed} Tasks
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-300">
            {eve.performance.efficiency}% Efficiency
          </span>
        </div>
      </div>

      <button
        onClick={onClick}
        className="mt-6 w-full bg-[#72f68e]/10 text-[#72f68e] hover:bg-[#72f68e]/20 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        View Details
      </button>
    </div>
  );
}