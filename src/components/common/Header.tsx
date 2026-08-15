import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Globe2,
  Heart,
  Moon,
  Package,
  Palette,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Sun,
  UserRound,
  X
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { ProductCategory, Currency } from '../../types';

type Role = 'buyer' | 'seller' | 'admin';

const ROLE_COPY: Record<Role, { label: string; short: string; description: string }> = {
  buyer: { label: 'Buyer', short: 'ক্রেতা', description: 'Discover and order products' },
  seller: { label: 'Seller', short: 'সেলার', description: 'List products and grow sales' },
  admin: { label: 'Admin', short: 'অ্যাডমিন', description: 'Manage the marketplace' }
};

const categories: { id: ProductCategory; label: string; labelBn: string }[] = [
  { id: 'all', label: 'All products', labelBn: 'সকল পণ্য' },
  { id: 'electronics', label: 'Electronics', labelBn: 'ইলেকট্রনিক্স' },
  { id: 'fashion', label: 'Fashion', labelBn: 'ফ্যাশন' },
  { id: 'home', label: 'Home & living', labelBn: 'হোম ও লিভিং' },
  { id: 'beauty', label: 'Beauty', labelBn: 'বিউটি' },
  { id: 'sports', label: 'Sports', labelBn: 'স্পোর্টস' },
  { id: 'digital', label: 'Digital', labelBn: 'ডিজিটাল' },
  { id: 'art', label: 'Art & prints', labelBn: 'আর্ট' }
];

