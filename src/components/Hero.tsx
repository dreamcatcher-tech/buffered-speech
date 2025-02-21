import { Shield } from 'lucide-react';
import React from 'react';

export function Hero() {
  return (
    <div className="bg-gradient-to-b from-indigo-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <Shield className="h-16 w-16 mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, Secure, and Seamless Identity & Payment Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl">
            Reinvent your customer experience with secure identity management, frictionless checkout, 
            and verified data— all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors">
              Request Demo
            </button>
            <button className="px-8 py-4 bg-indigo-800 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}