import React from 'react';
import { Lightbulb, ArrowRight, Brain } from 'lucide-react';

const suggestions = [
  {
    id: 1,
    title: 'Automate Customer Support Triage',
    description: 'Implement EVE™-powered ticket categorization to reduce response time by 40%',
    impact: 'Efficiency increase in customer support',
    department: 'Support',
  },
  {
    id: 2,
    title: 'Optimize Meeting Schedules',
    description: 'Use EVE™ to analyze meeting patterns and suggest optimal time slots',
    impact: 'Save 5 hours per week per team',
    department: 'Operations',
  },
  {
    id: 3,
    title: 'Enhanced Data Analysis',
    description: 'Deploy EVE™ models for predictive analytics',
    impact: 'Improve decision accuracy by 25%',
    department: 'Analytics',
  },
] as const;

export default function OptimizationSuggestions() {
  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="flex items-center mb-6">
        <Brain className="h-5 w-5 text-[#72f68e] mr-2" />
        <h2 className="text-lg font-semibold text-white">Optimization Suggestions</h2>
      </div>
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
          >
            <h3 className="text-white font-medium mb-2">{suggestion.title}</h3>
            <p className="text-sm text-gray-400 mb-3">{suggestion.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#72f68e]">{suggestion.impact}</span>
              <button className="flex items-center text-[#72f68e] hover:text-[#72f68e]/80 transition-colors">
                Implement
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}