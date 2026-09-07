import React from 'react';
import { MapPin } from 'lucide-react';

export default function NearbyStoresTab() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
        <MapPin className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">Nearby Stores</h3>
      <p className="text-sm text-slate-500 max-w-sm">
        Locate partner retail electronics stores near you for instant in-store Mutual Fund EMI approvals.
      </p>
    </div>
  );
}
