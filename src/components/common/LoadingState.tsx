import React from 'react';
import { Brain } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message = 'Loading...', fullScreen = false }: LoadingStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#72f68e] blur-xl opacity-20 animate-pulse"></div>
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#72f68e]/20 border-t-[#72f68e] animate-spin"></div>
          <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-[#72f68e]" />
        </div>
      </div>
      <div className="mt-4 text-[#72f68e] font-medium">{message}</div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#040707] flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}