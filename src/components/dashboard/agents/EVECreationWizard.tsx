import React, { useState } from 'react';
import { Brain, Rocket, Shield, MessageCircle, Code, Target, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { EVE } from '../../../types/eve';
import { useEVEStore } from '../../../store/eveStore';

interface EVECreationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (eve: EVE) => void;
}

type Step = 'purpose' | 'capabilities' | 'models' | 'review';

const modelOptions = [
  { provider: 'openai', model: 'gpt-4-turbo', purpose: 'Complex Decision Making' },
  { provider: 'openai', model: 'gpt-4', purpose: 'Strategic Planning' },
  { provider: 'anthropic', model: 'claude-3-opus', purpose: 'Advanced Reasoning' },
  { provider: 'anthropic', model: 'claude-3-sonnet', purpose: 'Content Generation' }
] as const;

export default function EVECreationWizard({ isOpen, onClose, onComplete }: EVECreationWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>('purpose');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    type: 'specialist' as EVE['type'],
    capabilities: [] as string[],
    models: [] as EVE['models']
  });

  const createEVE = useEVEStore(state => state.createEVE);

  const steps: { id: Step; label: string }[] = [
    { id: 'purpose', label: 'Purpose & Role' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'models', label: 'AI Models' },
    { id: 'review', label: 'Review' }
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleSubmit = async () => {
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
      onComplete(formData as EVE);
      onClose();
    } catch (error) {
      console.error('Error creating EVE:', error);
    }
  };

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 'purpose':
        return (
          <div className="space-y-6">
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
          </div>
        );

      case 'capabilities':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Core Capabilities
              </label>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Add capability and press Enter"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
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
                <div className="flex flex-wrap gap-2">
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
            </div>
          </div>
        );

      case 'models':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                AI Models
              </label>
              <div className="space-y-4">
                {modelOptions.map((model) => (
                  <label
                    key={`${model.provider}-${model.model}`}
                    className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.models.some(m => 
                        m.provider === model.provider && m.model === model.model
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            models: [...formData.models, model]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            models: formData.models.filter(m => 
                              !(m.provider === model.provider && m.model === model.model)
                            )
                          });
                        }
                      }}
                      className="rounded border-white/10 text-[#72f68e] focus:ring-[#72f68e]"
                    />
                    <div>
                      <div className="text-white font-medium">{model.model}</div>
                      <div className="text-sm text-gray-400">{model.purpose}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">EVE™ Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Name</div>
                  <div className="text-white">{formData.name}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Role</div>
                  <div className="text-white">{formData.role}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Type</div>
                  <div className="text-white capitalize">{formData.type}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Capabilities</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.capabilities.map((cap, index) => (
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
                  <div className="text-sm text-gray-400">AI Models</div>
                  <div className="space-y-2 mt-2">
                    {formData.models.map((model, index) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-lg p-3"
                      >
                        <div className="text-white font-medium">{model.model}</div>
                        <div className="text-sm text-gray-400">{model.purpose}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#040707]/95 rounded-lg w-full max-w-2xl p-6 m-4 border border-white/10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white">Create New EVE™</h2>
          <div className="flex items-center mt-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center ${
                    currentStep === step.id
                      ? 'text-[#72f68e]'
                      : steps.findIndex(s => s.id === currentStep) > index
                      ? 'text-gray-400'
                      : 'text-gray-600'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step.id
                      ? 'bg-[#72f68e]/20 text-[#72f68e]'
                      : steps.findIndex(s => s.id === currentStep) > index
                      ? 'bg-white/10 text-gray-400'
                      : 'bg-white/5 text-gray-600'
                  }`}>
                    {steps.findIndex(s => s.id === currentStep) > index ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="ml-2 text-sm hidden sm:block">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 h-px bg-white/10 mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 'purpose'}
            className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          
          {currentStep === 'review' ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors flex items-center"
            >
              Create EVE™
              <Check className="h-5 w-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors flex items-center"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}