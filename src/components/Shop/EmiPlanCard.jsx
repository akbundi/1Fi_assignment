import React from 'react';
import { Check } from 'lucide-react';

export default function EmiPlanCard({ plan, isSelected, onSelect }) {
  const { monthlyAmount, months, badge, cashback, interestRate } = plan;

  return (
    <div
      onClick={onSelect}
      className={`group relative p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer select-none ${
        isSelected
          ? 'bg-emerald-50/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Monthly Price & Duration */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            ₹{monthlyAmount.toLocaleString('en-IN')}
          </span>
          <span className="text-sm font-medium text-slate-600">
            x {months} months
          </span>
        </div>

        {/* Interest Badge */}
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${interestRate === 0 ? 'text-slate-900' : 'text-slate-800'}`}>
            {badge}
          </span>
          
          {/* Radio / Selection Circle */}
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
              isSelected
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'border-slate-300 group-hover:border-slate-400 bg-white'
            }`}
          >
            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>
      </div>

      {/* Additional Cashback Subtitle */}
      {cashback && (
        <div className="mt-1 flex items-center gap-1">
          <span className="text-xs font-bold text-emerald-600">
            Additional cashback of ₹{cashback.toLocaleString('en-IN')}
          </span>
        </div>
      )}
    </div>
  );
}
