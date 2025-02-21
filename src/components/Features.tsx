import { Lock, CreditCard, Server, Shield, CheckCircle } from 'lucide-react';
import React from 'react';

const features = [
  {
    title: 'Raytio Secure Vault',
    icon: Lock,
    description: 'An encrypted data storage service that allows your application to delegate the storage of personally identifiable information (PII).',
    benefits: [
      'Offload security & compliance overhead',
      'Reduce liability with anonymous tokens',
      'End-to-end encryption protection'
    ]
  },
  {
    title: 'Raytio Verified ID',
    icon: Shield,
    description: 'A quick and user-friendly identity verification system with digital signatures for reusable verifications.',
    benefits: [
      'Faster user onboarding',
      'Reduced fraud and chargebacks',
      'HIPAA & GDPR compliant'
    ]
  },
  {
    title: 'Raytio Payments',
    icon: CreditCard,
    description: 'A payment processing layer that integrates with Verified ID for secure, streamlined transactions.',
    benefits: [
      'Tiered processing fees',
      'Unified checkout flow',
      'Enhanced fraud protection'
    ]
  },
  {
    title: 'Self-Hosted Option',
    icon: Server,
    description: 'Deploy Raytio on your private cloud while maintaining connection to our verification network.',
    benefits: [
      'Full data control',
      'Custom retention policies',
      'Enterprise-grade security'
    ]
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <feature.icon className="h-12 w-12 text-indigo-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}