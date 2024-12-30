import React, { useState } from 'react';
import { Brain, Target, MessageCircle, Shield } from 'lucide-react';
import { useEVEStore } from '../../../store/eveStore';
import { EVE } from '../../../types/eve';

const defaultCapabilities = {
  orchestrator: ['EVE™ Creation', 'Resource Optimization', 'Strategic Planning'],
  specialist: ['Task Execution', 'Domain Expertise', 'Performance Tracking'],
  support: ['Assistance', 'Monitoring', 'Reporting']
};

const defaultModels = {
  orchestrator: [
    { provider: 'openai', model: 'gpt-4-turbo', purpose: 'Complex Decision Making' },
    { provider: 'anthropic', model: 'claude-3-opus', purpose: 'Strategic Analysis' }
  ],
  specialist: [
    { provider: 'openai', model: 'gpt-4', purpose: 'Task Execution' },
    { provider: 'anthropic', model: 'claude-3-sonnet', purpose: 'Domain Processing' }
  ],
  support: [
    { provider: 'openai', model: 'gpt-3.5-turbo', purpose: 'Basic Tasks' },
    { provider: 'anthropic', model: 'claude-3-haiku', purpose: 'Support Functions' }
  ]
};

export default function CreateEVEForm() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    type: 'specialist' as EVE['type'],
    capabilities: [] as string[],
    customCapability: ''
  });

  const { createEVE, loading, error } = useEVEStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createEVE({
        name: formData.name,
        role: formData.role,
        type: formData.type,
        status: 'idle',
        capabilities: [...defaultCapabilities[formData.type], ...formData.capabilities],
        models: defaultModels[formData.type],
        performance: {
          efficiency: 0,
          accuracy: 0,
          tasks_completed: 0
        }
      });
    } catch (err) {
      console.error('Error creating EVE:', err);
    }
  };

  const addCapability = () => {
    if (formData.customCapability.trim()) {
      setFormData(prev => ({
        ...prev,
        capabilities: [...prev.capabilities, prev.customCapability.trim()],
        customCapability: ''
      }));
    }
  };

  const removeCapability = (index: number) => {
    setFormData(prev => ({
      ...prev,
      capabilities: prev.capabilities.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-medium text-white mb-6">Create New EVE™</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              EVE™ Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
              placeholder="Enter EVE name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Role
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
              placeholder="Enter EVE role"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as EVE['type'] })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
            >
              <option value="specialist">Specialist</option>
              <option value="support">Support</option>
              <option value="orchestrator">Orchestrator</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Default Capabilities
            </label>
            <div className="flex flex-wrap gap-2">
              {defaultCapabilities[formData.type].map((cap, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-[#72f68e]/10 text-[#72f68e]"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Additional Capabilities
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.customCapability}
                onChange={(e) => setFormData({ ...formData, customCapability: e.target.value })}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                placeholder="Add custom capability"
              />
              <button
                type="button"
                onClick={addCapability}
                className="px-4 py-2 bg-[#72f68e]/10 text-[#72f68e] rounded-lg hover:bg-[#72f68e]/20 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.capabilities.map((cap, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#72f68e]/10 text-[#72f68e]"
                >
                  {cap}
                  <button
                    type="button"
                    onClick={() => removeCapability(index)}
                    className="ml-2 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create EVE™'}
          </button>
        </div>
      </div>
    </form>
  );
}