import React, { useState } from 'react';
import { useEVEStore } from '../../../store/eveStore';
import TaskVisualization from './TaskVisualization';
import { Brain, ChevronDown } from 'lucide-react';

export default function TaskQueueView() {
  const [selectedEVE, setSelectedEVE] = useState<string | null>(null);
  const { eves } = useEVEStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Task Queue</h1>
          <p className="mt-1 text-sm text-gray-400">
            Monitor and manage EVE™ task queues
          </p>
        </div>

        <select
          value={selectedEVE || ''}
          onChange={(e) => setSelectedEVE(e.target.value || null)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
        >
          <option value="">Select EVE™</option>
          {eves.map(eve => (
            <option key={eve.id} value={eve.id}>{eve.name}</option>
          ))}
        </select>
      </div>

      {selectedEVE ? (
        <TaskVisualization eveId={selectedEVE} />
      ) : (
        <div className="text-center py-12">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Select an EVE™</h3>
          <p className="text-gray-400">
            Choose an EVE™ from the dropdown to view its task queue
          </p>
        </div>
      )}
    </div>
  );
}