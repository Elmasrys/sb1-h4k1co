import React, { useState } from 'react';
import { useEVEStore } from '../../../store/eveStore';
import EVEPerformanceMetrics from './EVEPerformanceMetrics';
import { Brain, ChevronDown } from 'lucide-react';

type TimeRange = '24h' | '7d' | '30d' | 'all';

export default function EVEAnalyticsDashboard() {
  const [selectedEVE, setSelectedEVE] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  const { eves } = useEVEStore();
  const selectedEVEData = eves.find(eve => eve.id === selectedEVE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">EVE™ Analytics</h1>
          <p className="mt-1 text-sm text-gray-400">
            Monitor and optimize your EVE™ workforce performance
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* EVE Selector */}
          <select
            value={selectedEVE || ''}
            onChange={(e) => setSelectedEVE(e.target.value || null)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#72f68e]"
          >
            <option value="">All EVEs</option>
            {eves.map(eve => (
              <option key={eve.id} value={eve.id}>{eve.name}</option>
            ))}
          </select>

          {/* Time Range Selector */}
          <div className="relative">
            <button
              onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
              className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
            >
              <span className="text-white">{timeRange}</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {isTimeDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 w-32 bg-[#040707] border border-white/10 rounded-lg shadow-lg py-1 z-10">
                {(['24h', '7d', '30d', 'all'] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setTimeRange(range);
                      setIsTimeDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-white hover:bg-white/5 transition-colors"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedEVEData ? (
        <EVEPerformanceMetrics eve={selectedEVEData} timeRange={timeRange} />
      ) : (
        <div className="text-center py-12">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Select an EVE™</h3>
          <p className="text-gray-400">
            Choose an EVE™ from the dropdown to view detailed analytics
          </p>
        </div>
      )}
    </div>
  );
}