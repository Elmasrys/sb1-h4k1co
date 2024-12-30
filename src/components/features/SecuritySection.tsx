import React from 'react';
import { Shield, Lock, FileCheck, UserCheck, Server, Key } from 'lucide-react';

export default function SecuritySection() {
  return (
    <div className="bg-[#040707] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Enterprise-Grade Security
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your data is protected with state-of-the-art security measures and compliance standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Compliance */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 p-3 mb-4">
              <Shield className="h-full w-full text-[#72f68e]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Compliance</h3>
            <p className="text-gray-400 mb-4">
              Meet global compliance requirements with our certified security standards.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FileCheck className="h-4 w-4 text-[#72f68e]" />
                <span className="text-gray-300">SOC 2 Type II</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileCheck className="h-4 w-4 text-[#72f68e]" />
                <span className="text-gray-300">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileCheck className="h-4 w-4 text-[#72f68e]" />
                <span className="text-gray-300">ISO 27001</span>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 p-3 mb-4">
              <Lock className="h-full w-full text-[#72f68e]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Data Protection</h3>
            <p className="text-gray-400 mb-4">
              Your data is encrypted at rest and in transit with military-grade encryption.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4 text-[#72f68e]" />
                <span className="text-gray-300">AES-256 Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Server className="h-4 w-4 text-[#72f68e]" />
                <span className="text-gray-300">Secure Data Centers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-[#72f68e]" />
                <span className="text-gray-300">Regular Security Audits</span>
              </div>
            </div>
          </div>

          {/* Access Control */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 p-3 mb-4">
              <UserCheck className="h-full w-full text-[#72f68e]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Access Control</h3>
            <p className="text-gray-400 mb-4">
              Granular access controls and authentication for your team.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-[#72f68e]" />
                <span className="text-gray-300">SSO Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-[#72f68e]" />
                <span className="text-gray-300">2FA Authentication</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4 text-[#72f68e]" />
                <span className="text-gray-300">Role-Based Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Dashboard Preview */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Real-time Security Monitoring
              </h3>
              <p className="text-gray-400 mb-6">
                Monitor your security status and compliance in real-time through our comprehensive security dashboard.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#72f68e]/20 p-2">
                    <Shield className="h-full w-full text-[#72f68e]" />
                  </div>
                  <span className="text-white">24/7 Security Monitoring</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#72f68e]/20 p-2">
                    <Lock className="h-full w-full text-[#72f68e]" />
                  </div>
                  <span className="text-white">Automated Threat Detection</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#72f68e]/20 p-2">
                    <FileCheck className="h-full w-full text-[#72f68e]" />
                  </div>
                  <span className="text-white">Compliance Reporting</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#72f68e]/20 via-transparent to-transparent rounded-xl blur-3xl"></div>
              <div className="relative bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Security Score</span>
                    <span className="text-[#72f68e] font-semibold">98/100</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[98%] bg-[#72f68e] rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Active Threats</div>
                      <div className="text-xl text-white font-semibold">0</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Compliance</div>
                      <div className="text-xl text-white font-semibold">100%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}