import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EVE } from '../../../types/eve';

interface EVECreationSuccessProps {
  eves: EVE[];
}

export default function EVECreationSuccess({ eves }: EVECreationSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-16 h-16 rounded-full bg-[#72f68e]/20 flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-[#72f68e]" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">EVEs™ Created Successfully</h2>
        <p className="text-gray-400">
          Your EVE™ workforce is now ready to begin operations
        </p>
      </div>

      <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Created EVEs™</h3>
        <div className="space-y-4">
          {eves.map((eve) => (
            <div
              key={eve.id}
              className="flex items-center justify-between bg-white/5 rounded-lg p-4"
            >
              <div>
                <h4 className="text-white font-medium">{eve.name}</h4>
                <p className="text-sm text-[#72f68e]">{eve.role}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  eve.status === 'active'
                    ? 'bg-[#72f68e]/10 text-[#72f68e]'
                    : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {eve.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Link
          to="/dashboard/agents"
          className="px-6 py-3 bg-[#72f68e] text-[#040707] rounded-lg hover:bg-[#72f68e]/90 transition-colors flex items-center"
        >
          View EVE™ Dashboard
          <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
      </div>
    </div>
  );
}