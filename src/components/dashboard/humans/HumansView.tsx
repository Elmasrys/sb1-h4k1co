import React, { useState } from 'react';
import { Plus, Search, UserCircle, BrainCircuit, Mail, Building2 } from 'lucide-react';
import HumanCard from './HumanCard';
import NewHumanModal from './NewHumanModal';

const mockHumans = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Chief Executive Officer',
    email: 'sarah@mavrika.ai',
    department: 'Executive',
    assignedEves: ['Atlas', 'Nova'],
    status: 'active',
    permissions: 'admin',
    lastActive: '2 minutes ago'
  },
  {
    id: 2,
    name: 'Michael Roberts',
    role: 'Chief Technology Officer',
    email: 'michael@mavrika.ai',
    department: 'Technology',
    assignedEves: ['Quantum', 'Circuit'],
    status: 'active',
    permissions: 'admin',
    lastActive: '5 minutes ago'
  },
  {
    id: 3,
    name: 'Emily Parker',
    role: 'Head of Marketing',
    email: 'emily@mavrika.ai',
    department: 'Marketing',
    assignedEves: ['Echo', 'Luna'],
    status: 'away',
    permissions: 'manager',
    lastActive: '1 hour ago'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Financial Director',
    email: 'david@mavrika.ai',
    department: 'Finance',
    assignedEves: ['Ledger', 'Vault'],
    status: 'active',
    permissions: 'manager',
    lastActive: '15 minutes ago'
  }
] as const;

export default function HumansView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHumans = mockHumans.filter(human => 
    human.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    human.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    human.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Human Team</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your human workforce and their EVE™ collaborations
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Team Member
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, role, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#72f68e] focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <UserCircle className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">+2 this month</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">24</div>
            <div className="text-sm text-gray-400">Total Members</div>
          </div>
        </div>

        <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <BrainCircuit className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">98% match</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">3.5</div>
            <div className="text-sm text-gray-400">EVEs™ per Human</div>
          </div>
        </div>

        <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <Building2 className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">+1 this week</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-sm text-gray-400">Departments</div>
          </div>
        </div>

        <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <Mail className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">Active</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">92%</div>
            <div className="text-sm text-gray-400">Engagement Rate</div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHumans.map((human) => (
          <HumanCard key={human.id} human={human} />
        ))}
      </div>

      {/* New Human Modal */}
      <NewHumanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}