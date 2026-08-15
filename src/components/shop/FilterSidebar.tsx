import React from 'react';
import { SlidersHorizontal, RotateCcw, Star, Check, Palette } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { ProductCategory } from '../../types';

export const FilterSidebar: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedColorHex,
    setSelectedColorHex,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy,
    resetFilters,
    filteredProducts
  } = useCommerce();

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Categories', count: products.length },
    { id: 'electronics', label: 'Electronics & Tech', count: products.filter(p => p.category === 'electronics').length },
    { id: 'fashion', label: 'Fashion & Apparel', count: products.filter(p => p.category === 'fashion').length },
    { id: 'home', label: 'Home & Living', count: products.filter(p => p.category === 'home').length },
    { id: 'beauty', label: 'Beauty & Skincare', count: products.filter(p => p.category === 'beauty').length },
    { id: 'sports', label: 'Sports & Fitness', count: products.filter(p => p.category === 'sports').length },
    { id: 'digital', label: 'Digital & UI Assets', count: products.filter(p => p.category === 'digital').length },
    { id: 'art', label: 'Art & Prints', count: products.filter(p => p.category === 'art').length },
  ];

  // Extract all unique color swatches across current products
  const uniqueColorMap = new Map<string, { name: string; hex: string; count: number }>();
  products.forEach(p => {
    p.colors.forEach(c => {
      const key = c.hex.toLowerCase();
      if (!uniqueColorMap.has(key)) {
        uniqueColorMap.set(key, { name: c.name, hex: c.hex, count: 1 });
      } else {
        uniqueColorMap.get(key)!.count++;
      }
    });
  });
  const colorList = Array.from(uniqueColorMap.values());

  const ratings = [4.5, 4.0, 3.5, 3.0];

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedColorHex !== null || 
    priceRange[0] > 0 || 
    priceRange[1] < 500 || 
    minRating > 0 || 
    inStockOnly || 
    sortBy !== 'popular';

  return (
    <aside className="w-full bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 space-y-6 shadow-xs">
      {/* Title & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <span>Refine Catalog</span>
        </div>

        {hasActiveFilters && (
          <button
            id="btn-reset-all-filters"
            onClick={resetFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Sort selection */}
      <div>
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
          Sort By
        </label>
        <select
          id="select-sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="popular">Most Popular & Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">New Arrivals</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
          Categories
        </label>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/60'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-indigo-200/60 text-indigo-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Codes Swatch Matrix */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-indigo-500" />
            <span>Filter By Color Code</span>
          </label>
          {selectedColorHex && (
            <button
              onClick={() => setSelectedColorHex(null)}
              className="text-[11px] text-slate-400 hover:text-slate-600 underline"
            >
              Clear
            </button>
          )}
        </div>

        <p className="text-[11px] text-slate-500 mb-3">
          Select any verified HEX code to view matching product variants:
        </p>

        <div className="grid grid-cols-5 gap-2">
          {colorList.map((color) => {
            const isSelected = selectedColorHex?.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                id={`filter-color-${color.hex.replace('#', '')}`}
                onClick={() => {
                  setSelectedColorHex(isSelected ? null : color.hex);
                }}
                className={`group relative aspect-square rounded-xl p-1 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105 shadow-sm'
                    : 'hover:scale-105 border border-slate-200'
                }`}
                title={`${color.name} (${color.hex}) - ${color.count} item(s)`}
              >
                <span
                  className="w-full h-full rounded-lg shadow-inner flex items-center justify-center"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <Check className={`w-3.5 h-3.5 ${
                      // If color is very light, use dark check, else white
                      ['#ffffff', '#f8fafc', '#fef3c7', '#e2e8f0', '#cbd5e1'].includes(color.hex.toLowerCase())
                        ? 'text-slate-900'
                        : 'text-white'
                    }`} />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {selectedColorHex && (
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: selectedColorHex }} />
              <span className="font-mono font-bold text-slate-800">{selectedColorHex}</span>
            </div>
            <span className="text-[11px] text-indigo-600 font-semibold">Active Filter</span>
          </div>
        )}
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Price Range
          </label>
          <span className="text-xs font-mono font-bold text-indigo-600">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <input
          id="price-range-slider"
          type="range"
          min={0}
          max={500}
          step={10}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
          <span>$0</span>
          <span>$250</span>
          <span>$500+</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
          Minimum Rating
        </label>
        <div className="space-y-1">
          {ratings.map((r) => {
            const isSelected = minRating === r;
            return (
              <button
                key={r}
                id={`filter-rating-${r}`}
                onClick={() => setMinRating(isSelected ? 0 : r)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                  isSelected ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(r) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span>{r} & Up</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability toggle */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer py-1">
          <span className="text-xs font-semibold text-slate-700">In Stock Items Only</span>
          <input
            id="checkbox-in-stock-only"
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
          />
        </label>
      </div>

      {/* Results counter */}
      <div className="p-3 bg-slate-50 rounded-2xl text-center text-xs text-slate-600">
        Showing <strong>{filteredProducts.length}</strong> matching products
      </div>
    </aside>
  );
};
