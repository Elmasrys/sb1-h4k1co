import React from 'react';
import { Plus, Users } from 'lucide-react';
import TeamCard from './TeamCard';

const mockTeams = [
  {
    id: 1,
    name: 'Strategic Operations',
    description: 'Executive decision-making and EVE™ orchestration',
    members: {
      ai: 5,
      human: 2, // CEO and COO
    },
    activeProjects: 8,
    performance: 96,
  },
  {
    id: 2,
    name: 'Product Development',
    description: 'Product innovation with EVE™ assistance',
    members: {
      ai: 12,
      human: 1, // CTO
    },
    activeProjects: 15,
    performance: 94,
  },
  {
    id: 3,
    name: 'Growth & Marketing',
    description: 'Market expansion with EVE™-driven strategies',
    members: {
      ai: 8,
      human: 1, // CMO
    },
    activeProjects: 12,
    performance: 92,
  },
  {
    id: 4,
    name: 'Customer Experience',
    description: 'EVE™-powered support automation',
    members: {
      ai: 15,
      human: 0, // Fully automated
    },
    activeProjects: 10,
    performance: 95,
  },
  {
    id: 5,
    name: 'Financial Operations',
    description: 'Financial management with EVE™ optimization',
    members: {
      ai: 6,
      human: 1, // CFO
    },
    activeProjects: 7,
    performance: 98,
  }
] as const;

export default function TeamsView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Teams</h1>
          <p className="mt-1 text-sm text-gray-400">
            EVE™-First Teams with Strategic Human Oversight
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          Create Team
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}