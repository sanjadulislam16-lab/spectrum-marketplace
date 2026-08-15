import React, { useState } from 'react';
import { 
  PlusCircle, 
  Store, 
  Upload, 
  Palette, 
  Check, 
  Trash2, 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  Package, 
  Eye,
  ArrowRight
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { ProductColor, ProductCategory } from '../../types';

export const SellerPortal: React.FC = () => {
  const { 
    addProduct, 
    products, 
    formatPrice, 
    setActiveView, 
    setSelectedProduct, 
    addToast 
  } = useCommerce();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProductCategory>('fashion');
  const [price, setPrice] = useState<number>(85);
  const [compareAtPrice, setCompareAtPrice] = useState<number>(110);
  const [stock, setStock] = useState<number>(20);
  const [tags, setTags] = useState('artisan, handmade, premium');
  const [sellerName, setSellerName] = useState('Studio Chroma Craft');

  // Images state
  const [imageUrls, setImageUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'
  ]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Colors state with precision HEX codes
  const [colors, setColors] = useState<ProductColor[]>([
    { name: 'Midnight Obsidian', hex: '#0F172A', inStock: true },
    { name: 'Warm Terracotta', hex: '#EA580C', inStock: true }
  ]);
  const [colorNameInput, setColorNameInput] = useState('');
  const [colorHexInput, setColorHexInput] = useState('#2563EB');

  // Sample image gallery options for quick selection
  const imagePresets = [
    { label: 'Smart Device', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Apparel Hoodie', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Ceramic Decor', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Luxury Serum', url: 'https://images.unsplash.com/photo-1608248597359-00f074d3202e?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Art Print', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80' }
  ];

  const handleAddColor = () => {
    if (!colorNameInput.trim()) return;
    setColors([...colors, { name: colorNameInput, hex: colorHexInput, inStock: true }]);
    setColorNameInput('');
  };

  const handleRemoveColor = (idx: number) => {
    setColors(colors.filter((_, i) => i !== idx));
  };

  const handleAddImage = () => {
    if (!customImageUrl.trim()) return;
    setImageUrls([...imageUrls, customImageUrl]);
    setCustomImageUrl('');
  };

  const handlePublishListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProd = addProduct({
      title,
      subtitle: subtitle || 'Artisan product crafted with precision color code selection.',
      description: description || 'High-grade craftsmanship with verified color fidelity and secure escrow guarantee.',
      category,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      stock: Number(stock),
      featured: true,
      onSale: Number(compareAtPrice) > Number(price),
      colors: colors.length > 0 ? colors : [{ name: 'Standard', hex: '#000000' }],
      tags: tags.split(',').map((t) => t.trim()),
      images: imageUrls,
      specs: [
        { label: 'Merchant', value: sellerName },
        { label: 'Category', value: category.toUpperCase() },
        { label: 'Color Fidelity', value: 'Calibrated HEX Verified' },
        { label: 'Stock Guarantee', value: `${stock} Units Available` }
      ],
      seller: {
        id: 'seller-' + Date.now().toString(36),
        name: sellerName,
        rating: 5.0,
        salesCount: 1,
        verified: true
      }
    });

    setSelectedProduct(newProd);
    setActiveView('product-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Store className="w-3.5 h-3.5" />
            <span>SPECTRUM SELLER NETWORK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            List and Sell Your Products Globally
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Reach thousands of buyers seeking verified craftsmanship with precision color codes, automated shipping tags, and guaranteed seller escrow protection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 z-10">
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-center min-w-[120px]">
            <div className="text-xl font-black text-amber-400 font-mono">0%</div>
            <div className="text-[11px] text-slate-400">Listing Fees</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-center min-w-[120px]">
            <div className="text-xl font-black text-emerald-400 font-mono">Instant</div>
            <div className="text-[11px] text-slate-400">Escrow Payout</div>
          </div>
        </div>
      </div>

      {/* Listing Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Creation Form (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-extrabold text-slate-900">Create New Product Listing</h2>
            <p className="text-xs text-slate-500">All fields are calibrated for high buyer engagement and chromatic accuracy.</p>
          </div>

          <form onSubmit={handlePublishListing} className="space-y-5">
            {/* Title & Subtitle */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sculptural Ceramic Vase in Terracotta & Chalk"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Subtitle / Key Catchphrase</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Hand-thrown earthenware with matte mineral glaze"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Category & Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none"
                >
                  <option value="electronics">Electronics & Audio</option>
                  <option value="fashion">Fashion & Apparel</option>
                  <option value="home">Home & Living</option>
                  <option value="beauty">Beauty & Skincare</option>
                  <option value="sports">Sports & Fitness</option>
                  <option value="digital">Digital Assets</option>
                  <option value="art">Art & Prints</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Selling Price ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Compare Price (Optional)</label>
                <input
                  type="number"
                  step="0.01"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Color Swatches & Codes Studio */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-indigo-600" />
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Precision Color Codes & Swatches
                  </label>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">{colors.length} Variant(s)</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {colors.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: c.hex }} />
                    <span className="font-bold text-slate-800">{c.name}</span>
                    <span className="font-mono text-[10px] text-slate-500">{c.hex}</span>
                    <button type="button" onClick={() => handleRemoveColor(idx)} className="text-slate-400 hover:text-rose-600 ml-1">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Color Name (e.g. Cobalt Azure)"
                  value={colorNameInput}
                  onChange={(e) => setColorNameInput(e.target.value)}
                  className="flex-1 min-w-[140px] px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                />
                <input
                  type="color"
                  value={colorHexInput}
                  onChange={(e) => setColorHexInput(e.target.value)}
                  className="w-9 h-9 rounded-xl cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={colorHexInput}
                  onChange={(e) => setColorHexInput(e.target.value)}
                  className="w-24 px-2 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  + Add Swatch
                </button>
              </div>
            </div>

            {/* Photo Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">Product Imagery</label>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {imagePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrls([preset.url])}
                    className="p-1.5 rounded-xl border border-slate-200 hover:border-indigo-500 text-left shrink-0 bg-white group transition-all"
                  >
                    <img src={preset.url} alt={preset.label} className="w-16 h-16 rounded-lg object-cover" />
                    <span className="text-[10px] font-semibold text-slate-700 block text-center mt-1">{preset.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Or paste direct image URL (https://...)"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                >
                  Add URL
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Product Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the materials, design intention, warranty, and craftsmanship..."
                className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Merchant info & inventory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Merchant / Brand Name</label>
                <input
                  type="text"
                  required
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Initial Stock Level</label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            {/* Publish CTA */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Listing goes live immediately upon publication.</span>
              <button
                id="btn-publish-listing"
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Publish Item to Marketplace</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Card Preview (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Customer Card Preview</h3>
            
            {/* Card Mockup */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg p-4 space-y-3">
              <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden relative">
                <img
                  src={imageUrls[0] || imagePresets[0].url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-600 text-white">
                  NEW LISTING
                </span>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase text-indigo-600">{category}</div>
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{title || 'Your Product Title'}</h4>
                <div className="text-base font-black text-slate-900 font-mono mt-1">{formatPrice(price || 99)}</div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Color swatches:</span>
                <div className="flex items-center gap-1">
                  {colors.map((c, i) => (
                    <span key={i} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Seller tips */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Seller Quality Standard</span>
              </div>
              <p className="text-[11px] leading-relaxed text-indigo-800">
                Items with at least 2 distinct calibrated color codes receive 3x more buyer views on the Spectrum discovery grid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
