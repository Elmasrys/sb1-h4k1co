import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import AgentShowcase from './features/AgentShowcase';
import IntegrationShowcase from './features/IntegrationShowcase';
import SecuritySection from './features/SecuritySection';
import TractionSection from './TractionSection';
import TrustSection from './TrustSection';
import Pricing from './Pricing';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AgentShowcase />
        <IntegrationShowcase />
        <SecuritySection />
        <TractionSection />
        <TrustSection />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}