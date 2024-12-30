import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyCreationForm from '../company/CompanyCreationForm';
import SubscriptionSetup from './SubscriptionSetup';
import { APISettings } from '../dashboard/settings/APISettings';
import { EVECreationWizard } from '../dashboard/eve/EVECreationWizard';
import SetupProgress from './SetupProgress';

type Step = 'company' | 'subscription' | 'api' | 'eves' | 'complete';

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState<Step>('company');
  const navigate = useNavigate();

  const handleCompanyCreated = () => {
    setCurrentStep('subscription');
  };

  const handleSubscriptionCreated = () => {
    setCurrentStep('api');
  };

  const handleAPIConfigured = () => {
    setCurrentStep('eves');
  };

  const handleEVEsCreated = () => {
    setCurrentStep('complete');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#040707] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <SetupProgress currentStep={currentStep} />
        
        {currentStep === 'company' && (
          <CompanyCreationForm onComplete={handleCompanyCreated} />
        )}
        
        {currentStep === 'subscription' && (
          <SubscriptionSetup onComplete={handleSubscriptionCreated} />
        )}
        
        {currentStep === 'api' && (
          <APISettings onComplete={handleAPIConfigured} />
        )}
        
        {currentStep === 'eves' && (
          <EVECreationWizard onComplete={handleEVEsCreated} />
        )}
      </div>
    </div>
  );
}