import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '99',
    features: [
      'Up to 2,000 secure vault entries',
      'Basic identity verifications',
      'Basic developer support',
      'Email and phone verification',
      'Standard API access'
    ]
  },
  {
    name: 'Growth',
    price: '499',
    popular: true,
    features: [
      'Up to 20,000 secure vault entries',
      'Advanced verification (ID, address)',
      'Priority developer support',
      'Discounted payment processing',
      'Enhanced API access'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited vault entries',
      'Self-hosted deployment option',
      'Custom payment rails',
      'Multi-verifier support',
      'Dedicated success team'
    ]
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-8 shadow-lg relative ${
                plan.popular ? 'border-2 border-indigo-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-gray-600">/month</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}