import React, { useState } from 'react';
import { X, Brain, Activity, Clock, CheckCircle, AlertTriangle, Filter } from 'lucide-react';
import { EVE, EVEAction } from '../../../types/eve';
import { format } from 'date-fns';
import EVEActionLog from './EVEActionLog';

interface EVEDetailsModalProps {
  eve: EVE;
  isOpen: boolean;
  onClose: () => void;
  actions: EVEAction[];
}

export default function EVEDetailsModal({ eve, isOpen, onClose, actions }: EVEDetailsModalProps) {
  const [actionFilter, setActionFilter] = useState<EVEAction['type'] | 'all'>('all');

  if (!isOpen) return null;

  const filteredActions = actions.filter(action => 
    actionFilter === 'all' || action.type === actionFilter
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#040707]/95 rounded-lg w-full max-w-4xl p-6 m-4 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#72f68e]/20 flex items-center justify-center">
              <Brain className="h-6 w-6 text-[#72f68e]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{eve.name}</h2>
              <p className="text-sm text-[#72f68e]">{eve.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Metrics */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Efficiency</span>
                  <span className="text-[#72f68e]">{eve.performance.efficiency}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#72f68e] rounded-full"
                    style={{ width: `${eve.performance.efficiency}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-[#72f68e]">{eve.performance.accuracy}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#72f68e] rounded-full"
                    style={{ width: `${eve.performance.accuracy}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Capabilities</h3>
            <div className="flex flex-wrap gap-2">
              {eve.capabilities.map((capability, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-[#72f68e]/10 text-[#72f68e]"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Log */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Action Log</h3>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value as EVEAction['type'] | 'all')}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
              >
                <option value="all">All Actions</option>
                <option value="task">Tasks</option>
                <option value="communication">Communications</option>
                <option value="decision">Decisions</option>
              </select>
            </div>
          </div>
          <EVEActionLog actions={filteredActions} />
        </div>
      </div>
    </div>
  );
}