import React, { useState } from 'react';
import { X, Plus, Brain } from 'lucide-react';
import { EVE } from '../../../types/eve';
import { useEVEStore } from '../../../store/eveStore';

interface EVECreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EVECreationModal({ isOpen, onClose }: EVECreationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    type: 'specialist' as EVE['type'],
    capabilities: [] as string[],
    models: [] as EVE['models']
  });

  const createEVE = useEVEStore(state => state.createEVE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEVE({
        ...formData,
        status: 'idle',
        performance: {
          efficiency: 0,
          accuracy: 0,
          tasks_completed: 0
        }
      });
      onClose();
    } catch (error) {
      console.error('Error creating EVE:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#040707]/95 rounded-lg w-full max-w-2xl p-6 m-4 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-[#72f68e]" />
            <h2 className="text-xl font-semibold text-white">Create New EVE™</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
              placeholder="EVE name"
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
              placeholder="EVE role"
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
              Capabilities
            </label>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Add capability and press Enter"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    if (input.value.trim()) {
                      setFormData({
                        ...formData,
                        capabilities: [...formData.capabilities, input.value.trim()]
                      });
                      input.value = '';
                    }
                  }
                }}
              />
              {formData.capabilities.map((cap, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#72f68e]/10 text-[#72f68e]"
                >
                  {cap}
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      capabilities: formData.capabilities.filter((_, i) => i !== index)
                    })}
                    className="ml-2 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create EVE™
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}