const currencies: { code: Currency; label: string; symbol: string }[] = [
  { code: 'BDT', label: 'Bangladeshi Taka', symbol: '৳' },
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'GBP', label: 'British Pound', symbol: '£' },
  { code: 'JPY', label: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', label: 'Canadian Dollar', symbol: 'CA$' }
];

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartTotalCount,
    setIsCartOpen,
    wishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedColorHex,
    setSelectedColorHex,
    currency,
    setCurrency,
    announcement,
    applyCoupon,
    filteredProducts,
    setSelectedProduct,
    theme,
    toggleTheme,
    language,
    setLanguage,
    t
  } = useCommerce();

  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentRole: Role = activeView === 'admin' ? 'admin' : activeView === 'seller-portal' ? 'seller' : 'buyer';
  const roleLabel = language === 'bn' ? ROLE_COPY[currentRole].short : ROLE_COPY[currentRole].label;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement !== searchInputRef.current) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        setIsSearchFocused(false);
        setIsCurrencyOpen(false);
        setIsLanguageOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const switchRole = (role: Role) => {
    if (role === 'buyer') {
      setActiveView('shop');
      setSelectedCategory('all');
    } else if (role === 'seller') {
      setActiveView('seller-portal');
    } else {
      setActiveView('admin');
    }
  };

  return (
    <header className="site-header">
      {announcement.enabled && (
        <div id="announcement-bar" className="announcement-bar">
          <div className="container announcement-inner">
            <div className="announcement-copy">
              <span className="announcement-kicker"><Sparkles className="h-3 w-3" /> {announcement.badgeText}</span>
              <span>{language === 'bn' && announcement.textBn ? announcement.textBn : announcement.text}</span>
            </div>
            {announcement.code && (
              <button id="btn-announcement-copy-code" onClick={() => applyCoupon(announcement.code!)} className="announcement-code">
                {announcement.code}<span>{t('apply')}</span>
              </button>
            )}
          </div>
        </div>
      )}

      <div className="container header-main">
        <button
          id="brand-logo-btn"
          className="brand-mark"
          onClick={() => {
            setActiveView('shop');
            setSelectedCategory('all');
            setSelectedColorHex(null);
          }}
          aria-label="Open buyer storefront"
        >
          <span className="brand-orbit"><span className="brand-orbit-core"><Sun className="h-5 w-5" /></span></span>
          <span className="brand-copy">
            <span className="brand-name">SPECTRUM<span className="brand-dot">.</span></span>
            <span className="brand-caption">SUN CHOICE BD · {language === 'bn' ? 'আধুনিক মার্কেটপ্লেস' : 'modern marketplace'}</span>
          </span>
        </button>

        <div className="search-shell">
          <Search className="search-icon h-4 w-4" />
          <input
            ref={searchInputRef}
            id="search-input-desktop"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              if (activeView !== 'shop') setActiveView('shop');
            }}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 160)}
            placeholder={language === 'bn' ? 'পণ্য, কালার বা ক্যাটাগরি খুঁজুন...' : 'Search products, colors, or categories...'}
            className="search-input"
          />
          {searchQuery ? (
            <button id="btn-clear-search" className="search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search"><X className="h-4 w-4" /></button>
          ) : (
            <span className="search-shortcut">/</span>
          )}
          {isSearchFocused && searchQuery.trim() && (
            <div className="search-results-popover">
              <div className="search-results-heading">{language === 'bn' ? 'ম্যাচিং পণ্য' : 'Matching products'} <span>{filteredProducts.length}</span></div>
              {filteredProducts.slice(0, 5).map((product) => (
                <button
                  key={product.id}
                  className="search-result-row"
                  onMouseDown={() => {
                    setSelectedProduct(product);
                    setActiveView('product-detail');
                    setIsSearchFocused(false);
                  }}
                >
                  <img src={product.images[0]} alt={product.title} />
                  <span className="min-w-0 flex-1 text-left"><strong>{product.title}</strong><small>{product.category} · {currency === 'BDT' ? `৳${Math.round(product.price * 120).toLocaleString('en-IN')}` : `$${product.price.toFixed(2)}`}</small></span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </button>
              ))}
              {filteredProducts.length === 0 && <div className="search-empty">{t('noProductsFound')}</div>}
            </div>
          )}
        </div>

        <div className="header-actions">
          <button id="btn-theme-toggle" onClick={toggleTheme} className="icon-button" title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="menu-wrap">
            <button id="btn-language-selector" onClick={() => { setIsLanguageOpen((value) => !value); setIsCurrencyOpen(false); }} className="compact-control" title="Change language"><Globe2 className="h-3.5 w-3.5" /><span>{language === 'bn' ? 'বাংলা' : 'EN'}</span><ChevronDown className="h-3 w-3" /></button>
            {isLanguageOpen && <div className="menu-popover"><button onClick={() => { setLanguage('bn'); setIsLanguageOpen(false); }}>বাংলা {language === 'bn' && '✓'}</button><button onClick={() => { setLanguage('en'); setIsLanguageOpen(false); }}>English {language === 'en' && '✓'}</button></div>}
          </div>
          <div className="menu-wrap hidden sm:block">
            <button id="btn-currency-selector" onClick={() => { setIsCurrencyOpen((value) => !value); setIsLanguageOpen(false); }} className="compact-control" title="Change currency"><span className="font-mono">{currency === 'BDT' ? '৳' : currency}</span><ChevronDown className="h-3 w-3" /></button>
            {isCurrencyOpen && <div className="menu-popover currency-menu">{currencies.map((item) => <button key={item.code} onClick={() => { setCurrency(item.code); setIsCurrencyOpen(false); }}><span><b>{item.symbol}</b> {item.code}</span>{currency === item.code && '✓'}</button>)}</div>}
          </div>
          <button id="nav-btn-wishlist" onClick={() => setActiveView('wishlist')} className={`icon-button counter-button ${activeView === 'wishlist' ? 'is-active' : ''}`} title={t('wishlist')}><Heart className="h-4 w-4" />{wishlist.length > 0 && <span>{wishlist.length}</span>}</button>
          <button id="nav-btn-orders" onClick={() => setActiveView('orders')} className={`icon-button hidden sm:inline-flex ${activeView === 'orders' ? 'is-active' : ''}`} title={t('myOrders')}><Package className="h-4 w-4" /></button>
          <button id="nav-btn-cart" onClick={() => setIsCartOpen(true)} className="cart-button"><ShoppingBag className="h-4 w-4" /><span className="hidden sm:inline">{language === 'bn' ? 'ব্যাগ' : 'Bag'}</span><b>{cartTotalCount}</b></button>
        </div>
      </div>

      <div className="container role-row" aria-label="Select workspace">
        <div className="role-intro"><UserRound className="h-3.5 w-3.5" /><span>{language === 'bn' ? 'আপনি এখন' : 'You are in'}</span><strong>{roleLabel}</strong></div>
        <div className="role-switcher">
          {(['buyer', 'seller', 'admin'] as Role[]).map((role) => {
            const isActive = role === currentRole;
            const Icon = role === 'buyer' ? UserRound : role === 'seller' ? Store : ShieldCheck;
            return <button key={role} id={`role-switch-${role}`} onClick={() => switchRole(role)} className={`role-option ${isActive ? `is-active role-${role}` : ''}`} title={ROLE_COPY[role].description}><Icon className="h-3.5 w-3.5" /><span>{language === 'bn' ? ROLE_COPY[role].short : ROLE_COPY[role].label}</span></button>;
          })}
        </div>
        <div className="role-utility"><button id="nav-btn-color-hub" onClick={() => setActiveView('color-hub')} className={`utility-link ${activeView === 'color-hub' ? 'is-active' : ''}`}><Palette className="h-3.5 w-3.5" />{language === 'bn' ? 'কালার স্টুডিও' : 'Color studio'}</button><button id="nav-btn-sell-portal" onClick={() => switchRole('seller')} className="utility-link"><Store className="h-3.5 w-3.5" />{language === 'bn' ? 'পণ্য বিক্রি করুন' : 'Start selling'}</button></div>
      </div>

      <div className="container category-row">
        {categories.map((category) => {
          const active = selectedCategory === category.id && activeView === 'shop';
          return <button key={category.id} id={`cat-nav-btn-${category.id}`} onClick={() => { setSelectedCategory(category.id); setActiveView('shop'); }} className={`category-pill ${active ? 'is-active' : ''}`}>{language === 'bn' ? category.labelBn : category.label}</button>;
        })}
        {selectedColorHex && <span className="hex-filter-chip"><span style={{ backgroundColor: selectedColorHex }} />{selectedColorHex}<button id="btn-remove-color-filter" onClick={() => setSelectedColorHex(null)} aria-label="Remove color filter"><X className="h-3 w-3" /></button></span>}
      </div>
    </header>
  );
};
