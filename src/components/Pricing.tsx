import React, { useState } from 'react';
import { Check, Building2, Rocket, Globe2, Shield, Lock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Startup',
      icon: Building2,
      description: 'Perfect for new companies getting started with EVEs™',
      price: isAnnual ? 499 : 599,
      incorporationFee: 500,
      features: [
        'Company Incorporation via Stripe Atlas ($500)',
        'Regional Incorporation Options Available',
        'Up to 5 EVEs™',
        'Basic EVE™ Customization',
        'Email & Chat Support',
        'Standard Analytics',
        'Core Integrations',
        'Basic Workflow Automation',
        'Basic Legal Document Generation',
        'Standard Security Features',
      ],
      cta: 'Start Free Trial',
      highlight: false,
      addons: [
        { name: 'Without Incorporation', price: 0 },
        { name: 'With US Incorporation (Stripe Atlas)', price: 500 },
        { name: 'With EU Incorporation', price: 800 },
        { name: 'With UK Incorporation', price: 700 },
      ]
    },
    {
      name: 'Growth',
      icon: Rocket,
      description: 'Ideal for growing companies scaling their operations',
      price: isAnnual ? 999 : 1199,
      features: [
        'Everything in Startup, plus:',
        'Up to 15 EVEs™',
        'Advanced EVE™ Customization',
        'Priority Support with 4h Response Time',
        'Advanced Analytics & Reporting',
        'All Integrations + API Access',
        'Advanced Workflow Automation',
        'Custom EVE™ Training',
        'Team Collaboration Tools',
        'Multi-department Support',
        'Compliance Monitoring',
        'Advanced Security Features',
        'Dedicated Account Manager',
        'ROI Tracking & Optimization',
        'Business Intelligence Dashboard'
      ],
      cta: 'Get Started',
      highlight: true,
    },
    {
      name: 'Enterprise',
      icon: Globe2,
      description: 'For large organizations requiring full automation with enterprise-grade security',
      price: 'Custom',
      features: [
        'Everything in Growth, plus:',
        'Unlimited EVEs™',
        'Full EVE™ Customization',
        'Dedicated 24/7 Support',
        'Enterprise Analytics Suite',
        'Custom Integrations',
        'Enterprise Workflow Automation',
        'Advanced Security Features:',
        '- SOC 2 Type II Compliance',
        '- GDPR & CCPA Compliance',
        '- End-to-end Encryption',
        '- Custom Security Policies',
        'High Availability SLA (99.99%)',
        'Dedicated Security Team',
        'Custom Development & Deployment',
        'On-premises Deployment Option',
        'Audit Logging & Compliance Reports',
        'Custom EVE™ Training',
        'Multi-region Support',
        'Enterprise SSO & SAML'
      ],
      cta: 'Contact Sales',
      highlight: false,
    },
  ];

  return (
    <div id="pricing" className="bg-[#040707] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center">
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative mx-4 flex h-6 w-12 items-center rounded-full p-1 focus:outline-none"
              style={{ backgroundColor: isAnnual ? '#72f68e' : '#2E2E2E' }}
            >
              <div
                className={`h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
              <span className="ml-1.5 rounded-full bg-[#72f68e]/10 px-2 py-0.5 text-xs text-[#72f68e]">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl backdrop-blur-sm p-8 ${
                plan.highlight
                  ? 'bg-white/10 border-2 border-[#72f68e]'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#72f68e] text-[#040707] text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
                </div>
                <div className="rounded-lg bg-[#72f68e]/20 p-2">
                  <plan.icon className="h-6 w-6 text-[#72f68e]" />
                </div>
              </div>

              <div className="mb-6">
                {typeof plan.price === 'number' ? (
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-400 ml-2">/month</span>
                    </div>
                    {plan.incorporationFee && (
                      <p className="text-sm text-gray-400 mt-2">
                        + one-time incorporation fee (optional)
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-white">{plan.price}</div>
                )}
              </div>

              {plan.addons && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-200 mb-2">Incorporation Options</h4>
                  <div className="space-y-2">
                    {plan.addons.map((addon) => (
                      <div key={addon.name} className="flex justify-between text-sm">
                        <span className="text-gray-400">{addon.name}</span>
                        <span className="text-white">
                          {addon.price === 0 ? 'Included' : `+$${addon.price}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-[#72f68e] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/auth"
                className={`block text-center py-3 px-4 rounded-lg transition-colors ${
                  plan.highlight
                    ? 'bg-[#72f68e] text-[#040707] hover:bg-[#72f68e]/90'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Enterprise Contact */}
        <div className="mt-16 text-center">
          <p className="text-gray-400">
            Need a custom solution?{' '}
            <a href="mailto:enterprise@mavrika.ai" className="text-[#72f68e] hover:text-[#72f68e]/80">
              Contact our enterprise team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}