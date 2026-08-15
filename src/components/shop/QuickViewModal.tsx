import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Check, Copy, ArrowRight } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { ProductColor } from '../../types';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setSelectedProduct,
    setActiveView,
    addToast
  } = useCommerce();

  if (!quickViewProduct) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(quickViewProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    quickViewProduct.sizes ? quickViewProduct.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [copiedHex, setCopiedHex] = useState(false);

  const isFavorited = isInWishlist(quickViewProduct.id);
  const currentImage = selectedColor.previewImage || quickViewProduct.images[0];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(true);
    addToast(`Copied ${hex}`, 'Hex code saved to clipboard', 'info');
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedColor, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    setSelectedProduct(quickViewProduct);
    setActiveView('product-detail');
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-quickview"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="relative bg-slate-100 aspect-square md:aspect-auto flex items-center justify-center p-6">
          <img
            src={currentImage}
            alt={quickViewProduct.title}
            className="w-full h-full object-cover rounded-2xl shadow-sm"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between text-xs border border-white/40 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: selectedColor.hex }} />
              <span className="font-semibold text-slate-800">{selectedColor.name}</span>
            </div>
            <span className="font-mono text-slate-500 font-bold">{selectedColor.hex}</span>
          </div>
        </div>

        {/* Right: Info & Controls */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold text-indigo-600 uppercase tracking-wider">{quickViewProduct.category}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800">{quickViewProduct.rating.toFixed(1)}</span>
                <span className="text-slate-400">({quickViewProduct.reviewCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
              {quickViewProduct.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {quickViewProduct.description}
            </p>

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-black text-slate-900 font-mono">
                {formatPrice(quickViewProduct.price)}
              </span>
              {quickViewProduct.compareAtPrice && (
                <span className="text-sm text-slate-400 line-through font-mono">
                  {formatPrice(quickViewProduct.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Color selector with Hex info */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">
                  Select Color: <span className="font-normal text-slate-600">{selectedColor.name}</span>
                </span>
                <button
                  onClick={() => handleCopyHex(selectedColor.hex)}
                  className="text-[11px] font-mono text-slate-500 hover:text-indigo-600 flex items-center gap-1"
                >
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 font-semibold">{selectedColor.hex}</span>
                  {copiedHex ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {quickViewProduct.colors.map((color) => {
                  const isSelected = selectedColor.hex === color.hex;
                  return (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-8 h-8 rounded-full transition-all flex items-center justify-center p-0.5 ${
                        isSelected ? 'ring-2 ring-indigo-600 ring-offset-2 scale-110' : 'hover:scale-105 opacity-80'
                      }`}
                      title={`${color.name} (${color.hex})`}
                    >
                      <span
                        className="w-full h-full rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizes (if available) */}
            {quickViewProduct.sizes && (
              <div className="mt-4">
                <span className="text-xs font-bold text-slate-800 block mb-2">Select Size:</span>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedSize === s
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-slate-200 rounded-2xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center shadow-xs"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono font-bold text-sm text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center shadow-xs"
                >
                  +
                </button>
              </div>

              {/* Add to bag button */}
              <button
                id="btn-quickview-add-to-bag"
                onClick={handleAdd}
                disabled={quickViewProduct.stock <= 0}
                className="flex-1 py-3 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-300" />
                <span>Add to Bag • {formatPrice(quickViewProduct.price * quantity)}</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-2xl border transition-colors ${
                  isFavorited ? 'bg-rose-50 border-rose-200 text-rose-500' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* View Full Product Page link */}
            <button
              onClick={handleViewFullDetails}
              className="w-full text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 py-1 flex items-center justify-center gap-1 group"
            >
              <span>View Full Specs, Reviews & Seller Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
