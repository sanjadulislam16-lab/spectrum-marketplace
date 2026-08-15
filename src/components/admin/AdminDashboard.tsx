import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Palette, 
  Tag, 
  Settings, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  Check, 
  Search, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Eye, 
  RefreshCw,
  Sliders,
  X,
  ExternalLink
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { Product, ProductColor, ProductCategory, OrderStatus, ColorPreset } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    formatPrice,
    colorPresets,
    addColorPreset,
    coupons,
    announcement,
    setAnnouncement,
    setSelectedProduct,
    setActiveView,
    addToast
  } = useCommerce();

  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'products' | 'orders' | 'colors' | 'promos'>('analytics');
  
  // Product management states
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('electronics');
  const [newPrice, setNewPrice] = useState<number>(99);
  const [newComparePrice, setNewComparePrice] = useState<number>(129);
  const [newStock, setNewStock] = useState<number>(25);
  const [newTags, setNewTags] = useState('modern, premium, new');
  const [newImages, setNewImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
  ]);
  const [newColors, setNewColors] = useState<ProductColor[]>([
    { name: 'Obsidian Black', hex: '#0F172A', inStock: true },
    { name: 'Sapphire Blue', hex: '#2563EB', inStock: true }
  ]);
  const [tempColorName, setTempColorName] = useState('');
  const [tempColorHex, setTempColorHex] = useState('#6366F1');

  // Announcement bar edit
  const [bannerText, setBannerText] = useState(announcement.text);
  const [bannerBadge, setBannerBadge] = useState(announcement.badgeText);
  const [bannerBg, setBannerBg] = useState(announcement.bgHex);
  const [bannerTextHex, setBannerTextHex] = useState(announcement.textHex);
  const [bannerCode, setBannerCode] = useState(announcement.code || 'SPECTRUM15');

  // Color preset creator
  const [newPresetName, setNewPresetName] = useState('');
  const [newPresetDesc, setNewPresetDesc] = useState('');
  const [newPresetColors, setNewPresetColors] = useState<{ name: string; hex: string }[]>([
    { name: 'Accent One', hex: '#3B82F6' },
    { name: 'Accent Two', hex: '#EC4899' }
  ]);

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const totalItemsSold = orders.reduce((sum, ord) => sum + ord.items.reduce((s, it) => s + it.quantity, 0), 0);
  const totalInventoryCount = products.reduce((sum, p) => sum + p.stock, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  // Filtered admin products
  const adminFilteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSaveAnnouncement = () => {
    setAnnouncement({
      enabled: true,
      text: bannerText,
      badgeText: bannerBadge,
      code: bannerCode,
      bgHex: bannerBg,
      textHex: bannerTextHex
    });
    addToast('Announcement Bar Updated', 'Store live header configuration saved.');
  };

  const handleAddColorToNewProduct = () => {
    if (!tempColorName.trim()) return;
    setNewColors([...newColors, { name: tempColorName, hex: tempColorHex, inStock: true }]);
    setTempColorName('');
  };

  const handleRemoveColorFromNewProduct = (idx: number) => {
    setNewColors(newColors.filter((_, i) => i !== idx));
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addProduct({
      title: newTitle,
      subtitle: newSubtitle || 'Precision engineered product with custom color code variants.',
      description: newDescription || 'Crafted with premium materials and calibrated chromatic fidelity.',
      category: newCategory,
      price: Number(newPrice),
      compareAtPrice: newComparePrice ? Number(newComparePrice) : undefined,
      stock: Number(newStock),
      featured: true,
      onSale: Number(newComparePrice) > Number(newPrice),
      colors: newColors.length > 0 ? newColors : [{ name: 'Standard', hex: '#000000' }],
      tags: newTags.split(',').map((t) => t.trim()),
      images: newImages,
      specs: [
        { label: 'Category', value: newCategory.toUpperCase() },
        { label: 'Color Variants', value: `${newColors.length} Calibrated HEX Codes` },
        { label: 'Stock Level', value: `${newStock} Units Available` }
      ],
      seller: {
        id: 'seller-spectrum-official',
        name: 'Spectrum Official Store',
        rating: 5.0,
        salesCount: 1,
        verified: true
      }
    });

    setIsAddingProduct(false);
    // Reset form
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white">
              ADMIN CONTROL CENTER
            </span>
            <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM ACTIVE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Store Operations & Analytics
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('shop')}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Preview Live Shop
          </button>
          <button
            id="btn-admin-add-product"
            onClick={() => setIsAddingProduct(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200">
        {[
          { id: 'analytics', label: 'Analytics & Revenue', icon: BarChart3 },
          { id: 'products', label: `Inventory & Products (${products.length})`, icon: Package },
          { id: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'colors', label: 'Color Studio & Palettes', icon: Palette },
          { id: 'promos', label: 'Discounts & Banner Bar', icon: Tag },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ANALYTICS & REVENUE */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Metrics 4-Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Total Gross Sales</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {formatPrice(totalRevenue)}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.4% this month</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Total Orders Placed</span>
                <ShoppingBag className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {orders.length} Orders
              </div>
              <div className="text-[11px] text-slate-500">
                {totalItemsSold} product units dispatched
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Average Order Value</span>
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {formatPrice(avgOrderValue)}
              </div>
              <div className="text-[11px] text-indigo-600 font-semibold">
                High conversion basket rate
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Live Inventory Units</span>
                <Package className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {totalInventoryCount} Items
              </div>
              <div className="text-[11px] text-amber-600 font-semibold">
                Across {products.length} distinct listings
              </div>
            </div>
          </div>

          {/* SVG Sales Trend Spline Graph */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Monthly Sales Trajectory & Volume</h3>
                <p className="text-xs text-slate-500">Real-time revenue metrics across all chromatic color categories.</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                Current Period: 2026 Q3
              </span>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-64 w-full pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="revenueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="40" x2="800" y2="40" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="90" x2="800" y2="90" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="140" x2="800" y2="140" stroke="#F1F5F9" strokeWidth="1" />

                {/* Area Fill */}
                <path
                  d="M 50 160 Q 150 140, 250 110 T 450 70 T 650 45 T 750 30 L 750 180 L 50 180 Z"
                  fill="url(#revenueGrad)"
                />

                {/* Curve */}
                <path
                  d="M 50 160 Q 150 140, 250 110 T 450 70 T 650 45 T 750 30"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                {[
                  { x: 50, y: 160, label: 'May', val: '$1,200' },
                  { x: 190, y: 130, label: 'Jun', val: '$2,450' },
                  { x: 330, y: 95, label: 'Jul', val: '$4,100' },
                  { x: 470, y: 70, label: 'Aug', val: '$6,800' },
                  { x: 610, y: 48, label: 'Sep', val: '$8,400' },
                  { x: 750, y: 30, label: 'Current', val: '$11,290' },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="3" />
                    <text x={pt.x} y="195" textAnchor="middle" fontSize="11" fill="#64748B" fontWeight="600">
                      {pt.label}
                    </text>
                    <text x={pt.x} y={pt.y - 12} textAnchor="middle" fontSize="10" fill="#0F172A" fontWeight="700" fontFamily="monospace">
                      {pt.val}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Category Share & Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category breakdown */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Revenue by Department</h4>
              <div className="space-y-3">
                {[
                  { cat: 'Electronics & Audio', share: 42, color: '#4F46E5' },
                  { cat: 'Fashion & Apparel', share: 24, color: '#EC4899' },
                  { cat: 'Home & Living', share: 18, color: '#F59E0B' },
                  { cat: 'Beauty & Skincare', share: 10, color: '#10B981' },
                  { cat: 'Digital & Art', share: 6, color: '#8B5CF6' }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700">{item.cat}</span>
                      <span className="font-mono text-slate-900">{item.share}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.share}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top performing items */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Best Selling Chromatic Products</h4>
              <div className="divide-y divide-slate-100">
                {products.slice(0, 4).map((p) => (
                  <div key={p.id} className="py-2.5 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.title} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{p.title}</div>
                        <div className="text-[11px] text-slate-400">{p.reviewCount} customer purchases</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-indigo-600">{formatPrice(p.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVENTORY & PRODUCTS */}
      {activeAdminTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search title, category, hex..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700"
              >
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
                <option value="beauty">Beauty</option>
                <option value="sports">Sports</option>
                <option value="digital">Digital</option>
                <option value="art">Art</option>
              </select>
            </div>

            <button
              onClick={() => setIsAddingProduct(true)}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Listing</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock Level</th>
                    <th className="p-4">Color Swatches (HEX)</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {adminFilteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={prod.images[0]} alt={prod.title} className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                          <div>
                            <div className="font-bold text-slate-900 line-clamp-1">{prod.title}</div>
                            <div className="text-[10px] text-slate-400">ID: {prod.id}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="capitalize px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold text-[11px]">
                          {prod.category}
                        </span>
                      </td>

                      <td className="p-4 font-mono font-bold text-slate-900">
                        {formatPrice(prod.price)}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={prod.stock}
                            onChange={(e) => updateProduct(prod.id, { stock: Number(e.target.value) })}
                            className="w-16 px-2 py-1 border border-slate-200 rounded-lg font-mono text-center"
                          />
                          {prod.stock <= 5 ? (
                            <span className="text-[10px] font-bold text-rose-600">Low</span>
                          ) : (
                            <span className="text-[10px] font-semibold text-emerald-600">Healthy</span>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          {prod.colors.map((c, i) => (
                            <span
                              key={i}
                              className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                              style={{ backgroundColor: c.hex }}
                              title={`${c.name}: ${c.hex}`}
                            />
                          ))}
                          <span className="text-[10px] font-mono text-slate-400">({prod.colors.length})</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => updateProduct(prod.id, { featured: !prod.featured })}
                          className={`px-2 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                            prod.featured ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {prod.featured ? '★ Featured' : 'Standard'}
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedProduct(prod);
                              setActiveView('product-detail');
                            }}
                            className="p-1.5 text-slate-400 hover:text-slate-700"
                            title="Preview in Store"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER ORDERS */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Store Orders & Fulfillment Queue</h3>
            
            <div className="divide-y divide-slate-100">
              {orders.map((ord) => (
                <div key={ord.id} className="py-5 first:pt-0 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-slate-900">#{ord.orderNumber}</span>
                        <span className="text-xs text-slate-400">• {new Date(ord.date).toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Customer: <strong>{ord.shippingAddress.fullName}</strong> ({ord.shippingAddress.email})
                      </div>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-slate-900">{formatPrice(ord.totalAmount)}</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                          ord.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          ord.status === 'shipped' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                          ord.status === 'processing' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Items purchased */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl flex flex-wrap gap-4 text-xs">
                    {ord.items.map((it) => (
                      <div key={it.id} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: it.selectedColor.hex }} />
                        <span className="font-medium text-slate-800">{it.product.title}</span>
                        <span className="text-slate-500 font-mono">({it.selectedColor.name} • Qty {it.quantity})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COLOR STUDIO & PALETTES */}
      {activeAdminTab === 'colors' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base">Curated Marketplace Color Palettes</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Total Palettes: {colorPresets.length}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Manage color harmony presets that guide seller listing aesthetics and buyer search filters.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {colorPresets.map((preset) => (
                <div key={preset.id} className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
                  <div className="font-bold text-sm text-slate-100">{preset.name}</div>
                  <p className="text-[11px] text-slate-400">{preset.description}</p>
                  <div className="flex items-center gap-2 pt-1">
                    {preset.colors.map((c, i) => (
                      <div key={i} className="flex-1 text-center">
                        <div className="w-full h-8 rounded-lg shadow-sm mb-1" style={{ backgroundColor: c.hex }} />
                        <span className="text-[9px] font-mono text-slate-400 block truncate">{c.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PROMOTIONS & BANNER BAR */}
      {activeAdminTab === 'promos' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-200">
          {/* Announcement Bar Customizer */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-5">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Top Announcement Banner Configuration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Banner Announcement Text</label>
                <input
                  type="text"
                  value={bannerText}
                  onChange={(e) => setBannerText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={bannerBadge}
                    onChange={(e) => setBannerBadge(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Promo Code to Auto-Apply</label>
                  <input
                    type="text"
                    value={bannerCode}
                    onChange={(e) => setBannerCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono uppercase border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Color Code Selectors for banner */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Background HEX</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bannerBg}
                      onChange={(e) => setBannerBg(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={bannerBg}
                      onChange={(e) => setBannerBg(e.target.value)}
                      className="w-full px-2 py-1 text-xs font-mono border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Text HEX</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bannerTextHex}
                      onChange={(e) => setBannerTextHex(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={bannerTextHex}
                      onChange={(e) => setBannerTextHex(e.target.value)}
                      className="w-full px-2 py-1 text-xs font-mono border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Live Banner Preview:</label>
                <div 
                  style={{ backgroundColor: bannerBg, color: bannerTextHex }}
                  className="p-3 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2"
                >
                  <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] uppercase font-bold">{bannerBadge}</span>
                  <span>{bannerText}</span>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-900 font-mono font-bold text-[10px]">{bannerCode}</span>
                </div>
              </div>

              <button
                id="btn-save-announcement"
                onClick={handleSaveAnnouncement}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Save Announcement Settings
              </button>
            </div>
          </div>

          {/* Active Promo Codes list */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Active Store Promo Codes</h3>
            <div className="divide-y divide-slate-100">
              {coupons.map((c) => (
                <div key={c.code} className="py-3 first:pt-0 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-mono font-bold text-slate-900 text-sm">{c.code}</div>
                    <div className="text-slate-500">{c.description}</div>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold">
                    {c.active ? 'ACTIVE' : 'DISABLED'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Create New Chromatic Listing</h3>
                <p className="text-xs text-slate-500">Provide details, pricing, and precision color HEX codes.</p>
              </div>
              <button onClick={() => setIsAddingProduct(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Zenith Wireless Studio Earbuds"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Living</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                    <option value="digital">Digital Assets</option>
                    <option value="art">Art & Prints</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              {/* Color Code Manager */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Product Color Codes & Swatches
                </label>
                <div className="flex flex-wrap gap-2">
                  {newColors.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-xs">
                      <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                      <span className="font-semibold text-slate-800">{c.name}</span>
                      <span className="font-mono text-[10px] text-slate-500">({c.hex})</span>
                      <button type="button" onClick={() => handleRemoveColorFromNewProduct(idx)} className="text-slate-400 hover:text-rose-500 ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Color Name (e.g. Amber Gold)"
                    value={tempColorName}
                    onChange={(e) => setTempColorName(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                  <input
                    type="color"
                    value={tempColorHex}
                    onChange={(e) => setTempColorHex(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={tempColorHex}
                    onChange={(e) => setTempColorHex(e.target.value)}
                    className="w-20 px-2 py-1 text-xs font-mono bg-white border border-slate-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleAddColorToNewProduct}
                    className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
                  >
                    Add Swatch
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe specifications, acoustics, materials..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md"
                >
                  Publish Listing to Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
