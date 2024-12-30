import React, { useState } from 'react';
import { Brain, Rocket, Briefcase, Palette, BarChart, Search, MessageCircle, Code, Shield, Database, 
  FileText, Users, Globe, Megaphone, Mail, HeartPulse, Banknote, Scale, Building2, Truck, 
  ShoppingCart, Headphones, Camera, Lightbulb, Workflow, Network, ChevronDown, ChevronRight,
  Zap, Cloud, LineChart, BookOpen, Microscope, Target, Cpu, Radio, Newspaper, Brush, Video,
  PenTool, Aperture, Gauge, Calculator, Landmark, CoinsIcon, PieChart, UserCheck, Boxes } from 'lucide-react';

const departments = [
  {
    name: 'Executive Leadership',
    icon: Brain,
    description: 'Strategic decision-making and company-wide orchestration',
    agents: [
      {
        name: 'Atlas',
        role: 'Chief EVE™ Orchestrator',
        icon: Brain,
        description: 'Creates and manages other EVEs™ based on company needs',
        capabilities: ['EVE™ Creation', 'Resource Optimization', 'Strategic Planning']
      },
      {
        name: 'Nova',
        role: 'Strategic Director',
        icon: Target,
        description: 'Drives strategic initiatives and company vision',
        capabilities: ['Strategy Development', 'Goal Setting', 'Performance Tracking']
      },
      {
        name: 'Sentinel',
        role: 'Risk & Compliance Guardian',
        icon: Shield,
        description: 'Ensures operations align with regulations and values',
        capabilities: ['Risk Assessment', 'Compliance Monitoring', 'Policy Enforcement']
      }
    ]
  },
  {
    name: 'Marketing & Communications',
    icon: Megaphone,
    description: 'Brand building and audience engagement',
    agents: [
      {
        name: 'Echo',
        role: 'Content Strategist',
        icon: MessageCircle,
        description: 'Creates and manages content across all channels',
        capabilities: ['Content Creation', 'SEO Optimization', 'Social Media']
      },
      {
        name: 'Luna',
        role: 'Brand Guardian',
        icon: Palette,
        description: 'Maintains brand consistency and visual identity',
        capabilities: ['Brand Management', 'Design Direction', 'Style Guides']
      },
      {
        name: 'Pulse',
        role: 'Market Researcher',
        icon: Search,
        description: 'Analyzes market trends and consumer behavior',
        capabilities: ['Market Analysis', 'Competitor Research', 'Consumer Insights']
      },
      {
        name: 'Pixel',
        role: 'Visual Designer',
        icon: Brush,
        description: 'Creates visual content and marketing materials',
        capabilities: ['Graphic Design', 'Image Editing', 'Visual Optimization']
      },
      {
        name: 'Lens',
        role: 'Video Producer',
        icon: Video,
        description: 'Creates and edits video content',
        capabilities: ['Video Editing', 'Animation', 'Motion Graphics']
      }
    ]
  },
  {
    name: 'Technology & Development',
    icon: Code,
    description: 'Technical infrastructure and development',
    agents: [
      {
        name: 'Neo',
        role: 'Tech Lead',
        icon: Code,
        description: 'Manages technical architecture and development',
        capabilities: ['Code Review', 'Architecture Design', 'Tech Strategy']
      },
      {
        name: 'Circuit',
        role: 'DevOps Engineer',
        icon: Cloud,
        description: 'Manages infrastructure and deployments',
        capabilities: ['CI/CD', 'Infrastructure', 'Monitoring']
      },
      {
        name: 'Matrix',
        role: 'Security Engineer',
        icon: Shield,
        description: 'Ensures system security and data protection',
        capabilities: ['Security Audits', 'Threat Detection', 'Access Control']
      },
      {
        name: 'Vector',
        role: 'QA Engineer',
        icon: Gauge,
        description: 'Ensures software quality and reliability',
        capabilities: ['Testing', 'Bug Detection', 'Quality Assurance']
      }
    ]
  },
  {
    name: 'Sales & Revenue',
    icon: BarChart,
    description: 'Revenue generation and sales operations',
    agents: [
      {
        name: 'Max',
        role: 'Sales Director',
        icon: BarChart,
        description: 'Manages sales operations and revenue growth',
        capabilities: ['Sales Strategy', 'Pipeline Management', 'Revenue Optimization']
      },
      {
        name: 'Spark',
        role: 'Lead Generator',
        icon: Target,
        description: 'Identifies and qualifies sales opportunities',
        capabilities: ['Lead Generation', 'Qualification', 'Outreach']
      },
      {
        name: 'Deal',
        role: 'Sales Closer',
        icon: Briefcase,
        description: 'Negotiates and closes sales deals',
        capabilities: ['Negotiation', 'Deal Closing', 'Contract Management']
      }
    ]
  },
  {
    name: 'Customer Experience',
    icon: HeartPulse,
    description: 'Customer satisfaction and support',
    agents: [
      {
        name: 'Aria',
        role: 'Support Lead',
        icon: Headphones,
        description: 'Manages customer support operations',
        capabilities: ['Ticket Management', 'Customer Success', 'Support Analytics']
      },
      {
        name: 'Sage',
        role: 'Experience Optimizer',
        icon: LineChart,
        description: 'Improves customer journey and satisfaction',
        capabilities: ['Journey Mapping', 'Satisfaction Analysis', 'Experience Design']
      },
      {
        name: 'Care',
        role: 'Customer Success Manager',
        icon: UserCheck,
        description: 'Ensures customer satisfaction and retention',
        capabilities: ['Success Planning', 'Relationship Management', 'Retention']
      }
    ]
  },
  {
    name: 'Finance & Operations',
    icon: Banknote,
    description: 'Financial management and operational efficiency',
    agents: [
      {
        name: 'Ledger',
        role: 'Financial Controller',
        icon: Calculator,
        description: 'Manages financial operations and reporting',
        capabilities: ['Accounting', 'Financial Planning', 'Reporting']
      },
      {
        name: 'Vault',
        role: 'Treasury Manager',
        icon: CoinsIcon,
        description: 'Manages cash flow and investments',
        capabilities: ['Cash Management', 'Investment', 'Risk Management']
      },
      {
        name: 'Audit',
        role: 'Compliance Officer',
        icon: Landmark,
        description: 'Ensures financial compliance and controls',
        capabilities: ['Compliance', 'Audit', 'Risk Control']
      }
    ]
  },
  {
    name: 'Data & Analytics',
    icon: Database,
    description: 'Data management and business intelligence',
    agents: [
      {
        name: 'Insight',
        role: 'Data Analyst',
        icon: PieChart,
        description: 'Analyzes business data for insights',
        capabilities: ['Data Analysis', 'Reporting', 'Visualization']
      },
      {
        name: 'Neural',
        role: 'ML Engineer',
        icon: Cpu,
        description: 'Develops and maintains ML models',
        capabilities: ['Model Development', 'Training', 'Optimization']
      },
      {
        name: 'Query',
        role: 'Data Engineer',
        icon: Database,
        description: 'Manages data infrastructure and pipelines',
        capabilities: ['ETL', 'Data Modeling', 'Pipeline Management']
      }
    ]
  },
  {
    name: 'Supply Chain & Logistics',
    icon: Truck,
    description: 'Supply chain management and logistics',
    agents: [
      {
        name: 'Flow',
        role: 'Supply Chain Manager',
        icon: Workflow,
        description: 'Optimizes supply chain operations',
        capabilities: ['Supply Planning', 'Vendor Management', 'Optimization']
      },
      {
        name: 'Track',
        role: 'Logistics Coordinator',
        icon: Boxes,
        description: 'Manages shipping and logistics',
        capabilities: ['Shipping', 'Route Optimization', 'Tracking']
      }
    ]
  }
];

export default function AIAgentsList() {
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

  const toggleDepartment = (departmentName: string) => {
    setExpandedDepartments(prev => 
      prev.includes(departmentName)
        ? prev.filter(name => name !== departmentName)
        : [...prev, departmentName]
    );
  };

  return (
    <div id="agents" className="bg-[#040707] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Specialized EVEs™
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our EVEs™ work together seamlessly, each specializing in specific business functions while maintaining alignment with your company's vision.
          </p>
        </div>

        <div className="space-y-6">
          {departments.map((department) => (
            <div key={department.name} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
              <button
                onClick={() => toggleDepartment(department.name)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <department.icon className="h-6 w-6 text-[#72f68e]" />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">{department.name}</h3>
                    <p className="text-sm text-gray-400">{department.description}</p>
                  </div>
                </div>
                {expandedDepartments.includes(department.name) ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {expandedDepartments.includes(department.name) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {department.agents.map((agent) => (
                    <div
                      key={agent.name}
                      className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-[#72f68e]/20 p-2.5">
                          <agent.icon className="w-full h-full text-[#72f68e]" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{agent.name}</h4>
                          <p className="text-sm text-[#72f68e]">{agent.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{agent.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.map((capability, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}