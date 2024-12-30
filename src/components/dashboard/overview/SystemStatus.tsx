import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Alert {
  type: 'warning' | 'success' | 'info';
  message: string;
  time: string;
}

interface SystemStatusProps {
  alerts: Alert[];
}

export default function SystemStatus({ alerts }: SystemStatusProps) {
  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-500';
      case 'success':
        return 'text-[#72f68e]';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="flex items-center mb-6">
        <AlertCircle className="h-5 w-5 text-[#72f68e] mr-2" />
        <h2 className="text-lg font-semibold text-white">System Status</h2>
      </div>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`h-2 w-2 rounded-full mt-2 ${getAlertColor(alert.type)}`} />
            <div>
              <p className="text-sm text-white">{alert.message}</p>
              <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}