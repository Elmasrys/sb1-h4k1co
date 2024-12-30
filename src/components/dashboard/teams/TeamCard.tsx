import React from 'react';
import { Users, Brain, Target, TrendingUp } from 'lucide-react';

interface TeamCardProps {
  team: {
    id: number;
    name: string;
    description: string;
    members: {
      ai: number;
      human: number;
    };
    activeProjects: number;
    performance: number;
  };
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-[#040707]/40 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{team.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{team.description}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Brain className="h-4 w-4 text-[#72f68e]" />
            <span className="text-sm text-gray-300 ml-2">{team.members.ai} EVEs™</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Users className="h-4 w-4 text-[#72f68e]" />
            <span className="text-sm text-gray-300 ml-2">{team.members.human} Executives</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Target className="h-4 w-4 text-[#72f68e]" />
            <span className="text-sm text-gray-300 ml-2">{team.activeProjects} Projects</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-[#72f68e]" />
            <span className="text-sm text-gray-300 ml-2">{team.performance}% Performance</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <button className="flex-1 bg-[#72f68e]/10 text-[#72f68e] hover:bg-[#72f68e]/20 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
          View Details
        </button>
        <button className="flex-1 bg-white/5 text-white hover:bg-white/10 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
          Manage Team
        </button>
      </div>
    </div>
  );
}