import React, { useState } from 'react';
import Header from './components/Header';
import ShopPage from './components/Shop/ShopPage';
import { MOCK_MF_PORTFOLIO } from './services/mockApi';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState('Shop');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1Fi Application Header */}
      <Header
        portfolioLimit={MOCK_MF_PORTFOLIO.eligibleLienLimit}
        activeTab={activeNavTab}
        onTabSelect={setActiveNavTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeNavTab === 'Shop' ? (
          <ShopPage />
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <div className="p-8 bg-white rounded-3xl border border-slate-200 max-w-lg mx-auto space-y-3">
              <Sparkles className="w-8 h-8 text-emerald-600 mx-auto" />
              <h2 className="text-xl font-bold text-slate-900">{activeNavTab} Section</h2>
              <p className="text-xs text-slate-500">
                Navigate to the <button onClick={() => setActiveNavTab('Shop')} className="text-emerald-600 font-bold underline">Shop</button> page to view the 1Fi Marketplace.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white font-extrabold flex items-center justify-center text-sm">
                1F
              </div>
              <span className="font-bold text-white text-base">1Fi Credit Engine</span>
            </div>
            <div className="flex items-center gap-6 text-slate-300">
              <span className="hover:text-emerald-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-emerald-400 cursor-pointer">Terms of Service</span>
              <span className="hover:text-emerald-400 cursor-pointer">CAMS Lien Security</span>
              <span className="hover:text-emerald-400 cursor-pointer">Help & FAQs</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2">
            <p>© 2026 1Fi Financial Technologies Pvt Ltd. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span>Loans against Mutual Funds powered by SEBI RBI regulated partners.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
