import React from 'react';
import { Brain, Target, MessageCircle, TrendingUp, Users, ShieldCheck, Briefcase, Rocket } from 'lucide-react';

const presetAgents = [
  {
    id: 1,
    name: 'Atlas',
    role: 'Chief EVE™ Orchestrator',
    icon: Brain,
    color: 'from-[#72f68e] to-[#f4f4f4]',
    description: 'Creates and manages EVEs™ aligned with company values and objectives.',
    capabilities: ['EVE™ Creation', 'Resource Optimization', 'Strategic Alignment']
  },
  {
    id: 2,
    name: 'Nova',
    role: 'Growth Strategist',
    icon: Rocket,
    color: 'from-[#72f68e] to-[#040707]',
    description: 'Drives growth initiatives while maintaining alignment with company vision.',
    capabilities: ['Market Analysis', 'Growth Planning', 'Performance Tracking']
  },
  {
    id: 3,
    name: 'Sentinel',
    role: 'Risk & Compliance Guardian',
    icon: ShieldCheck,
    color: 'from-[#040707] to-[#72f68e]',
    description: 'Ensures operations align with regulations and company values.',
    capabilities: ['Risk Assessment', 'Compliance Monitoring', 'Policy Enforcement']
  },
  {
    id: 4,
    name: 'Echo',
    role: 'Communication Director',
    icon: MessageCircle,
    color: 'from-[#f4f4f4] to-[#72f68e]',
    description: 'Manages all communication channels with brand consistency.',
    capabilities: ['Content Creation', 'Brand Voice', 'Multi-channel Management']
  }
];

export default function AgentShowcase() {
  return (
    <div id="features" className="bg-[#040707] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pre-built EVEs™ for Every Need
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Start with our battle-tested EVEs™, then customize them to align perfectly with your company's values, mission, and objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {presetAgents.map((agent) => (
            <div
              key={agent.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"
                style={{ backgroundImage: `linear-gradient(to right, ${agent.color})` }}
              ></div>
              
              <div className="relative">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${agent.color} p-2.5 mb-4`}>
                  <agent.icon className="w-full h-full text-[#040707]" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{agent.name}</h3>
                <p className="text-sm text-[#72f68e] mb-3">{agent.role}</p>
                <p className="text-gray-400 mb-4">{agent.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((capability, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-[#72f68e]/10 text-[#72f68e]"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#72f68e]/20 via-[#f4f4f4]/20 to-[#040707]/20 rounded-xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Customize Your EVE™ Workforce
            </h3>
            <p className="text-gray-400">
              Every EVE™ can be tailored to your specific needs and company culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#72f68e]/20 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-[#72f68e]" />
              </div>
              <h4 className="text-white font-semibold mb-2">Mission Alignment</h4>
              <p className="text-gray-400 text-sm">EVEs™ adapt to your company's mission and values</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#72f68e]/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-[#72f68e]" />
              </div>
              <h4 className="text-white font-semibold mb-2">Performance Metrics</h4>
              <p className="text-gray-400 text-sm">Set custom KPIs and success criteria</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#72f68e]/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#72f68e]" />
              </div>
              <h4 className="text-white font-semibold mb-2">Team Integration</h4>
              <p className="text-gray-400 text-sm">Seamless collaboration with human team members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}