import React, { useState } from 'react';
import CompanyNeedsAnalysis from '../analysis/CompanyNeedsAnalysis';
import EVERecommendations from './EVERecommendations';
import EVECreationSuccess from './EVECreationSuccess';
import { EVE } from '../../../types/eve';

type Step = 'analysis' | 'recommendations' | 'success';

export default function EVECreationFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('analysis');
  const [recommendations, setRecommendations] = useState<Partial<EVE>[]>([]);
  const [createdEVEs, setCreatedEVEs] = useState<EVE[]>([]);

  const handleAnalysisComplete = (recommendations: Partial<EVE>[]) => {
    setRecommendations(recommendations);
    setCurrentStep('recommendations');
  };

  const handleRecommendationsComplete = () => {
    // In a real app, we'd fetch the created EVEs here
    // For now, we'll use the recommendations as created EVEs
    setCreatedEVEs(recommendations as EVE[]);
    setCurrentStep('success');
  };

  return (
    <div className="p-8">
      {currentStep === 'analysis' && (
        <CompanyNeedsAnalysis onAnalysisComplete={handleAnalysisComplete} />
      )}

      {currentStep === 'recommendations' && (
        <EVERecommendations
          recommendations={recommendations}
          onComplete={handleRecommendationsComplete}
        />
      )}

      {currentStep === 'success' && (
        <EVECreationSuccess eves={createdEVEs} />
      )}
    </div>
  );
}