import React from 'react';
import { X, CreditCard, ShoppingCart, MessageCircle, Users, Image, Eye, TrendingUp, 
  AlertTriangle, FileText, HelpCircle, Target, Shield, Mail, Video, Calendar, 
  MessageSquare, Share2, Smartphone, Briefcase, Brain } from 'lucide-react';

interface Capability {
  title: string;
  description: string;
  icon: any;
  aiAction: string;
  humanAction: string;
}

interface IntegrationCapabilitiesProps {
  type: string;
  onClose: () => void;
}

const integrationCapabilities: Record<string, Capability[]> = {
  meta: [
    {
      title: 'WhatsApp Business',
      description: 'EVE™-powered customer communication',
      icon: MessageCircle,
      aiAction: 'EVE™ handles customer inquiries and support',
      humanAction: 'Review complex cases and strategy',
    },
    {
      title: 'Instagram Management',
      description: 'Content and engagement automation',
      icon: Image,
      aiAction: 'EVE™ creates and schedules content, responds to comments',
      humanAction: 'Approve content and strategy',
    },
    {
      title: 'Facebook Business',
      description: 'Page and ad management',
      icon: Share2,
      aiAction: 'EVE™ optimizes ad campaigns and engagement',
      humanAction: 'Review ad performance and budgets',
    },
  ],
  stripe: [
    {
      title: 'Company Formation',
      description: 'Automated incorporation process',
      icon: Briefcase,
      aiAction: 'EVE™ handles documentation and filing',
      humanAction: 'Review and sign legal documents',
    },
    {
      title: 'Payment Processing',
      description: 'Transaction management',
      icon: CreditCard,
      aiAction: 'EVE™ processes routine transactions',
      humanAction: 'Approve large transactions',
    },
  ],
};

export default function IntegrationCapabilities({ type, onClose }: IntegrationCapabilitiesProps) {
  const capabilities = integrationCapabilities[type] || [];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#040707]/95 rounded-lg w-full max-w-2xl p-6 m-4 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Integration Capabilities</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="bg-[#040707]/50 rounded-lg p-6 border border-white/10 hover:bg-[#040707]/70 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <capability.icon className="h-5 w-5 text-[#72f68e] mr-2" />
                <h3 className="text-lg font-semibold text-white">{capability.title}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">{capability.description}</p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="bg-[#72f68e]/10 rounded-full p-1 mr-2 mt-1">
                    <Brain className="h-4 w-4 text-[#72f68e]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">EVE™ Action</p>
                    <p className="text-sm text-gray-400">{capability.aiAction}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#72f68e]/10 rounded-full p-1 mr-2 mt-1">
                    <Users className="h-4 w-4 text-[#72f68e]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Human Oversight</p>
                    <p className="text-sm text-gray-400">{capability.humanAction}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}