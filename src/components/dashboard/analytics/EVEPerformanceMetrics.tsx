import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Zap, Target, Clock } from 'lucide-react';
import { EVE } from '../../../types/eve';

interface Props {
  eve: EVE;
  timeRange: '24h' | '7d' | '30d' | 'all';
}

// In a real app, this would come from an API
const generateMockData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    efficiency: 85 + Math.random() * 10,
    accuracy: 90 + Math.random() * 8,
    tasks: Math.floor(10 + Math.random() * 20),
    responseTime: 0.8 + Math.random() * 0.4
  }));
};

export default function EVEPerformanceMetrics({ eve, timeRange }: Props) {
  const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const data = generateMockData(days);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Brain className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">+2.3%</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {eve.performance.efficiency}%
          </div>
          <div className="text-sm text-gray-400">Efficiency</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">+1.8%</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {eve.performance.accuracy}%
          </div>
          <div className="text-sm text-gray-400">Accuracy</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Zap className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">+12%</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {eve.performance.tasks_completed}
          </div>
          <div className="text-sm text-gray-400">Tasks Completed</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">-15%</span>
          </div>
          <div className="text-2xl font-bold text-white">1.2s</div>
          <div className="text-sm text-gray-400">Avg Response Time</div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white/5 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-6">Performance Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
              <XAxis 
                dataKey="date" 
                stroke="#666"
                tick={{ fill: '#666' }}
              />
              <YAxis 
                stroke="#666"
                tick={{ fill: '#666' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#040707',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#72f68e"
                strokeWidth={2}
                dot={{ fill: '#72f68e' }}
                name="Efficiency"
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#f4f4f4"
                strokeWidth={2}
                dot={{ fill: '#f4f4f4' }}
                name="Accuracy"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Task Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Task Distribution</h3>
          <div className="space-y-4">
            {eve.capabilities.map((capability, index) => {
              const percentage = Math.floor(30 + Math.random() * 40);
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{capability}</span>
                    <span className="text-[#72f68e]">{percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#72f68e] rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Model Usage</h3>
          <div className="space-y-4">
            {eve.models.map((model, index) => {
              const percentage = Math.floor(40 + Math.random() * 30);
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{model.model}</span>
                    <span className="text-[#72f68e]">{percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#72f68e] rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{model.purpose}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}