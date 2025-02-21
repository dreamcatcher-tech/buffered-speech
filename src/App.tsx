import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import RaytioEcosystemFlow from './components/RaytioEcosystemFlow';
import { Footer } from './components/Footer';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen">
            <Header />
            <Hero />
            <Features />
            <Pricing />
            <section className="py-20 bg-white">
              <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16">How Raytio Works</h2>
                <div className="flex justify-center">
                  <RaytioEcosystemFlow />
                </div>
              </div>
            </section>
            <Footer />
          </div>
        } />
        <Route path="/app" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );

}
export default App;
