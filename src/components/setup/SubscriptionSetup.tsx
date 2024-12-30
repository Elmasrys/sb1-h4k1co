import React, { useState } from 'react';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { useCompanyStore } from '../../store/companyStore';
import { Shield, Check, AlertTriangle } from 'lucide-react';
import { SubscriptionSchema } from '../../types/subscription';
import { LoadingState } from '../common/LoadingState';

export default function SubscriptionSetup() {
  const { createSubscription, loading, error } = useSubscriptionStore();
  const { company } = useCompanyStore();
  const [selectedTier, setSelectedTier] = useState('starter');
  const [paymentDetails, setPaymentDetails] = useState({
    type: 'card',
    card: {
      number: '',
      exp_month: '',
      exp_year: '',
      cvc: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = SubscriptionSchema.parse({
        tier: selectedTier,
        payment_method: paymentDetails
      });
      await createSubscription(validatedData.tier, validatedData.payment_method);
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };

  if (loading) {
    return <LoadingState message="Setting up your subscription..." />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
        <p className="text-gray-400 mt-2">
          Select the plan that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Subscription tiers */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-white">Starter</h3>
              <div className="mt-2">
                <span className="text-2xl font-bold text-white">$99</span>
                <span className="text-gray-400">/month</span>
              </div>
            </div>
            <Shield className="h-6 w-6 text-[#72f68e]" />
          </div>
          <ul className="mt-6 space-y-4">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#72f68e] mr-2" />
              <span className="text-gray-300">Up to 3 EVEs™</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#72f68e] mr-2" />
              <span className="text-gray-300">Basic Analytics</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-[#72f68e] mr-2" />
              <span className="text-gray-300">Email Support</span>
            </li>
          </ul>
          <button
            onClick={() => setSelectedTier('starter')}
            className={`mt-6 w-full py-2 rounded-lg transition-colors ${
              selectedTier === 'starter'
                ? 'bg-[#72f68e] text-[#040707]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Select Starter
          </button>
        </div>

        {/* Add Growth and Enterprise tiers similarly */}
      </div>

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white/5 rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">Payment Details</h3>
        {/* Add payment form fields */}
      </form>
    </div>
  );
}