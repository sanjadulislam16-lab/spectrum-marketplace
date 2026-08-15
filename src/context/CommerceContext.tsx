import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  ProductColor, 
  ProductCategory, 
  Currency, 
  Coupon, 
  ColorPreset, 
  ToastMessage, 
  OrderStatus,
  ShippingAddress 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_COLOR_PRESETS, 
  INITIAL_COUPONS, 
  INITIAL_ORDERS 
} from '../data/initialData';
import { translations, Language } from '../utils/translations';

export type AppView = 
  | 'shop' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'orders' 
  | 'wishlist' 
  | 'seller-portal' 
  | 'admin' 
  | 'color-hub';

export type ThemeMode = 'light' | 'dark';

interface AnnouncementConfig {
  enabled: boolean;
  text: string;
  textBn?: string;
  badgeText: string;
  bgHex: string;
  textHex: string;
  code?: string;
}

interface CommerceContextType {
  // Navigation & State
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  // Theme & Language
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.en, fallback?: string) => string;

  // Products
  products: Product[];
  filteredProducts: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount' | 'reviews'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Filters & Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  selectedColorHex: string | null;
  setSelectedColorHex: (hex: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (inStock: boolean) => void;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  setSortBy: (sort: 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest') => void;
  resetFilters: () => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: ProductColor, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Checkout & Orders
  orders: Order[];
  activeOrderConfirmation: Order | null;
  setActiveOrderConfirmation: (order: Order | null) => void;
  placeOrder: (orderData: {
    address: ShippingAddress;
    paymentMethod: 'card' | 'paypal' | 'apple_pay' | 'cod';
    paymentDetails?: { last4?: string; brand?: string };
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Coupons & Pricing
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  finalTotal: number;
  shippingFee: number;
  taxAmount: number;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;

  // Color Studio & Presets
  colorPresets: ColorPreset[];
  addColorPreset: (preset: Omit<ColorPreset, 'id'>) => void;

  // Announcements
  announcement: AnnouncementConfig;
  setAnnouncement: (config: AnnouncementConfig) => void;

  // Notifications
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; prefix: boolean; name: string }> = {
  BDT: { symbol: '৳', rate: 120, prefix: true, name: 'Bangladeshi Taka' },
  USD: { symbol: '$', rate: 1.0, prefix: true, name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.92, prefix: false, name: 'Euro' },
  GBP: { symbol: '£', rate: 0.79, prefix: true, name: 'British Pound' },
  JPY: { symbol: '¥', rate: 154.5, prefix: true, name: 'Japanese Yen' },
  CAD: { symbol: 'CA$', rate: 1.36, prefix: true, name: 'Canadian Dollar' }
};

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state with system preference fallback & localStorage
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('sun_choice_theme') as ThemeMode;
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Language state (default 'bn' or 'en')
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sun_choice_lang') as Language;
      return saved === 'en' || saved === 'bn' ? saved : 'bn';
    } catch {
      return 'bn';
    }
  });

  // Apply dark mode class to html element
  useEffect(() => {
    try {
      localStorage.setItem('sun_choice_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Persist language
  useEffect(() => {
    try {
      localStorage.setItem('sun_choice_lang', language);
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = (key: keyof typeof translations.en, fallback?: string): string => {
    const langDict = translations[language] || translations.en;
    const value = langDict[key];
    if (value !== undefined) return value;
    return translations.en[key] || fallback || String(key);
  };

  // LocalStorage initialization with safety
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('sun_choice_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('sun_choice_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sun_choice_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sun_choice_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [colorPresets, setColorPresets] = useState<ColorPreset[]>(() => {
    try {
      const saved = localStorage.getItem('sun_choice_color_presets');
      return saved ? JSON.parse(saved) : INITIAL_COLOR_PRESETS;
    } catch {
      return INITIAL_COLOR_PRESETS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [announcement, setAnnouncement] = useState<AnnouncementConfig>({
    enabled: true,
    text: 'Sun Choice BD Special: Enjoy 15% discount across Bangladesh with code',
    textBn: 'সান চয়েস বিডি স্পেশাল অফার: সারা দেশে ১৫% ছাড় পেতে কোড ব্যবহার করুন',
    badgeText: 'SUN CHOICE BD',
    code: 'SUN15',
    bgHex: '#0F172A',
    textHex: '#FFFFFF'
  });

  // UI Navigation states
  const [activeView, setActiveView] = useState<AppView>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeOrderConfirmation, setActiveOrderConfirmation] = useState<Order | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedColorHex, setSelectedColorHex] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('popular');

  // Currency (default BDT)
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('sun_choice_currency') as Currency;
      return saved || 'BDT';
    } catch {
      return 'BDT';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sun_choice_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sun_choice_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to persist products', e);
    }
  }, [products]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('sun_choice_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to persist cart', e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('sun_choice_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to persist wishlist', e);
    }
  }, [wishlist]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('sun_choice_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to persist orders', e);
    }
  }, [orders]);

  const addToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const formatPrice = (amountInUSD: number): string => {
    const conf = CURRENCY_RATES[currency] || CURRENCY_RATES.BDT;
    const converted = amountInUSD * conf.rate;
    if (currency === 'BDT') {
      return `৳${Math.round(converted).toLocaleString('en-IN')}`;
    }
    if (currency === 'JPY') {
      return `${conf.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return conf.prefix 
      ? `${conf.symbol}${converted.toFixed(2)}` 
      : `${converted.toFixed(2)} ${conf.symbol}`;
  };

  // Cart operations
  const addToCart = (
    product: Product,
    selectedColor: ProductColor,
    selectedSize?: string,
    quantity: number = 1
  ) => {
    if (product.stock <= 0) {
      addToast('Out of stock', `${product.title} is currently unavailable.`, 'error');
      return;
    }

    const requestedQuantity = Math.max(1, Math.floor(quantity));
    const cartItemId = `${product.id}-${selectedColor.hex}-${selectedSize || 'default'}`;
    const existingItem = cart.find((item) => item.id === cartItemId);
    const addedQuantity = Math.min(requestedQuantity, Math.max(0, product.stock - (existingItem?.quantity || 0)));

    if (addedQuantity <= 0) {
      addToast('Stock limit reached', `${product.title} already has the maximum available quantity in your bag.`, 'warning');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + addedQuantity }
            : item
        );
      }
      return [...prev, { id: cartItemId, product, selectedColor, selectedSize, quantity: addedQuantity }];
    });

    addToast(
      addedQuantity < requestedQuantity ? 'Stock limit reached' : 'Added to Bag',
      `${product.title} (${selectedColor.name}${selectedSize ? ` - ${selectedSize}` : ''})${addedQuantity < requestedQuantity ? ` · ${addedQuantity} available` : ''}`,
      addedQuantity < requestedQuantity ? 'warning' : 'success'
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Item removed', 'Your bag has been updated', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== cartItemId) return item;
        const cappedQuantity = Math.min(Math.floor(quantity), item.product.stock);
        return cappedQuantity > 0 ? { ...item, quantity: cappedQuantity } : item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', undefined, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Added to Wishlist', 'Item saved to your favorites');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === trimmed && c.active);
    if (!found) {
      addToast('Invalid Coupon', 'Code not recognized or expired', 'error');
      return { success: false, message: 'Invalid promo code' };
    }
    if (found.minSpend && cartSubtotal < found.minSpend) {
      const msg = `Minimum spend of ${formatPrice(found.minSpend)} required for this code`;
      addToast('Minimum spend not met', msg, 'warning');
      return { success: false, message: msg };
    }
    setAppliedCoupon(found);
    addToast('Coupon Applied!', found.description, 'success');
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', undefined, 'info');
  };

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = (cartSubtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.discountAmount) {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.discountAmount);
    }
  }

  const shippingFee = cartSubtotal > 100 || (appliedCoupon?.code === 'FREESHIP') || cartSubtotal === 0 ? 0 : 9.99;
  const taxAmount = (cartSubtotal - discountAmount) * 0.07;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + (cart.length > 0 ? shippingFee + taxAmount : 0));

  // Product management (Admin & Seller)
  const addProduct = (newProdData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount' | 'reviews'>): Product => {
    const id = 'prod-' + Date.now().toString(36);
    const newProduct: Product = {
      ...newProdData,
      id,
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviewCount: 0,
      reviews: []
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast('Product Listed!', `${newProduct.title} is now available in the store.`);
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct((prev) => (prev ? { ...prev, ...updatedFields } : null));
    }
    addToast('Product Updated', 'Product details saved successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
      setActiveView('shop');
    }
    addToast('Product Deleted', 'Item removed from marketplace', 'info');
  };

  const getProductById = (id: string) => products.find((p) => p.id === id);

  // Orders
  const placeOrder = ({
    address,
    paymentMethod,
    paymentDetails
  }: {
    address: ShippingAddress;
    paymentMethod: 'card' | 'paypal' | 'apple_pay' | 'cod';
    paymentDetails?: { last4?: string; brand?: string };
  }): Order => {
    const orderNum = 'SPC-' + Math.floor(10000 + Math.random() * 90000);
    const trkNum = 'TRK-' + Math.floor(10000000 + Math.random() * 90000000) + '-US';
    
    // Delivery estimated 3 days from now
    const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: orderNum,
      date: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee,
      tax: taxAmount,
      totalAmount: finalTotal,
      shippingAddress: address,
      paymentMethod,
      paymentDetails: paymentDetails || { last4: '4242', brand: 'Visa' },
      status: 'processing',
      trackingNumber: trkNum,
      carrier: 'Spectrum Priority Express',
      estimatedDelivery: deliveryDate,
      trackingUpdates: [
        {
          step: 'Order Confirmed',
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          completed: true,
          description: `Payment received via ${paymentMethod.toUpperCase().replace('_', ' ')}.`
        },
        {
          step: 'Preparing & Color Verification',
          date: 'In Progress',
          completed: true,
          description: 'Items selected from warehouse and color swatch matched.'
        },
        {
          step: 'Handed to Courier',
          date: 'Scheduled Tomorrow',
          completed: false,
          description: 'Package ready for carrier pickup.'
        },
        {
          step: 'Out for Delivery',
          date: deliveryDate,
          completed: false,
          description: 'Final mile courier dispatch.'
        },
        {
          step: 'Delivered',
          date: 'Estimated ' + deliveryDate,
          completed: false,
          description: 'Direct doorstep delivery.'
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    
    // Reduce stock counts
    setProducts((prev) =>
      prev.map((p) => {
        const itemInCart = cart.find((c) => c.product.id === p.id);
        if (itemInCart) {
          return { ...p, stock: Math.max(0, p.stock - itemInCart.quantity) };
        }
        return p;
      })
    );

    clearCart();
    setAppliedCoupon(null);
    setActiveOrderConfirmation(newOrder);
    addToast('Order Placed Successfully!', `Order ${orderNum} is now processing.`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedSteps = ord.trackingUpdates.map((step, idx) => {
            if (status === 'processing') return { ...step, completed: idx <= 1 };
            if (status === 'shipped') return { ...step, completed: idx <= 2 };
            if (status === 'delivered') return { ...step, completed: true };
            if (status === 'cancelled') return { ...step, completed: false };
            return step;
          });
          return { ...ord, status, trackingUpdates: updatedSteps };
        }
        return ord;
      })
    );
    addToast('Order Status Updated', `Order marked as ${status.toUpperCase()}`);
  };

  const getOrderById = (orderId: string) => orders.find((o) => o.id === orderId);

  const addColorPreset = (preset: Omit<ColorPreset, 'id'>) => {
    const newPreset: ColorPreset = {
      ...preset,
      id: 'preset-' + Date.now().toString(36)
    };
    setColorPresets((prev) => [...prev, newPreset]);
    addToast('Color Preset Saved', `Added "${preset.name}" to studio presets`);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedColorHex(null);
    setPriceRange([0, 500]);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('popular');
  };

  // Filtered Products computation
  const filteredProducts = products.filter((p) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchSubtitle = p.subtitle.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      const matchColors = p.colors.some((c) => c.name.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q));
      if (!matchTitle && !matchSubtitle && !matchDesc && !matchCategory && !matchTags && !matchColors) {
        return false;
      }
    }

    // Category
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    // Color code filter
    if (selectedColorHex) {
      const hasColor = p.colors.some(
        (c) => c.hex.toLowerCase() === selectedColorHex.toLowerCase()
      );
      if (!hasColor) return false;
    }

    // Price
    if (p.price < priceRange[0] || p.price > priceRange[1]) {
      return false;
    }

    // Rating
    if (minRating > 0 && p.rating < minRating) {
      return false;
    }

    // Stock
    if (inStockOnly && p.stock <= 0) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    // Default 'popular': rating * reviewCount
    return (b.rating * b.reviewCount) - (a.rating * a.reviewCount);
  });

  return (
    <CommerceContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        products,
        filteredProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        searchQuery,
        setSearchQuery,
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
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        activeOrderConfirmation,
        setActiveOrderConfirmation,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalTotal,
        shippingFee,
        taxAmount,
        currency,
        setCurrency,
        formatPrice,
        colorPresets,
        addColorPreset,
        announcement,
        setAnnouncement,
        toasts,
        addToast,
        removeToast,
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        toggleLanguage,
        t
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
};
