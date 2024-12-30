import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Brain, Target, Clock } from 'lucide-react';

interface Props {
  timeRange: string;
}

const data = [
  { name: 'Mon', efficiency: 92, accuracy: 95, completion: 88 },
  { name: 'Tue', efficiency: 95, accuracy: 93, completion: 90 },
  { name: 'Wed', efficiency: 94, accuracy: 96, completion: 92 },
  { name: 'Thu', efficiency: 96, accuracy: 94, completion: 95 },
  { name: 'Fri', efficiency: 98, accuracy: 97, completion: 94 },
  { name: 'Sat', efficiency: 97, accuracy: 95, completion: 93 },
  { name: 'Sun', efficiency: 99, accuracy: 98, completion: 96 },
];

export default function PerformanceMetrics({ timeRange }: Props) {
  return (
    <div className="bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">EVE™ Performance</h2>
          <p className="text-sm text-gray-400 mt-1">Real-time performance analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#72f68e]" />
            <span className="text-sm text-gray-400">Efficiency</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#f4f4f4]" />
            <span className="text-sm text-gray-400">Accuracy</span>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
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
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#f4f4f4"
              strokeWidth={2}
              dot={{ fill: '#f4f4f4' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Brain className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">+2.3%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">98.7%</div>
          <div className="text-sm text-gray-400">EVE™ Efficiency</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">+1.8%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">96.5%</div>
          <div className="text-sm text-gray-400">Task Accuracy</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">-15%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">1.2s</div>
          <div className="text-sm text-gray-400">Response Time</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-5 w-5 text-[#72f68e]" />
            <span className="text-[#72f68e]">+4.2%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">94.8%</div>
          <div className="text-sm text-gray-400">Goal Completion</div>
        </div>
      </div>
    </div>
  );
}