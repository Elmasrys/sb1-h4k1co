import React from 'react';
import { Brain, Target, MessageCircle, Shield } from 'lucide-react';
import { useEVEStore } from '../../../store/eveStore';
import { EVE } from '../../../types/eve';

const presetEVEs: Omit<EVE, 'id' | 'status'>[] = [
  {
    name: 'Atlas',
    role: 'Chief EVE™ Orchestrator',
    type: 'orchestrator',
    capabilities: ['EVE™ Creation', 'Resource Optimization', 'Strategic Planning'],
    performance: {
      efficiency: 0,
      accuracy: 0,
      tasks_completed: 0
    },
    models: [
      { provider: 'openai', model: 'gpt-4-turbo', purpose: 'Complex Decision Making' },
      { provider: 'anthropic', model: 'claude-3-opus', purpose: 'Strategic Analysis' }
    ]
  },
  {
    name: 'Nova',
    role: 'Strategic Director',
    type: 'specialist',
    capabilities: ['Strategy Development', 'Goal Setting', 'Performance Tracking'],
    performance: {
      efficiency: 0,
      accuracy: 0,
      tasks_completed: 0
    },
    models: [
      { provider: 'openai', model: 'gpt-4', purpose: 'Strategic Planning' },
      { provider: 'anthropic', model: 'claude-3-sonnet', purpose: 'Market Analysis' }
    ]
  }
];

export default function EVEQuickCreate() {
  const { createEVE, loading } = useEVEStore();

  const handleQuickCreate = async (eve: Omit<EVE, 'id' | 'status'>) => {
    try {
      await createEVE({
        ...eve,
        status: 'idle'
      });
    } catch (err) {
      console.error('Error creating EVE:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {presetEVEs.map((eve, index) => (
        <div
          key={index}
          className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 p-2.5">
              <Brain className="w-full h-full text-[#72f68e]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{eve.name}</h3>
              <p className="text-sm text-[#72f68e]">{eve.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {eve.capabilities.map((cap, capIndex) => (
                <span
                  key={capIndex}
                  className="px-2 py-1 rounded-full text-xs bg-[#72f68e]/10 text-[#72f68e]"
                >
                  {cap}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              {eve.models.map((model, modelIndex) => (
                <div
                  key={modelIndex}
                  className="flex items-center justify-between text-sm bg-white/5 rounded-lg p-2"
                >
                  <span className="text-white">{model.model}</span>
                  <span className="text-gray-400">{model.purpose}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleQuickCreate(eve)}
            disabled={loading}
            className="mt-6 w-full px-4 py-2 bg-[#72f68e]/10 text-[#72f68e] rounded-lg hover:bg-[#72f68e]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Quick Create'}
          </button>
        </div>
      ))}
    </div>
  );
}