import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#040707] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#72f68e]" />
              <span className="text-xl font-bold text-white">mavrika</span>
            </div>
            <p className="text-gray-400 text-sm">
              Pioneering EVE™-driven business operations since 2018. Trusted by over 1,000 companies globally.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/mavrika" className="text-gray-400 hover:text-[#72f68e] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/mavrika" className="text-gray-400 hover:text-[#72f68e] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/mavrika" className="text-gray-400 hover:text-[#72f68e] transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li><Link to="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/roadmap" className="text-gray-400 hover:text-white transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/customers" className="text-gray-400 hover:text-white transition-colors">Customers</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/documentation" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/api" className="text-gray-400 hover:text-white transition-colors">API Reference</Link></li>
              <li><Link to="/status" className="text-gray-400 hover:text-white transition-colors">System Status</Link></li>
              <li>
                <a href="mailto:support@mavrika.ai" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
          <div className="text-sm text-gray-400">
            © 2018-{new Date().getFullYear()} mavrika, Inc. All rights reserved.
          </div>
          <div className="flex space-x-6 md:justify-end">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/compliance" className="text-sm text-gray-400 hover:text-white transition-colors">
              Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}