import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingBag, Check, Copy, Sparkles } from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { useCommerce } from '../../context/CommerceContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    setQuickViewProduct,
    setActiveView,
    formatPrice,
    addToast,
    language,
    t
  } = useCommerce();

  // Active color selected in card preview
  const [activeColor, setActiveColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [isHovered, setIsHovered] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const isFavorited = isInWishlist(product.id);

  // Active displayed image based on color swatch
  const currentImage = activeColor.previewImage || product.images[0];

  const discountPercent = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) 
    : 0;

  const handleCopyHex = (e: React.MouseEvent, hex: string) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    addToast(`HEX: ${hex}`, t('hexCopiedToast'), 'info');
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleCardClick = () => {
    setSelectedProduct(product);
    setActiveView('product-detail');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, activeColor, product.sizes ? product.sizes[0] : undefined, 1);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top badges bar */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
          {product.onSale && discountPercent > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-500 text-white shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.featured && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300 dark:text-slate-950" />
              {t('featured')}
            </span>
          )}
        </div>

        {/* Wishlist toggle */}
        <button
          id={`btn-wishlist-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`pointer-events-auto w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
            isFavorited
              ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-500 shadow-xs scale-105'
              : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-700 shadow-xs'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 transition-transform ${isFavorited ? 'fill-rose-500 scale-110' : ''}`} />
        </button>
      </div>

      {/* Product Image Area */}
      <div 
        onClick={handleCardClick}
        className="relative aspect-square w-full bg-slate-100/80 dark:bg-slate-800/80 cursor-pointer overflow-hidden"
      >
        <img
          src={currentImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Quick action overlay */}
        <div className="product-quick-actions absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
          <button
            id={`btn-quickview-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/95 dark:bg-slate-900/95 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs shadow-md backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200/50 dark:border-slate-700/50"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            <span>{t('quickView')}</span>
          </button>
          
          <button
            id={`btn-quickadd-${product.id}`}
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className="py-2.5 px-3.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white dark:text-slate-950 font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            title={t('addToCart')}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-300 dark:text-slate-950" />
            <span className="hidden sm:inline">{t('add')}</span>
          </button>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-800/40 px-2 py-0.5 rounded-md">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={handleCardClick}
            className="font-bold text-slate-900 dark:text-white text-sm sm:text-base line-clamp-1 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Color Swatches with HEX codes */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {t('color')}: <strong className="text-slate-800 dark:text-slate-200 font-normal">{activeColor.name}</strong>
            </span>
            <button
              onClick={(e) => handleCopyHex(e, activeColor.hex)}
              className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors group/hex cursor-pointer"
              title="Click to copy HEX code"
            >
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold">{activeColor.hex}</span>
              {copiedHex === activeColor.hex ? (
                <Check className="w-3 h-3 text-emerald-500" />
              ) : (
                <Copy className="w-3 h-3 opacity-60 group-hover/hex:opacity-100" />
              )}
            </button>
          </div>

          {/* Color swatch circles */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
            {product.colors.map((color) => {
              const isSelected = activeColor.hex === color.hex;
              return (
                <button
                  key={color.hex}
                  id={`swatch-${product.id}-${color.hex.replace('#', '')}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColor(color);
                  }}
                  className={`group/circle relative w-6 h-6 rounded-full transition-all flex items-center justify-center p-0.5 cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-amber-500 dark:ring-amber-400 ring-offset-2 dark:ring-offset-slate-900 scale-110'
                      : 'hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                  title={`${color.name} (${color.hex})`}
                >
                  <span
                    className="w-full h-full rounded-full border border-black/10 dark:border-white/10 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Price & Stock info */}
        <div className="pt-2 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-amber-400 font-mono">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {product.stock > 0 ? (
                product.stock <= 5 ? (
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">{t('onlyFewLeft', `Only ${product.stock} left in stock`)}</span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">{t('inStock')} ({product.stock})</span>
                )
              ) : (
                <span className="text-rose-500 font-semibold">{t('outOfStock')}</span>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">{t('soldBy')}</span>
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[90px] block">
              {product.seller.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

