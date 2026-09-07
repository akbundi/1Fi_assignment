import React, { useState } from 'react';
import TopBrandsTab from './TopBrandsTab';
import NearbyStoresTab from './NearbyStoresTab';
import MarketplaceTab from './MarketplaceTab';
import { Tag, MapPin, Store, Sparkles } from 'lucide-react';

export default function ShopPage() {
  // 3 Shop options: 'top-brands' | 'nearby-stores' | 'marketplace'
  const [activeSubTab, setActiveSubTab] = useState('marketplace');

  const shopTabs = [
    {
      id: 'top-brands',
      label: 'Top Brands',
      icon: Tag,
      description: 'Official brand stores',
      isRequired: false
    },
    {
      id: 'nearby-stores',
      label: 'Nearby Stores',
      icon: MapPin,
      description: 'Local retail partners',
      isRequired: false
    },
    {
      id: 'marketplace',
      label: '1Fi Marketplace',
      icon: Store,
      badge: 'FEATURED',
      description: '0% EMI on Mutual Funds',
      isRequired: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Shop Sub-Navigation Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              1Fi Shop
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Explore gadgets and tech with instant Mutual Fund credit options
            </p>
          </div>
        </div>

        {/* 3 Sub-tab Pills (Top Brands, Nearby Stores, 1Fi Marketplace) */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 sm:gap-2 max-w-2xl border border-slate-200/80">
          {shopTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-700">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="pt-2">
        {activeSubTab === 'top-brands' && <TopBrandsTab />}
        {activeSubTab === 'nearby-stores' && <NearbyStoresTab />}
        {activeSubTab === 'marketplace' && <MarketplaceTab />}
      </div>

    </div>
  );
}
