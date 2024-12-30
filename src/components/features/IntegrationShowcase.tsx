import React from 'react';
import { Network, Lock, Zap, Globe2, MessageCircle, Database } from 'lucide-react';

export default function IntegrationShowcase() {
  return (
    <div className="bg-[#040707] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Seamless Integrations
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect your EVEs™ with your existing tools and platforms for maximum efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Communication */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#72f68e]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 p-3 mb-4">
                <MessageCircle className="h-full w-full text-[#72f68e]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Communication</h3>
              <p className="text-gray-400 mb-4">
                Integrate with email, messaging, and social media platforms for seamless communication.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">Email</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">WhatsApp</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">Slack</span>
              </div>
            </div>
          </div>

          {/* Data & Analytics */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#72f68e]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 p-3 mb-4">
                <Database className="h-full w-full text-[#72f68e]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Data & Analytics</h3>
              <p className="text-gray-400 mb-4">
                Connect with your data sources and analytics tools for intelligent insights.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">BigQuery</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">Snowflake</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">Tableau</span>
              </div>
            </div>
          </div>

          {/* Business Tools */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#72f68e]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 p-3 mb-4">
                <Zap className="h-full w-full text-[#72f68e]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Business Tools</h3>
              <p className="text-gray-400 mb-4">
                Integrate with your favorite business and productivity tools.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">Google Workspace</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">Microsoft 365</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">Notion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Platform */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Universal Integration Platform
              </h3>
              <p className="text-gray-400 mb-6">
                Our EVEs™ seamlessly integrate with your existing tools and workflows, ensuring smooth operations across your entire tech stack.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#72f68e]/20 p-2">
                    <Network className="h-full w-full text-[#72f68e]" />
                  </div>
                  <span className="text-white">API-first architecture</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#72f68e]/20 p-2">
                    <Lock className="h-full w-full text-[#72f68e]" />
                  </div>
                  <span className="text-white">Secure data handling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#72f68e]/20 p-2">
                    <Globe2 className="h-full w-full text-[#72f68e]" />
                  </div>
                  <span className="text-white">Global availability</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#72f68e]/20 via-transparent to-transparent rounded-xl blur-3xl"></div>
              <div className="relative bg-white/5 rounded-xl p-6 border border-white/10">
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{`{
  "integration": {
    "type": "api",
    "status": "connected",
    "capabilities": [
      "realtime_sync",
      "bidirectional",
      "secure"
    ],
    "uptime": "99.99%"
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}