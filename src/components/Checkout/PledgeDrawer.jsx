import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, Lock, TrendingUp, Sparkles, CreditCard, ChevronRight } from 'lucide-react';
import { MOCK_MF_PORTFOLIO, marketplaceApi } from '../../services/mockApi';

export default function PledgeDrawer({ isOpen, onClose, product, selectedPlan, selectedStorage, selectedFinish }) {
  const [step, setStep] = useState(1); // 1: Review, 2: AutoPay, 3: Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  if (!isOpen || !product || !selectedPlan) return null;

  const currentPrice = selectedStorage ? selectedStorage.price : 127400;

  const handleConfirmPledge = async () => {
    setIsSubmitting(true);
    try {
      const res = await marketplaceApi.createOrder({
        productId: product.id,
        productTitle: product.title,
        storage: selectedStorage?.size || '256GB',
        finish: selectedFinish?.name || 'Desert Copper',
        emiPlan: selectedPlan,
        totalAmount: currentPrice,
        pledgedFund: MOCK_MF_PORTFOLIO.holdings[0].name
      });
      setOrderDetails(res);
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setOrderDetails(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-modal">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              1F
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {step === 3 ? 'Application Approved!' : '1Fi Mutual Fund EMI Pledge'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {step === 3 ? 'Order # ' + orderDetails?.orderId : 'Backed by your Mutual Fund Investments'}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5">
              
              {/* Product & Plan Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
                <img
                  src={selectedFinish?.image || product.colorFinishes[0].image}
                  alt={product.title}
                  className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-slate-200"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-600">
                      {product.tag}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{selectedStorage?.size || '256GB'}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{product.title}</h4>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    Finish: {selectedFinish?.name || 'Desert Copper'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900 block">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    ₹{selectedPlan.monthlyAmount.toLocaleString('en-IN')}/mo
                  </span>
                </div>
              </div>

              {/* EMI Selection Detail */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">Selected EMI Plan</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
                    {selectedPlan.badge}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-extrabold text-slate-900">
                    ₹{selectedPlan.monthlyAmount.toLocaleString('en-IN')} <span className="text-sm font-semibold text-slate-600">/ mo</span>
                  </span>
                  <span className="text-sm font-bold text-slate-700">for {selectedPlan.months} Months</span>
                </div>
                {selectedPlan.cashback && (
                  <div className="mt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Cashback reward of ₹{selectedPlan.cashback.toLocaleString('en-IN')} will be credited on 1st EMI payment
                  </div>
                )}
              </div>

              {/* Mutual Fund Pledge Collateral Banner */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-bold">Zero Fund Liquidation</span>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Returns Continue
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your Mutual Fund portfolio of <strong className="text-white">₹{MOCK_MF_PORTFOLIO.totalValue.toLocaleString('en-IN')}</strong> will be marked with a digital lien of ₹{currentPrice.toLocaleString('en-IN')}. <span className="text-emerald-400 font-semibold">Your funds stay invested and keep earning compound returns!</span>
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Eligible Holdings: <strong>PPFAS Flexi Cap & HDFC Top 100</strong></span>
                  <span className="text-emerald-400 font-semibold">Processing Fee: ₹0</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={resetAndClose}
                  className="w-1/3 py-3 rounded-xl border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Select Portfolio & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Confirm Digital Lien & AutoPay</h4>
                <p className="text-xs text-slate-500">
                  Select your linked Mutual Fund folio to mark lien for instant EMI approval
                </p>
              </div>

              {/* Folio Cards */}
              <div className="space-y-2.5">
                {MOCK_MF_PORTFOLIO.holdings.map((fund, idx) => (
                  <label
                    key={fund.id}
                    className={`block p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      idx === 0
                        ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500/30'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="mf_folio"
                          defaultChecked={idx === 0}
                          className="accent-emerald-600 w-4 h-4"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{fund.name}</p>
                          <p className="text-[11px] text-slate-500">Folio: {fund.folioNo} • {fund.amc}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900 block">
                          ₹{fund.currentValue.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-600">
                          Eligible Collateral
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Security Banner */}
              <div className="p-3 bg-slate-100 rounded-xl flex items-center gap-2 text-xs text-slate-600">
                <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>
                  Encrypted lien registration verified by CAMS & KFintech repository.
                </span>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmPledge}
                  disabled={isSubmitting}
                  className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Digital Lien...</span>
                  ) : (
                    <>
                      <span>Sign Digital Lien & Get Approval</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && orderDetails && (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-slate-900">EMI Application Approved!</h4>
                <p className="text-sm font-semibold text-emerald-600 mt-1">
                  1Fi Mutual Fund Lien successfully created
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-bold text-slate-900">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Product:</span>
                  <span className="font-bold text-slate-900">{orderDetails.productTitle} ({orderDetails.storage})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Monthly EMI:</span>
                  <span className="font-bold text-emerald-700">₹{orderDetails.emiPlan.monthlyAmount.toLocaleString('en-IN')}/mo x {orderDetails.emiPlan.months}m</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Lien Reference:</span>
                  <span className="font-bold text-slate-800">{orderDetails.lienReferenceNo}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Investment Status:</span>
                  <span className="font-bold text-emerald-600">Active & Compounding</span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-md"
              >
                Return to 1Fi Marketplace
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
