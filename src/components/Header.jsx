import React from 'react';
import { Search, ShieldCheck, ShoppingBag, User, Bell, ChevronDown } from 'lucide-react';

export default function Header({ portfolioLimit = 450000, activeTab = 'Shop', onTabSelect }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-emerald-500/20">
                1F
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-tight">
                  1Fi<span className="text-emerald-600">.</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase leading-none">
                  Credit Against MF
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {['Dashboard', 'Investments', 'Shop', 'Loans & Credit'].map((navItem) => {
                const isActive = navItem === activeTab;
                return (
                  <button
                    key={navItem}
                    onClick={() => onTabSelect && onTabSelect(navItem)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-emerald-700 bg-emerald-50/80 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                    }`}
                  >
                    {navItem}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, brands or specs..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100/80 border border-transparent rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800"
            />
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            
            {/* Mutual Fund Portfolio Credit Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200/70 px-3 py-1.5 rounded-full shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-emerald-800 font-medium leading-none">MF Eligible Credit</span>
                <span className="text-xs font-bold text-emerald-900 leading-tight">
                  ₹{portfolioLimit.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs ring-2 ring-emerald-500/20">
                AK
              </div>
              <span className="hidden xl:inline text-xs font-semibold text-slate-700">Ankit K.</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
