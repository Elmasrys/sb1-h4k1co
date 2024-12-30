import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate('/auth', { state: { isSignUp: true } });
  };

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
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#040707]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => navigate('/')} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#72f68e]" />
              <span className="text-xl font-bold text-white">mavrika</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('agents')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                EVEs™
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={handleGetStarted}
                className="bg-[#72f68e] text-[#040707] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#72f68e]/90 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#040707]/95 backdrop-blur-sm">
          <button
            onClick={() => scrollToSection('features')}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('agents')}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            EVEs™
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            Pricing
          </button>
          <button
            onClick={handleGetStarted}
            className="bg-[#72f68e] text-[#040707] block px-3 py-2 rounded-md text-base font-medium hover:bg-[#72f68e]/90 w-full text-left"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}