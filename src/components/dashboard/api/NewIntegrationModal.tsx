import React, { useState } from 'react';
import { X, Loader2, MessageSquare, CreditCard, ShoppingCart, Mail, Users, Image, Brain } from 'lucide-react';

interface NewIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIntegrate: (integration: string) => void;
}

const availableIntegrations = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing and financial operations',
    capabilities: [
      { icon: CreditCard, text: 'Process payments and refunds with EVE™ automation' },
      { icon: ShoppingCart, text: 'Manage subscriptions and invoices' },
      { icon: MessageSquare, text: 'Handle payment disputes with EVE™ assistance' },
    ],
  },
  {
    id: 'meta',
    name: 'Meta Business',
    description: 'Social media and messaging management',
    capabilities: [
      { icon: MessageSquare, text: 'EVE™-powered responses to comments and DMs' },
      { icon: Users, text: 'Automated community engagement' },
      { icon: Image, text: 'EVE™-optimized content scheduling' },
    ],
  },
] as const;

export default function NewIntegrationModal({ isOpen, onClose, onIntegrate }: NewIntegrationModalProps) {
  const [processing, setProcessing] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleIntegration = async (integrationId: string) => {
    setProcessing(integrationId);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onIntegrate(integrationId);
    setProcessing(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#040707]/95 rounded-lg w-full max-w-2xl p-6 m-4 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Add New Integration</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {availableIntegrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-[#040707]/50 rounded-lg p-6 border border-white/10 hover:bg-[#040707]/70 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{integration.description}</p>
                </div>
                <button
                  onClick={() => handleIntegration(integration.id)}
                  disabled={!!processing}
                  className="px-4 py-2 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing === integration.id ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Connecting...
                    </div>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {integration.capabilities.map((capability, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-gray-300"
                  >
                    <capability.icon className="h-4 w-4 text-[#72f68e]" />
                    <span>{capability.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}