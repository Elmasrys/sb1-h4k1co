import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  message,
  onClose
}) => {
  const styles = {
    success: {
      bg: 'bg-[#72f68e]/10',
      border: 'border-[#72f68e]',
      text: 'text-[#72f68e]',
      icon: CheckCircle
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500',
      text: 'text-red-500',
      icon: AlertTriangle
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500',
      text: 'text-blue-500',
      icon: Info
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500',
      text: 'text-yellow-500',
      icon: AlertTriangle
    }
  };

  const { bg, border, text, icon: Icon } = styles[type];

  return (
    <div className={`${bg} ${border} ${text} border px-4 py-3 rounded-lg flex items-center justify-between`}>
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-2" />
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="hover:opacity-75 transition-opacity"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};