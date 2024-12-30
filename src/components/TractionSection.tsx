import React from 'react';
import { TrendingUp, Users, Globe2, Award, Zap, Clock } from 'lucide-react';

export default function TractionSection() {
  return (
    <div className="relative bg-[#040707] py-24 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#72f68e] rounded-full blur-[128px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#f4f4f4] rounded-full blur-[128px] opacity-10 animate-pulse delay-300"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#72f68e]/20 mb-4">
              <Users className="h-6 w-6 text-[#72f68e]" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">1,000+</div>
            <div className="text-gray-400">Companies Automated</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#72f68e]/20 mb-4">
              <Globe2 className="h-6 w-6 text-[#72f68e]" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">25+</div>
            <div className="text-gray-400">Countries Served</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#72f68e]/20 mb-4">
              <Zap className="h-6 w-6 text-[#72f68e]" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">50M+</div>
            <div className="text-gray-400">Tasks Automated</div>
          </div>
        </div>

        {/* Featured Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Performance Metrics */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-[#72f68e]/20">
                <TrendingUp className="h-6 w-6 text-[#72f68e]" />
              </div>
              <h3 className="text-xl font-semibold text-white">Performance Impact</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Efficiency Increase</span>
                  <span className="text-[#72f68e]">85%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-[#72f68e] rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Cost Reduction</span>
                  <span className="text-[#72f68e]">65%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-[#72f68e] rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Decision Speed</span>
                  <span className="text-[#72f68e]">92%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-[#72f68e] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Recognition */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-[#72f68e]/20">
                <Award className="h-6 w-6 text-[#72f68e]" />
              </div>
              <h3 className="text-xl font-semibold text-white">Industry Recognition</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-[#72f68e]" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Fastest Growing AI Platform</h4>
                  <p className="text-gray-400 text-sm mt-1">Recognized by TechCrunch in 2023</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-[#72f68e]" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Best AI Innovation</h4>
                  <p className="text-gray-400 text-sm mt-1">AI Excellence Awards 2023</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-[#72f68e]" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Top AI Employer</h4>
                  <p className="text-gray-400 text-sm mt-1">Forbes AI Companies 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}