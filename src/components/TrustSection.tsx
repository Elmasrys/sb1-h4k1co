import React from 'react';
import { Shield, Award, CheckCircle, Users, Brain, Zap, Lock } from 'lucide-react';

export default function TrustSection() {
  return (
    <div className="bg-[#040707] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1000+</div>
            <div className="text-gray-400">Companies Powered by EVEs™</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50M+</div>
            <div className="text-gray-400">Tasks Automated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">99.99%</div>
            <div className="text-gray-400">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">EVE™ Support</div>
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Enterprise-Grade Security & Compliance</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Shield className="h-5 w-5 text-[#72f68e]" />
              <span className="text-gray-300">SOC 2 Type II</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Lock className="h-5 w-5 text-[#72f68e]" />
              <span className="text-gray-300">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Shield className="h-5 w-5 text-[#72f68e]" />
              <span className="text-gray-300">ISO 27001</span>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#72f68e]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 flex items-center justify-center mr-4">
                  <Brain className="h-6 w-6 text-[#72f68e]" />
                </div>
                <div>
                  <div className="text-white font-semibold">John Smith</div>
                  <div className="text-gray-400 text-sm">CEO, TechCorp</div>
                </div>
              </div>
              <p className="text-gray-300">"mavrika's EVEs™ have transformed how we operate. Our virtual workforce handles 90% of routine tasks, letting us focus on strategic growth."</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#72f68e]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 flex items-center justify-center mr-4">
                  <Zap className="h-6 w-6 text-[#72f68e]" />
                </div>
                <div>
                  <div className="text-white font-semibold">Sarah Chen</div>
                  <div className="text-gray-400 text-sm">CTO, InnovateLabs</div>
                </div>
              </div>
              <p className="text-gray-300">"The EVEs™ are incredibly sophisticated. They've automated our entire customer support operation with amazing accuracy and maintain our brand voice perfectly."</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#72f68e]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-[#72f68e]" />
                </div>
                <div>
                  <div className="text-white font-semibold">Michael Roberts</div>
                  <div className="text-gray-400 text-sm">CFO, GlobalTrade</div>
                </div>
              </div>
              <p className="text-gray-300">"From incorporation to daily operations, mavrika has been instrumental in scaling our business across multiple jurisdictions with their EVEs™."</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#72f68e]/20 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-[#72f68e]" />
            </div>
            <h3 className="text-white font-semibold mb-2">Enterprise Security</h3>
            <p className="text-gray-400 text-sm">Bank-grade security protocols and encryption</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#72f68e]/20 flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-[#72f68e]" />
            </div>
            <h3 className="text-white font-semibold mb-2">Advanced EVE™ Tech</h3>
            <p className="text-gray-400 text-sm">State-of-the-art AI models and algorithms</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#72f68e]/20 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-[#72f68e]" />
            </div>
            <h3 className="text-white font-semibold mb-2">Human Oversight</h3>
            <p className="text-gray-400 text-sm">Perfect balance of AI and human expertise</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#72f68e]/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-[#72f68e]" />
            </div>
            <h3 className="text-white font-semibold mb-2">Proven Results</h3>
            <p className="text-gray-400 text-sm">Consistent success across industries</p>
          </div>
        </div>
      </div>
    </div>
  );
}