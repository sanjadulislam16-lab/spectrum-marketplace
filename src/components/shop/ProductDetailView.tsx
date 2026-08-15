import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingBag, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Copy, 
  Sparkles, 
  Palette, 
  Info, 
  UserCheck, 
  MessageSquare,
  ThumbsUp
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { ProductColor, ProductReview } from '../../types';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    setActiveView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setIsCartOpen,
    products,
    updateProduct,
    addToast
  } = useCommerce();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600 mb-4">No product selected.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(selectedProduct.colors[0] || { name: 'Standard', hex: '#000000' });
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    selectedProduct.sizes ? selectedProduct.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [copiedHex, setCopiedHex] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'color-theory'>('specs');

  // New review form states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const isFavorited = isInWishlist(selectedProduct.id);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(true);
    addToast(`Copied ${hex}`, 'HEX color code saved to clipboard', 'info');
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedColor, selectedSize, quantity);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link Copied', 'Product link copied to clipboard', 'info');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReview = {
      id: 'rev-' + Date.now(),
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment,
      verifiedPurchase: true
    };

    const updatedReviews = [newRev, ...selectedProduct.reviews];
    const avgRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;

    updateProduct(selectedProduct.id, {
      reviews: updatedReviews,
      reviewCount: updatedReviews.length,
      rating: Number(avgRating.toFixed(2))
    });

    setNewReviewAuthor('');
    setNewReviewComment('');
    setShowReviewForm(false);
    addToast('Review Posted!', 'Thank you for your feedback.', 'success');
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.featured))
    .slice(0, 4);

  // Active displayed main image
  const displayImage = selectedProduct.images[activeImageIdx] || selectedProduct.images[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button & breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-to-shop"
          onClick={() => setActiveView('shop')}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Share Product"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleWishlist(selectedProduct.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isFavorited ? 'bg-rose-50 border-rose-200 text-rose-500' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main product overview grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 w-full bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md">
            <img
              src={displayImage}
              alt={selectedProduct.title}
              className="w-full h-full object-cover object-center"
            />
            {selectedProduct.onSale && (
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-black bg-rose-500 text-white shadow-md">
                SALE ACTIVE
              </div>
            )}

            {/* Selected color pill on top of image */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-3 shadow-lg border border-white/60">
              <span className="w-4 h-4 rounded-full border border-black/20 shadow-inner" style={{ backgroundColor: selectedColor.hex }} />
              <div>
                <div className="text-[11px] font-bold text-slate-800">{selectedColor.name}</div>
                <div className="text-[10px] font-mono text-slate-500">{selectedColor.hex}</div>
              </div>
            </div>
          </div>

          {/* Thumbnail list */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {selectedProduct.images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIdx === idx
                    ? 'border-indigo-600 ring-2 ring-indigo-200 scale-105'
                    : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Buying Controls & Specs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg">
                {selectedProduct.category}
              </span>
              <div className="flex items-center gap-1.5 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-extrabold text-slate-900 text-sm">{selectedProduct.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-400">({selectedProduct.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {selectedProduct.title}
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
              {selectedProduct.subtitle}
            </p>
          </div>

          {/* Price & Stock info */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 font-mono">
                {formatPrice(selectedProduct.price)}
              </span>
              {selectedProduct.compareAtPrice && (
                <span className="text-sm text-slate-400 line-through font-mono">
                  {formatPrice(selectedProduct.compareAtPrice)}
                </span>
              )}
            </div>
            <div>
              {selectedProduct.stock > 0 ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                  <Check className="w-3.5 h-3.5" />
                  In Stock ({selectedProduct.stock})
                </span>
              ) : (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                  Sold Out
                </span>
              )}
            </div>
          </div>

          {/* Precision Color Codes Selector */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Color Swatch: <span className="text-indigo-600 font-extrabold">{selectedColor.name}</span>
                </span>
              </div>

              {/* Copy Hex Code */}
              <button
                onClick={() => handleCopyHex(selectedColor.hex)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold text-slate-700 transition-colors"
                title="Click to copy HEX value"
              >
                <span>{selectedColor.hex}</span>
                {copiedHex ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400" />
                )}
              </button>
            </div>

            {/* Color circles */}
            <div className="flex items-center gap-3 flex-wrap">
              {selectedProduct.colors.map((color) => {
                const isSelected = selectedColor.hex === color.hex;
                return (
                  <button
                    key={color.hex}
                    onClick={() => {
                      setSelectedColor(color);
                      if (color.previewImage) {
                        const imgIdx = selectedProduct.images.indexOf(color.previewImage);
                        if (imgIdx !== -1) setActiveImageIdx(imgIdx);
                      }
                    }}
                    className={`relative flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all ${
                      isSelected
                        ? 'border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50/40'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-black/15 shadow-xs shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-semibold text-slate-800">{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sizes (if available) */}
          {selectedProduct.sizes && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Select Variant / Size</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {selectedProduct.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
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

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-slate-200 rounded-2xl bg-slate-50 p-1.5 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-xl bg-white text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center shadow-xs"
                >
                  -
                </button>
                <span className="w-12 text-center font-mono font-bold text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-xl bg-white text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center shadow-xs"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                id="btn-product-add-to-bag"
                onClick={handleAddToCart}
                disabled={selectedProduct.stock <= 0}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-300" />
                <span>Add to Bag</span>
              </button>
            </div>

            {/* Instant Buy Now */}
            <button
              id="btn-product-buy-now"
              onClick={handleBuyNow}
              disabled={selectedProduct.stock <= 0}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Instant Checkout • {formatPrice(selectedProduct.price * quantity)}</span>
            </button>
          </div>

          {/* Seller Profile Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shadow-xs">
                {selectedProduct.seller.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">{selectedProduct.seller.name}</span>
                  {selectedProduct.seller.verified && (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <UserCheck className="w-3 h-3" />
                      Verified Merchant
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500">
                  ★ {selectedProduct.seller.rating} • {selectedProduct.seller.salesCount.toLocaleString()} products sold
                </div>
              </div>
            </div>

            <button 
              onClick={() => addToast('Contact Seller', 'Message window initialized with ' + selectedProduct.seller.name, 'info')}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 pt-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-500" />
              <span>Carbon-Neutral Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-indigo-500" />
              <span>30-Day Guaranteed Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Direct Escrow Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-500" />
              <span>Calibrated HEX Swatches</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Customer Reviews & Color Studio */}
      <div className="pt-10 border-t border-slate-200">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 text-sm font-bold tracking-tight transition-colors relative cursor-pointer ${
              activeTab === 'specs' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Technical Specifications
            {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 text-sm font-bold tracking-tight transition-colors relative cursor-pointer ${
              activeTab === 'reviews' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Verified Buyer Reviews ({selectedProduct.reviews.length})
            {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
          </button>

          <button
            onClick={() => setActiveTab('color-theory')}
            className={`pb-2 text-sm font-bold tracking-tight transition-colors relative cursor-pointer ${
              activeTab === 'color-theory' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Color Theory & HEX Palettes
            {activeTab === 'color-theory' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
          </button>
        </div>

        {/* Tab 1: Specs */}
        {activeTab === 'specs' && (
          <div className="py-6 max-w-3xl space-y-6">
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedProduct.description}
            </p>
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden bg-white">
              {selectedProduct.specs.map((spec, i) => (
                <div key={i} className="grid grid-cols-3 p-3.5 text-xs">
                  <span className="font-bold text-slate-500">{spec.label}</span>
                  <span className="col-span-2 text-slate-800 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Reviews */}
        {activeTab === 'reviews' && (
          <div className="py-6 max-w-4xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <div>
                <div className="text-3xl font-black text-slate-900 flex items-center gap-2">
                  <span>{selectedProduct.rating.toFixed(1)}</span>
                  <span className="text-sm text-slate-400 font-normal">/ 5.0</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-1">Based on {selectedProduct.reviewCount} customer ratings</p>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
              >
                {showReviewForm ? 'Close Review Form' : 'Write a Review'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleAddReview} className="p-6 rounded-3xl bg-white border border-indigo-200 shadow-md space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Share Your Experience with {selectedProduct.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Jordan Miller"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Rating</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 - Flawless)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 - Great)</option>
                      <option value={3}>⭐⭐⭐ (3 - Average)</option>
                      <option value={2}>⭐⭐ (2 - Below expectation)</option>
                      <option value={1}>⭐ (1 - Disappointed)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Describe build quality, color fidelity, performance..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs"
                >
                  Submit Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {selectedProduct.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{rev.author}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">{rev.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed pt-1">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Color Theory */}
        {activeTab === 'color-theory' && (
          <div className="py-6 max-w-3xl space-y-6">
            <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-sm">Product Color System</h4>
                </div>
                <span className="text-xs font-mono text-slate-400">WCAG AA Compliant</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProduct.colors.map((c) => (
                  <div key={c.hex} className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl border border-white/20 shadow-md" style={{ backgroundColor: c.hex }} />
                      <div>
                        <div className="text-xs font-bold text-white">{c.name}</div>
                        <div className="text-[11px] font-mono text-indigo-400">{c.hex}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyHex(c.hex)}
                      className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-[11px] font-mono text-slate-200 transition-colors"
                    >
                      Copy HEX
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Complementary Items You Might Like
            </h3>
            <button
              onClick={() => setActiveView('shop')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedProduct(item);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-slate-100 overflow-hidden">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <div className="text-[10px] uppercase font-bold text-indigo-600">{item.category}</div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">{item.title}</h4>
                  <div className="text-xs font-mono font-bold text-slate-900 mt-2">{formatPrice(item.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
