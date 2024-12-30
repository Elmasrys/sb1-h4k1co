import React, { useState } from 'react';
import { Calendar, ChevronDown, Download, Filter, Brain, Zap, Target, AlertTriangle } from 'lucide-react';
import PerformanceMetrics from './PerformanceMetrics';
import ResourceUtilization from './ResourceUtilization';
import OperationalInsights from './OperationalInsights';
import CostSavings from './CostSavings';
import ComplianceOverview from './ComplianceOverview';

const timeRanges = ['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'Last Quarter', 'Year to Date'];

export default function ReportsView() {
  const [selectedRange, setSelectedRange] = useState('Last 30 Days');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
            <p className="text-gray-400 mt-1">Comprehensive insights into your EVE™-powered operations</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              >
                <Calendar className="h-4 w-4 text-[#72f68e]" />
                <span className="text-white">{selectedRange}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {isTimeDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-[#040707] border border-white/10 rounded-lg shadow-lg py-1 z-10">
                  {timeRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setSelectedRange(range);
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

            <button className="flex items-center space-x-2 bg-[#72f68e] hover:bg-[#72f68e]/90 text-[#040707] px-4 py-2 rounded-lg transition-colors">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Brain className="h-5 w-5 text-[#72f68e]" />
              <span className="text-green-500">+12%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">35</div>
            <div className="text-sm text-gray-400">Active EVEs™</div>
          </div>

          <div className="bg-white/5 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="h-5 w-5 text-[#72f68e]" />
              <span className="text-green-500">+45%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">98.7%</div>
            <div className="text-sm text-gray-400">EVE™ Efficiency</div>
          </div>

          <div className="bg-white/5 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-5 w-5 text-[#72f68e]" />
              <span className="text-green-500">+28%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">$1.2M</div>
            <div className="text-sm text-gray-400">Cost Savings</div>
          </div>

          <div className="bg-white/5 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-5 w-5 text-[#72f68e]" />
              <span className="text-green-500">-5%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">0.01%</div>
            <div className="text-sm text-gray-400">Error Rate</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Performance Metrics */}
          <PerformanceMetrics timeRange={selectedRange} />

          {/* Resource Utilization */}
          <ResourceUtilization timeRange={selectedRange} />

          {/* Operational Insights */}
          <OperationalInsights timeRange={selectedRange} />

          {/* Cost Analysis */}
          <CostSavings timeRange={selectedRange} />

          {/* Compliance & Security */}
          <ComplianceOverview timeRange={selectedRange} />
        </div>
      </div>
    </div>
  );
}