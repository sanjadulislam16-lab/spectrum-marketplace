import React from 'react';
import { Palette, Shield, Truck, RotateCcw, Award, Mail, ArrowUpRight, Sparkles, Sun, CheckCircle2 } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSelectedColorHex, language, t, addToast } = useCommerce();

  const curatedHexList = [
    { name: 'Midnight Obsidian', hex: '#0F172A' },
    { name: 'Amber Caramel', hex: '#D97706' },
    { name: 'Royal Sapphire', hex: '#2563EB' },
    { name: 'Forest Moss', hex: '#166534' },
    { name: 'Rose Quartz', hex: '#FB7185' },
    { name: 'Electric Violet', hex: '#8B5CF6' },
    { name: 'Cyber Cyan', hex: '#06B6D4' },
    { name: 'Terracotta Warm', hex: '#EA580C' }
  ];

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 mt-20 transition-colors duration-200">
      {/* Value props banner */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400 shrink-0">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">
                  {language === 'bn' ? 'আসল কালার কোড ও মান' : 'True-Color Precision'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'bn' ? 'ক্যালিব্রেটেড হেক্স কোড ও মান যাচাইকৃত খাঁটি পণ্য।' : 'Calibrated HEX code swatches and physical tone fidelity guarantees.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">
                  {language === 'bn' ? 'সারা বাংলাদেশে দ্রুত ডেলিভারি' : 'Express Delivery across BD'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'bn' ? 'ঢাকা, চট্টগ্রামসহ ৬৪ জেলায় দ্রুত ক্যাশ অন ডেলিভারি সুবিধা।' : 'Fast courier across all 64 districts in Bangladesh with live tracking.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400 shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">
                  {language === 'bn' ? '১০০% বিশ্বস্ত ও ভেরিফায়েড সেলার' : '100% Verified Sellers'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'bn' ? 'সান চয়েস বিডি গ্যারান্টি ও ক্রেতা সুরক্ষা ব্যবস্থা।' : 'Direct buyer protection, verified merchants, and escrow safety.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400 shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">
                  {language === 'bn' ? '৭ দিনের সহজ রিটার্ন নীতি' : '7-Day Easy Return'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'bn' ? 'সহজ রিটার্ন এবং তাত্ক্ষণিক রিফান্ড সুবিধা।' : 'Hassle-free return policy with swift instant refund support.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hex Bar Ticker */}
      <div className="bg-slate-950/90 py-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-slate-200 font-semibold">{t('explorePalettes')}:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {curatedHexList.map((item) => (
              <button
                key={item.hex}
                onClick={() => {
                  setSelectedColorHex(item.hex);
                  setActiveView('shop');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500 text-[11px] font-mono transition-colors text-slate-300 hover:text-white cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full border border-slate-600" style={{ backgroundColor: item.hex }} />
                <span>{item.hex}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sun className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                SUN CHOICE BD
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {language === 'bn' 
                ? 'সান চয়েস বিডি বাংলাদেশের অন্যতম আধুনিক ই-কমার্স প্ল্যাটফর্ম। ইলেকট্রনিক্স, ফ্যাশন, গ্যাজেট এবং লাইফস্টাইল পণ্যে সঠিক কালার কোড ও সেরা অফার।' 
                : 'Sun Choice BD is Bangladesh’s premier modern marketplace connecting verified sellers and discerning buyers with precision color codes, BDT currency, and reliable doorstep delivery.'}
            </p>
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {language === 'bn' ? 'অফার ও নিউজলেটার সাবস্ক্রাইব করুন' : 'Subscribe to Offers & Deals'}
              </div>
              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  addToast(
                    language === 'bn' ? 'সাবস্ক্রিপশন সম্পন্ন!' : 'Subscribed!', 
                    language === 'bn' ? 'সান চয়েস বিডি অফার আপনার ইমেইলে পাঠানো হবে।' : 'Welcome to Sun Choice BD newsletter.'
                  ); 
                }} 
                className="flex gap-2 max-w-sm"
              >
                <input
                  type="email"
                  placeholder={language === 'bn' ? 'আপনার ইমেইল দিন' : 'Enter your email'}
                  required
                  className="bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 px-3.5 py-2 rounded-xl text-xs flex-1 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'যুক্ত হোন' : 'Join'}
                </button>
              </form>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4">
              {language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Categories'}
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => { setSelectedCategory('electronics'); setActiveView('shop'); }} className="hover:text-amber-400 transition-colors">
                  {t('cat_electronics')}
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('fashion'); setActiveView('shop'); }} className="hover:text-amber-400 transition-colors">
                  {t('cat_fashion')}
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('home'); setActiveView('shop'); }} className="hover:text-amber-400 transition-colors">
                  {t('cat_home')}
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('beauty'); setActiveView('shop'); }} className="hover:text-amber-400 transition-colors">
                  {t('cat_beauty')}
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('digital'); setActiveView('shop'); }} className="hover:text-amber-400 transition-colors">
                  {t('cat_digital')}
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('art'); setActiveView('shop'); }} className="hover:text-amber-400 transition-colors">
                  {t('cat_art')}
                </button>
              </li>
            </ul>
          </div>

          {/* Seller & Platform */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4">
              {language === 'bn' ? 'সেলার ও প্যানেল' : 'Merchant & Portal'}
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveView('seller-portal')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>{t('sellerPortal')}</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-400" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('color-hub')} className="hover:text-amber-400 transition-colors">
                  {t('colorStudio')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('admin')} className="hover:text-amber-400 transition-colors">
                  {t('adminDashboard')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('orders')} className="hover:text-amber-400 transition-colors">
                  {t('orderTracking')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('wishlist')} className="hover:text-amber-400 transition-colors">
                  {t('wishlist')}
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Payment */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4">
              {language === 'bn' ? 'পেমেন্ট ও নিরাপত্তা' : 'Payment & Trust'}
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'বিকাশ, নগদ ও রকেট পেমেন্ট' : 'bKash, Nagad & Rocket'}</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'Cash on Delivery (COD)'}</span>
              </li>
              <li>{language === 'bn' ? '১০০% সিকিউর এসএসএল পেমেন্ট' : '100% Secure SSL Payment'}</li>
              <li>{language === 'bn' ? '২৪/৭ কাস্টমার সাপোর্ট' : '24/7 Dedicated Support'}</li>
              <li>{language === 'bn' ? 'গোপনীয়তা ও শর্তাবলী' : 'Privacy & Terms of Service'}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Sun Choice BD (সান চয়েস বিডি). All rights reserved.
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] flex-wrap">
            <span className="px-2 py-0.5 rounded bg-pink-900/60 text-pink-300 font-bold border border-pink-700/50">bKash</span>
            <span className="px-2 py-0.5 rounded bg-orange-900/60 text-orange-300 font-bold border border-orange-700/50">Nagad</span>
            <span className="px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 font-bold border border-purple-700/50">Rocket</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">VISA</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">MASTERCARD</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
