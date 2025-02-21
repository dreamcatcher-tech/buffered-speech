import { Shield, Lock, CreditCard, Server } from 'lucide-react';
import React from 'react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8" />
            <span className="ml-2 text-2xl font-bold">Raytio</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-indigo-200">Features</a>
            <a href="#pricing" className="hover:text-indigo-200">Pricing</a>
            <a href="#enterprise" className="hover:text-indigo-200">Enterprise</a>
          </div>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-indigo-800 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
              <a href="/app" className="text-white">Launch App</a>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}