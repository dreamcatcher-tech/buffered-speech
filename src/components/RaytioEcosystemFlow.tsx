import React from 'react';
import LegacyDataFlow from './LegacyDataFlow';
import ModernDataFlow from './ModernDataFlow';

export default function RaytioEcosystemFlow() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-700 mb-2">Legacy Systems: Fragmented & Outdated</h3>
          <p className="text-gray-600 mb-4">Companies store sensitive data in isolated silos, leading to inconsistent and outdated customer information</p>
          <LegacyDataFlow />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-indigo-700 mb-2">Raytio: Modern & Unified</h3>
          <p className="text-indigo-600 mb-4">A secure, centralized vault that keeps customer data fresh and reduces company liability</p>
          <ModernDataFlow />
        </div>
      </div>
    </div>
  );
}