import React from 'react';
import { Check, Building2, Key, Brain } from 'lucide-react';

interface SetupProgressProps {
  currentStep: 'company' | 'api' | 'eves' | 'complete';
}

export default function SetupProgress({ currentStep }: SetupProgressProps) {
  const steps = [
    { id: 'company', label: 'Company Setup', icon: Building2 },
    { id: 'api', label: 'API Configuration', icon: Key },
    { id: 'eves', label: 'EVE™ Creation', icon: Brain },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isComplete = steps.findIndex(s => s.id === currentStep) > index;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${isComplete ? 'bg-[#72f68e] text-[#040707]' :
                  isCurrent ? 'bg-[#72f68e]/20 text-[#72f68e]' :
                  'bg-white/5 text-gray-400'}
              `}>
                {isComplete ? <Check className="h-6 w-6" /> : <StepIcon className="h-6 w-6" />}
              </div>
              <span className={`
                mt-2 text-sm
                ${isCurrent ? 'text-[#72f68e]' :
                  isComplete ? 'text-white' : 'text-gray-400'}
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}