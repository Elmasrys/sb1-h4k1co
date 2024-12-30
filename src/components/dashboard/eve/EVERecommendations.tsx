import React, { useState } from 'react';
import { Brain, Shield, MessageCircle, Code, Target, Check, AlertTriangle, ChevronRight } from 'lucide-react';
import { EVE } from '../../../types/eve';
import { useEVEStore } from '../../../store/eveStore';

interface EVERecommendationsProps {
  recommendations: Partial<EVE>[];
  onComplete: () => void;
}

export default function EVERecommendations({ recommendations, onComplete }: EVERecommendationsProps) {
  const [selectedEVEs, setSelectedEVEs] = useState<Set<number>>(new Set());
  const [customizations, setCustomizations] = useState<Record<number, Partial<EVE>>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEVE = useEVEStore(state => state.createEVE);

  const handleToggleEVE = (index: number) => {
    const newSelected = new Set(selectedEVEs);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedEVEs(newSelected);
  };

  const handleCustomize = (index: number, updates: Partial<EVE>) => {
    setCustomizations(prev => ({
      ...prev,
      [index]: { ...prev[index], ...updates }
    }));
  };

  const handleDeploy = async () => {
    setLoading(true);
    setError(null);

    try {
      const selectedRecommendations = Array.from(selectedEVEs).map(index => ({
        ...recommendations[index],
        ...customizations[index]
      }));

      // Create EVEs in the correct order (orchestrator first)
      const orchestrator = selectedRecommendations.find(eve => eve.type === 'orchestrator');
      const others = selectedRecommendations.filter(eve => eve.type !== 'orchestrator');

      if (orchestrator) {
        await createEVE(orchestrator);
      }

      for (const eve of others) {
        await createEVE(eve);
      }

      onComplete();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Recommended EVEs™</h2>
        <p className="text-gray-400 mt-1">
          Based on your company profile, Atlas recommends the following EVE™ configuration
        </p>
      </div>

      <div className="space-y-6">
        {recommendations.map((eve, index) => (
          <div
            key={index}
            className={`bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border transition-colors ${
              selectedEVEs.has(index)
                ? 'border-[#72f68e]'
                : 'border-white/10'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-[#72f68e]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{eve.name}</h3>
                  <p className="text-[#72f68e] text-sm">{eve.role}</p>
                  
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-200">Capabilities</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {eve.capabilities?.map((capability, capIndex) => (
                          <span
                            key={capIndex}
                            className="px-2 py-1 rounded-full text-sm bg-[#72f68e]/10 text-[#72f68e]"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>

                    {eve.models && (
                      <div>
                        <label className="text-sm font-medium text-gray-200">AI Models</label>
                        <div className="space-y-2 mt-2">
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
                    )}
                  </div>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedEVEs.has(index)}
                  onChange={() => handleToggleEVE(index)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#72f68e]"></div>
              </label>
            </div>

            {selectedEVEs.has(index) && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-sm font-medium text-gray-200 mb-4">Customization Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      value={customizations[index]?.name || eve.name}
                      onChange={(e) => handleCustomize(index, { name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Role</label>
                    <input
                      type="text"
                      value={customizations[index]?.role || eve.role}
                      onChange={(e) => handleCustomize(index, { role: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-6 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleDeploy}
          disabled={loading || selectedEVEs.size === 0}
          className="px-6 py-3 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {loading ? (
            <>
              <div className="h-5 w-5 border-2 border-[#040707]/20 border-t-[#040707] rounded-full animate-spin mr-2" />
              Creating EVEs™...
            </>
          ) : (
            <>
              Deploy Selected EVEs™
              <ChevronRight className="h-5 w-5 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}