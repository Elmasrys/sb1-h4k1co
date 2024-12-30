import React from 'react';
import { Check, AlertTriangle, Clock, Brain } from 'lucide-react';

interface APIServiceCardProps {
  service: {
    id: number;
    name: string;
    description: string;
    status: 'connected' | 'error' | 'pending';
    lastSync: string;
    color: string;
    type: string;
  };
  onClick?: () => void;
}

export default function APIServiceCard({ service, onClick }: APIServiceCardProps) {
  const getStatusIcon = () => {
    switch (service.status) {
      case 'connected':
        return <Check className="h-5 w-5 text-[#72f68e]" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = () => {
    switch (service.status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Connection Error';
      case 'pending':
        return 'Setup Pending';
    }
  };

  const getInitial = () => {
    return service.name.charAt(0);
  };

  return (
    <div
      onClick={onClick}
      className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-[#040707]/40 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div 
          className="h-12 w-12 rounded-lg bg-[#72f68e]/20 flex items-center justify-center text-xl font-bold text-[#72f68e]"
        >
          {getInitial()}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {getStatusIcon()}
            <span className="ml-2 text-sm text-gray-300">{getStatusText()}</span>
          </div>
          <span className="text-xs text-gray-400">Last sync: {service.lastSync}</span>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 bg-[#72f68e]/10 text-[#72f68e] hover:bg-[#72f68e]/20 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            Configure
          </button>
          <button className="flex-1 bg-white/5 text-white hover:bg-white/10 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            View Logs
          </button>
        </div>
      </div>
    </div>
  );
}