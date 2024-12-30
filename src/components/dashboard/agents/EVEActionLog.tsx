import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, AlertTriangle, Clock, Brain, MessageCircle, Zap } from 'lucide-react';
import { EVEAction } from '../../../types/eve';

interface EVEActionLogProps {
  actions: EVEAction[];
  className?: string;
}

export default function EVEActionLog({ actions, className = '' }: EVEActionLogProps) {
  const getStatusIcon = (status: EVEAction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-[#72f68e]" />;
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: EVEAction['type']) => {
    switch (type) {
      case 'task':
        return <Brain className="h-5 w-5 text-[#72f68e]" />;
      case 'communication':
        return <MessageCircle className="h-5 w-5 text-[#72f68e]" />;
      case 'decision':
        return <Zap className="h-5 w-5 text-[#72f68e]" />;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {actions.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-400">No actions recorded yet</p>
        </div>
      ) : (
        actions.map((action) => (
          <div
            key={action.id}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">{getTypeIcon(action.type)}</div>
                <div>
                  <p className="text-white">{action.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-400">
                      {format(new Date(action.created_at), 'PPp')}
                    </span>
                    {action.completed_at && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-sm text-gray-400">
                          Completed {format(new Date(action.completed_at), 'PPp')}
                        </span>
                      </>
                    )}
                  </div>
                  {action.metadata && (
                    <div className="mt-2 space-y-1">
                      {Object.entries(action.metadata).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="text-gray-400">{key}:</span>{' '}
                          <span className="text-white">{JSON.stringify(value)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(action.status)}
                <span className={`text-sm ${
                  action.status === 'completed' ? 'text-[#72f68e]' :
                  action.status === 'failed' ? 'text-red-500' :
                  action.status === 'in_progress' ? 'text-yellow-500' :
                  'text-gray-400'
                }`}>
                  {action.status}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}