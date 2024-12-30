import React, { useState, useEffect } from 'react';
import { Plus, Search, Brain, Filter } from 'lucide-react';
import EVECard from './EVECard';
import EVECreationWizard from './EVECreationWizard';
import EVEDetailsModal from './EVEDetailsModal';
import { useEVEStore } from '../../../store/eveStore';
import { EVE } from '../../../types/eve';
import { useEVEActions } from '../../../hooks/useEVEActions';

export default function EVEListView() {
  const [isCreationWizardOpen, setIsCreationWizardOpen] = useState(false);
  const [selectedEVE, setSelectedEVE] = useState<EVE | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<EVE['type'] | 'all'>('all');

  const { eves, actions, loading, error } = useEVEStore();

  const filteredEVEs = eves.filter(eve => {
    const matchesSearch = eve.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         eve.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || eve.type === filterType;
    return matchesSearch && matchesType;
  });

  const eveActions = useEVEActions(selectedEVE?.id || '');

  const handleEVECreated = (eve: EVE) => {
    // Additional logic after EVE creation if needed
    console.log('EVE created:', eve);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Enterprise Virtual Employees™</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage and monitor your EVE™ workforce
          </p>
        </div>
        <button
          onClick={() => setIsCreationWizardOpen(true)}
          className="flex items-center px-4 py-2 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create EVE™
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search EVEs by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as EVE['type'] | 'all')}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
          >
            <option value="all">All Types</option>
            <option value="orchestrator">Orchestrator</option>
            <option value="specialist">Specialist</option>
            <option value="support">Support</option>
          </select>
        </div>
      </div>

      {/* EVE Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-[#72f68e]/20 border-t-[#72f68e] animate-spin"></div>
            <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-[#72f68e]" />
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : filteredEVEs.length === 0 ? (
        <div className="text-center py-12">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No EVEs Found</h3>
          <p className="text-gray-400">
            {searchQuery || filterType !== 'all'
              ? "Try adjusting your search or filters"
              : "Get started by creating your first EVE™"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEVEs.map((eve) => (
            <EVECard
              key={eve.id}
              eve={eve}
              onClick={() => setSelectedEVE(eve)}
              isOrchestrator={eve.type === 'orchestrator'}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <EVECreationWizard
        isOpen={isCreationWizardOpen}
        onClose={() => setIsCreationWizardOpen(false)}
        onComplete={handleEVECreated}
      />

      {selectedEVE && (
        <EVEDetailsModal
          eve={selectedEVE}
          isOpen={true}
          onClose={() => setSelectedEVE(null)}
          actions={actions.filter(action => action.eve_id === selectedEVE.id)}
        />
      )}
    </div>
  );
}