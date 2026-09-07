import React, { useState, useEffect } from 'react';
import { 
  FEATURED_IPHONE, 
  calculateEmiPlansForPrice, 
  marketplaceApi 
} from '../../services/mockApi';
import EmiPlanCard from './EmiPlanCard';
import PledgeDrawer from '../Checkout/PledgeDrawer';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  SlidersHorizontal, 
  Search, 
  ChevronDown, 
  Check, 
  Info,
  TrendingUp
} from 'lucide-react';

export default function MarketplaceTab() {
  const [product, setProduct] = useState(FEATURED_IPHONE);
  const [selectedStorage, setSelectedStorage] = useState(FEATURED_IPHONE.storageVariants[1]); // 256GB default
  const [selectedFinish, setSelectedFinish] = useState(FEATURED_IPHONE.colorFinishes[0]); // Desert Copper default
  const [emiPlans, setEmiPlans] = useState([]);
  const [selectedEmiIndex, setSelectedEmiIndex] = useState(3); // 24 months @ ₹5,621 default as per popular choice
  
  // Catalog state
  const [otherProducts, setOtherProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [activeTabSection, setActiveTabSection] = useState('specs'); // specs | mf_terms

  // Checkout Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Dynamically calculate EMI plans based on selected storage price
    const currentPrice = selectedStorage ? selectedStorage.price : 127400;
    const recalculatedPlans = calculateEmiPlansForPrice(currentPrice);
    setEmiPlans(recalculatedPlans);
  }, [selectedStorage]);

  useEffect(() => {
    marketplaceApi.getOtherProducts().then((res) => setOtherProducts(res));
  }, []);

  const currentPrice = selectedStorage ? selectedStorage.price : 127400;
  const currentOriginalPrice = selectedStorage ? selectedStorage.originalPrice : 134900;
  const activeEmiPlan = emiPlans[selectedEmiIndex] || emiPlans[0];

  const filteredCatalog = otherProducts.filter(p => {
    if (categoryFilter === 'All') return true;
    return p.category === categoryFilter;
  });

  return (
    <div className="space-y-10 animate-fade-in">

      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1Fi Mutual Fund EMI Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Buy Premium Tech on 0% EMI <br className="hidden sm:inline" />
            <span className="text-emerald-400">Backed by Your Mutual Funds</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Zero processing fee, zero impact on mutual fund returns. Keep your investments compounding while enjoying instant approvals.
          </p>
        </div>
      </div>

      {/* Main Spotlight Product Section (Matches Reference Image) */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-8 shadow-sm">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Showcase Card */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs relative">
            
            <div>
              {/* Product Badge & Title */}
              <div className="space-y-1 mb-4">
                <span className="text-xs font-bold tracking-wider text-rose-600 uppercase">
                  {product.tag}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {product.title}
                </h2>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-semibold text-slate-500">
                    {selectedStorage.size}
                  </span>
                  
                  {/* Storage Variant Switcher Pills */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    {product.storageVariants.map((storage) => (
                      <button
                        key={storage.size}
                        onClick={() => setSelectedStorage(storage)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                          selectedStorage.size === storage.size
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {storage.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Product Image (Extracted from photo) */}
              <div className="relative my-6 flex items-center justify-center min-h-[300px] sm:min-h-[360px] bg-gradient-to-b from-slate-50/50 to-slate-100/30 rounded-2xl p-4">
                <img
                  src={selectedFinish.image}
                  alt={`${product.title} in ${selectedFinish.name}`}
                  className="max-h-[340px] w-auto object-contain transition-all duration-300 hover:scale-105 filter drop-shadow-lg"
                />
              </div>
            </div>

            {/* Bottom Color Swatches Section */}
            <div className="pt-4 border-t border-slate-100 flex flex-col items-center justify-center space-y-2">
              <span className="text-xs font-semibold text-slate-400 tracking-wide">
                {product.subtitle}
              </span>
              
              <div className="flex items-center gap-3">
                {product.colorFinishes.map((finish) => {
                  const isSelected = selectedFinish.name === finish.name;
                  return (
                    <button
                      key={finish.name}
                      onClick={() => setSelectedFinish(finish)}
                      title={finish.name}
                      className={`w-7 h-7 rounded-full transition-all flex items-center justify-center ring-offset-2 ${
                        isSelected
                          ? 'ring-2 ring-slate-800 scale-110'
                          : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: finish.colorHex }}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white/80 shadow-xs"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Pricing & EMI Plans Selection */}
          <div className="lg:col-span-7 flex flex-col space-y-5">
            
            {/* Price Header */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {currentOriginalPrice && (
                  <span className="text-lg font-semibold text-slate-400 line-through">
                    ₹{currentOriginalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Save ₹{(currentOriginalPrice - currentPrice).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-700 pt-0.5">
                EMI plans backed by mutual funds
              </p>
            </div>

            {/* List of 7 EMI Plans (Matching Screenshot) */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {emiPlans.map((plan, idx) => (
                <EmiPlanCard
                  key={plan.months}
                  plan={plan}
                  isSelected={selectedEmiIndex === idx}
                  onSelect={() => setSelectedEmiIndex(idx)}
                />
              ))}
            </div>

            {/* Bottom CTA Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero processing fee • Instant CAMS Lien approval</span>
              </div>

              <button
                onClick={() => setIsDrawerOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 group"
              >
                <span>Proceed with ₹{activeEmiPlan?.monthlyAmount.toLocaleString('en-IN')}/mo EMI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* Product Specifications & Mutual Fund Lien Benefits Tab Section */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTabSection('specs')}
            className={`text-sm font-bold pb-2 transition-all relative ${
              activeTabSection === 'specs'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Product Highlights & Specifications
          </button>
          <button
            onClick={() => setActiveTabSection('mf_terms')}
            className={`text-sm font-bold pb-2 transition-all relative ${
              activeTabSection === 'mf_terms'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            How 1Fi Mutual Fund EMI Works
          </button>
        </div>

        {activeTabSection === 'specs' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {product.specs.map((spec, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <span className="text-xs font-semibold text-slate-500">{spec.name}</span>
                <span className="text-sm font-bold text-slate-900 mt-1">{spec.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Zero Liquidation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your mutual funds are never redeemed or sold. You keep earning 100% of market upside and returns.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Digital Lien Pledge</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant online lien marking through CAMS / KFintech via OTP. Takes less than 60 seconds.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Flexible 0% EMI</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pay low monthly EMIs directly from your auto-pay account with additional cashback benefits.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Expanded Catalog Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">More Products Available on 1Fi EMI</h3>
            <p className="text-xs text-slate-500">Browse smartphones, laptops, audio gear & more</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {['All', 'Smartphones', 'Laptops', 'Tablets', 'Audio'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  categoryFilter === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredCatalog.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="relative bg-slate-50 rounded-xl p-4 min-h-[160px] flex items-center justify-center">
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    {item.tag}
                  </span>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-[130px] w-auto object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="mt-3 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">{item.category}</span>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-extrabold text-slate-900">₹{item.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">EMI from</span>
                  <span className="text-xs font-bold text-emerald-600">₹{item.startingEmi.toLocaleString('en-IN')}/mo</span>
                </div>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold transition-colors"
                >
                  View Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Checkout Drawer Modal */}
      <PledgeDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={product}
        selectedPlan={activeEmiPlan}
        selectedStorage={selectedStorage}
        selectedFinish={selectedFinish}
      />

    </div>
  );
}
