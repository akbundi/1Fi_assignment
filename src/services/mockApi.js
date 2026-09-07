// 1Fi Dynamic Mock API Service
// Provides dynamic product fetching, storage variant recalculations, 
// EMI interest breakdown, and Mutual Fund portfolio pledge data.

export const MOCK_MF_PORTFOLIO = {
  totalValue: 485000,
  eligibleLienLimit: 450000,
  activeLienUsed: 0,
  holdings: [
    {
      id: "mf-1",
      name: "Parag Parikh Flexi Cap Fund Direct-Growth",
      category: "Flexi Cap",
      currentValue: 210000,
      pledgeEligibleRatio: 0.85,
      maxLienAmount: 178500,
      folioNo: "19284712/94",
      amc: "PPFAS Mutual Fund"
    },
    {
      id: "mf-2",
      name: "HDFC Top 100 Fund Direct-Growth",
      category: "Large Cap",
      currentValue: 150000,
      pledgeEligibleRatio: 0.90,
      maxLienAmount: 135000,
      folioNo: "90218473/11",
      amc: "HDFC Mutual Fund"
    },
    {
      id: "mf-3",
      name: "ICICI Prudential Bluechip Fund Direct-Growth",
      category: "Large Cap",
      currentValue: 125000,
      pledgeEligibleRatio: 0.90,
      maxLienAmount: 112500,
      folioNo: "77491028/05",
      amc: "ICICI Prudential Mutual Fund"
    }
  ]
};

export const calculateEmiPlansForPrice = (basePrice) => {
  // Base price reference for 256GB is 127400
  // Standard plan ratios matched exactly to reference screenshot
  return [
    {
      months: 3,
      monthlyAmount: Math.round(basePrice * (44967 / 127400)),
      interestRate: 0,
      cashback: 7500,
      badge: "0% interest",
      isPopular: false,
    },
    {
      months: 6,
      monthlyAmount: Math.round(basePrice * (22483 / 127400)),
      interestRate: 0,
      cashback: 7500,
      badge: "0% interest",
      isPopular: false,
    },
    {
      months: 12,
      monthlyAmount: Math.round(basePrice * (11242 / 127400)),
      interestRate: 0,
      cashback: 7500,
      badge: "0% interest",
      isPopular: true,
    },
    {
      months: 24,
      monthlyAmount: Math.round(basePrice * (5621 / 127400)),
      interestRate: 0,
      cashback: 7500,
      badge: "0% interest",
      isPopular: false,
    },
    {
      months: 36,
      monthlyAmount: Math.round(basePrice * (4297 / 127400)),
      interestRate: 10.5,
      cashback: 7500,
      badge: "10.5% interest",
      isPopular: false,
    },
    {
      months: 48,
      monthlyAmount: Math.round(basePrice * (3385 / 127400)),
      interestRate: 10.5,
      cashback: 7500,
      badge: "10.5% interest",
      isPopular: false,
    },
    {
      months: 60,
      monthlyAmount: Math.round(basePrice * (2842 / 127400)),
      interestRate: 10.5,
      cashback: 7500,
      badge: "10.5% interest",
      isPopular: false,
    }
  ];
};

export const FEATURED_IPHONE = {
  id: "iphone-17-pro",
  tag: "NEW",
  title: "iPhone 17 Pro",
  subtitle: "Available in 3 finishes",
  defaultStorage: "256GB",
  storageVariants: [
    { size: "128GB", price: 117400, originalPrice: 124900 },
    { size: "256GB", price: 127400, originalPrice: 134900 },
    { size: "512GB", price: 147400, originalPrice: 154900 },
    { size: "1TB", price: 167400, originalPrice: 174900 },
  ],
  colorFinishes: [
    { name: "Desert Copper", colorHex: "#E07A48", image: "/dessert copper.jpeg" },
    { name: "Natural Silver", colorHex: "#E5E7EB", image: "/natural silver.jpeg" },
    { name: "Deep Blue", colorHex: "#1E3A8A", image: "/deep blue.jpeg" },
  ],
  description: "Forged in Grade 5 Titanium with groundbreaking A19 Pro Neural Engine. 0% EMI available backed by your Mutual Funds portfolio.",
  specs: [
    { name: "Display", value: "6.3-inch Super Retina XDR OLED with 120Hz ProMotion" },
    { name: "Chip", value: "Apple A19 Pro 3nm Silicon" },
    { name: "Camera System", value: "48MP Main + 48MP Ultra Wide + 48MP 5x Telephoto" },
    { name: "Collateral Policy", value: "Zero mutual fund liquidation, earn market returns" },
    { name: "Processing Fee", value: "₹0 (Zero Processing Fee for 1Fi users)" }
  ]
};

export const OTHER_PRODUCTS = [
  {
    id: "macbook-pro-m4",
    tag: "POPULAR",
    title: "MacBook Pro 14\" M4",
    category: "Laptops",
    price: 169900,
    originalPrice: 179900,
    storage: "512GB SSD",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    color: "#4B5563",
    finishCount: 2,
    startingEmi: 7079
  },
  {
    id: "samsung-s26-ultra",
    tag: "NEW",
    title: "Samsung Galaxy S26 Ultra",
    category: "Smartphones",
    price: 139999,
    originalPrice: 149999,
    storage: "256GB",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    color: "#1E293B",
    finishCount: 4,
    startingEmi: 5833
  },
  {
    id: "ipad-pro-m4",
    tag: "FEATURED",
    title: "iPad Pro 13\" M4 OLED",
    category: "Tablets",
    price: 129900,
    originalPrice: 139900,
    storage: "256GB",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    color: "#E2E8F0",
    finishCount: 2,
    startingEmi: 5412
  },
  {
    id: "sony-wh1000xm5",
    tag: "BESTSELLER",
    title: "Sony WH-1000XM5 ANC",
    category: "Audio",
    price: 29990,
    originalPrice: 34990,
    storage: "Wireless",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    color: "#0F172A",
    finishCount: 3,
    startingEmi: 1249
  }
];

export const marketplaceApi = {
  getFeaturedProduct: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FEATURED_IPHONE), 200);
    });
  },
  getOtherProducts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(OTHER_PRODUCTS), 200);
    });
  },
  getMutualFundPortfolio: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_MF_PORTFOLIO), 200);
    });
  },
  createOrder: async (orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          orderId: "1FI-ORD-" + Math.floor(100000 + Math.random() * 900000),
          timestamp: new Date().toISOString(),
          lienReferenceNo: "LIEN-CAMS-" + Math.floor(10000000 + Math.random() * 90000000),
          ...orderData
        });
      }, 800);
    });
  }
};
