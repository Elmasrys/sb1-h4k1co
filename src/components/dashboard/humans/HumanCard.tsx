import React from 'react';
import { UserCircle, BrainCircuit, Mail, Clock, Shield, MoreVertical } from 'lucide-react';

interface HumanCardProps {
  human: {
    name: string;
    role: string;
    email: string;
    department: string;
    assignedEves: string[];
    status: 'active' | 'away' | 'offline';
    permissions: 'admin' | 'manager' | 'member';
    lastActive: string;
  };
}

export default function HumanCard({ human }: HumanCardProps) {
  const getStatusColor = () => {
    switch (human.status) {
      case 'active':
        return 'bg-[#72f68e]';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-[#040707]/40 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-lg bg-[#72f68e]/20 flex items-center justify-center">
              <UserCircle className="h-6 w-6 text-[#72f68e]" />
            </div>
            <span
              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#040707] ${getStatusColor()}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{human.name}</h3>
            <p className="text-sm text-[#72f68e]">{human.role}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-300">{human.email}</span>
        </div>
        <div className="flex items-center text-sm">
          <Shield className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-300 capitalize">{human.permissions}</span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-300">Last active: {human.lastActive}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center mb-2">
          <BrainCircuit className="h-4 w-4 text-[#72f68e] mr-2" />
          <span className="text-sm font-medium text-white">Assigned EVEs™</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {human.assignedEves.map((eve, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-[#72f68e]/10 text-[#72f68e]"
            >
              {eve}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <button className="flex-1 bg-[#72f68e]/10 text-[#72f68e] hover:bg-[#72f68e]/20 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
          Edit
        </button>
        <button className="flex-1 bg-white/5 text-white hover:bg-white/10 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}