import React, { useState } from 'react';
import { 
  Sparkles, 
  SlidersHorizontal, 
  Grid, 
  LayoutGrid, 
  ArrowUpDown, 
  Search, 
  X, 
  ShieldCheck, 
  Truck, 
  Palette, 
  RotateCcw, 
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { FilterSidebar } from './FilterSidebar';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../../types';

export const ShopView: React.FC = () => {
  const {
    filteredProducts,
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedColorHex,
    setSelectedColorHex,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    onlyInStock,
    setOnlyInStock,
    onlyOnSale,
    setOnlyOnSale,
    ratingFilter,
    setRatingFilter,
    resetFilters,
    setActiveView,
    formatPrice
  } = useCommerce();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  // Active filter count
  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedColorHex ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlyOnSale ? 1 : 0) +
    (ratingFilter > 0 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);

  // Categories list for top fast-scroll bar
  const categoriesList: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Catalog' },
    { id: 'electronics', label: 'Electronics & Audio' },
    { id: 'fashion', label: 'Fashion & Apparel' },
    { id: 'home', label: 'Home & Living' },
    { id: 'beauty', label: 'Beauty & Wellness' },
    { id: 'sports', label: 'Sports & Active' },
    { id: 'digital', label: 'Digital Assets' },
    { id: 'art', label: 'Art & Prints' }
  ];

  // Featured hero products
  const heroFeaturedProduct = products.find((p) => p.featured) || products[0];

  return (
    <div className="space-y-8">
      {/* Hero Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative rounded-3xl bg-slate-950 text-white overflow-hidden shadow-2xl border border-slate-800">
          {/* Background Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Chromatic E-Commerce Engine</span>
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <span className="text-white font-mono">Calibrated HEX Codes</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
                Designed for precision aesthetic living.
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Discover modern electronics, bespoke apparel, sculptural home decor, and digital assets—each catalog item calibrated with authentic color codes and verified merchant quality.
              </p>

              {/* Fast Action CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="btn-hero-explore-colors"
                  onClick={() => setActiveView('colors')}
                  className="px-5 py-3 rounded-2xl bg-white text-slate-950 text-xs sm:text-sm font-bold shadow-lg hover:bg-slate-100 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Palette className="w-4 h-4 text-indigo-600" />
                  <span>Explore Color Palettes</span>
                </button>

                <button
                  id="btn-hero-sell-cta"
                  onClick={() => setActiveView('seller-portal')}
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold flex items-center gap-2 backdrop-blur-xs transition-all cursor-pointer"
                >
                  <span>Sell Your Products</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Live Color Swatches Ribbon */}
              <div className="pt-4 flex items-center gap-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Featured Swatches:</span>
                <div className="flex items-center gap-2">
                  {[
                    { name: 'Obsidian', hex: '#0F172A' },
                    { name: 'Titanium', hex: '#64748B' },
                    { name: 'Rose', hex: '#FB7185' },
                    { name: 'Amber', hex: '#F59E0B' },
                    { name: 'Emerald', hex: '#10B981' }
                  ].map((s) => (
                    <button
                      key={s.hex}
                      onClick={() => setSelectedColorHex(s.hex)}
                      className="group flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-all cursor-pointer"
                      title={`Filter by ${s.name} (${s.hex})`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.hex }} />
                      <span className="text-[11px] font-mono text-slate-300">{s.hex}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Featured Card Showcase */}
            {heroFeaturedProduct && (
              <div className="lg:col-span-5">
                <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-2xl space-y-4">
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950">
                    <img
                      src={heroFeaturedProduct.images[0]}
                      alt={heroFeaturedProduct.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-md">
                      FEATURED DROP
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="uppercase font-bold tracking-wider text-indigo-400">{heroFeaturedProduct.category}</span>
                      <span className="font-mono text-emerald-400 font-bold">★ {heroFeaturedProduct.rating}</span>
                    </div>
                    <h3 className="font-bold text-white text-base line-clamp-1">{heroFeaturedProduct.title}</h3>
                    <div className="flex items-baseline gap-2 font-mono">
                      <span className="text-xl font-black text-white">{formatPrice(heroFeaturedProduct.price)}</span>
                      {heroFeaturedProduct.compareAtPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(heroFeaturedProduct.compareAtPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Swatches in Featured Card */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5">
                      {heroFeaturedProduct.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs"
                          style={{ backgroundColor: c.hex }}
                          title={`${c.name} (${c.hex})`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        useCommerce().setSelectedProduct(heroFeaturedProduct);
                        setActiveView('product-detail');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Chromatic Precision</div>
              <div className="text-slate-500 text-[11px]">Zero surprise mismatch. Guaranteed HEX calibration.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Free Express Shipping</div>
              <div className="text-slate-500 text-[11px]">On orders over $100 with real-time milestone tracking.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Verified Seller Escrow</div>
              <div className="text-slate-500 text-[11px]">100% money-back guarantee with zero risk.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog View with Sidebar & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Fast Category Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200/80">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Discovery Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Left stats & mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            <div className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> of{' '}
              <strong className="text-slate-900 font-bold">{products.length}</strong> items
            </div>

            {/* Active filter badges */}
            {selectedColorHex && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-900 font-medium">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedColorHex }} />
                <span className="font-mono text-[11px]">{selectedColorHex}</span>
                <button onClick={() => setSelectedColorHex(null)} className="text-indigo-400 hover:text-indigo-700">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="hidden sm:flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Right Sort & Grid Density controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Sort selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* Grid density buttons */}
            <div className="hidden md:flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 rounded-lg transition-colors ${gridCols === 2 ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                title="2 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-lg transition-colors ${gridCols === 3 ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                title="3 Columns"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-lg transition-colors ${gridCols === 4 ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                title="4 Columns"
              >
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4 p-0.5">
                  <div className="bg-current rounded-xs" />
                  <div className="bg-current rounded-xs" />
                  <div className="bg-current rounded-xs" />
                  <div className="bg-current rounded-xs" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Catalog Content Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filter (3 cols) */}
          <div className={`lg:col-span-3 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar />
          </div>

          {/* Right Product Grid (9 cols) */}
          <div className="lg:col-span-9 space-y-8">
            {filteredProducts.length === 0 ? (
              <div className="p-12 sm:p-16 rounded-3xl bg-white border border-slate-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">No matching products found</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                    Try adjusting your color codes, price range sliders, or search keyword filters.
                  </p>
                </div>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div 
                className={`grid gap-6 ${
                  gridCols === 2 ? 'grid-cols-1 sm:grid-cols-2' :
                  gridCols === 4 ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4' :
                  'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
