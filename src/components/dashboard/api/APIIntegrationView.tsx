import React, { useState } from 'react';
import { Network, Plus, Brain } from 'lucide-react';
import APIServiceCard from './APIServiceCard';
import NewIntegrationModal from './NewIntegrationModal';
import IntegrationCapabilities from './IntegrationCapabilities';

const integrations = [
  {
    id: 1,
    name: 'Meta Business Suite',
    description: 'Facebook, Instagram, WhatsApp Business',
    status: 'connected',
    lastSync: '2 minutes ago',
    color: '#72f68e',
    type: 'meta',
    platforms: ['Facebook', 'Instagram', 'WhatsApp']
  },
  {
    id: 2,
    name: 'Stripe Atlas',
    description: 'Company formation and payments',
    status: 'connected',
    lastSync: 'Just now',
    color: '#72f68e',
    type: 'stripe',
  },
  {
    id: 3,
    name: 'TikTok Business',
    description: 'TikTok content and ads management',
    status: 'connected',
    lastSync: '5 minutes ago',
    color: '#72f68e',
    type: 'tiktok',
  },
  {
    id: 4,
    name: 'YouTube Studio',
    description: 'YouTube channel and content management',
    status: 'connected',
    lastSync: '10 minutes ago',
    color: '#72f68e',
    type: 'youtube',
  },
  {
    id: 5,
    name: 'Microsoft 365',
    description: 'Email, calendar, and collaboration',
    status: 'connected',
    lastSync: '15 minutes ago',
    color: '#72f68e',
    type: 'microsoft365',
  },
  {
    id: 6,
    name: 'Google Workspace',
    description: 'Gmail, Meet, and workspace tools',
    status: 'connected',
    lastSync: '3 minutes ago',
    color: '#72f68e',
    type: 'google',
  },
  {
    id: 7,
    name: 'OpenAI',
    description: 'Advanced language models and capabilities',
    status: 'connected',
    lastSync: '1 minute ago',
    color: '#72f68e',
    type: 'openai',
    models: ['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo'],
    specialties: ['Natural Language Processing', 'Content Generation', 'Code Analysis']
  },
  {
    id: 8,
    name: 'Anthropic',
    description: 'Advanced reasoning and analysis models',
    status: 'connected',
    lastSync: '1 minute ago',
    color: '#72f68e',
    type: 'anthropic',
    models: ['claude-3-opus', 'claude-3-sonnet', 'claude-2.1'],
    specialties: ['Complex Reasoning', 'Strategic Analysis', 'Research']
  },
  {
    id: 9,
    name: 'Mention',
    description: 'Social listening & monitoring',
    status: 'connected',
    lastSync: '5 minutes ago',
    color: '#72f68e',
    type: 'mention',
  }
] as const;

export default function APIIntegrationView() {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">API Integrations</h1>
          <p className="mt-1 text-sm text-gray-400">
            Connect your services and models
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Integration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <APIServiceCard
            key={integration.id}
            service={integration}
            onClick={() => setSelectedIntegration(integration.type)}
          />
        ))}
      </div>

      {selectedIntegration && (
        <IntegrationCapabilities
          type={selectedIntegration}
          onClose={() => setSelectedIntegration(null)}
        />
      )}

      <NewIntegrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onIntegrate={(type) => {
          console.log('Integrating:', type);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}