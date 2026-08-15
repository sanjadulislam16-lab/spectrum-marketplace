export type ProductCategory = 
  | 'all' 
  | 'electronics' 
  | 'fashion' 
  | 'home' 
  | 'beauty' 
  | 'sports' 
  | 'digital' 
  | 'art';

export interface ProductColor {
  name: string;
  hex: string;
  previewImage?: string;
  inStock?: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
  verifiedPurchase: boolean;
}

export interface SellerInfo {
  id: string;
  name: string;
  rating: number;
  salesCount: number;
  verified: boolean;
  avatar?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  featured?: boolean;
  onSale?: boolean;
  isNew?: boolean;
  colors: ProductColor[];
  sizes?: string[];
  tags: string[];
  images: string[];
  specs: ProductSpecification[];
  seller: SellerInfo;
  createdAt: string;
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // unique item id (product.id + color.hex + (size || ''))
  product: Product;
  selectedColor: ProductColor;
  selectedSize?: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface TrackingStep {
  step: string;
  date: string;
  completed: boolean;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'paypal' | 'apple_pay' | 'cod';
  paymentDetails?: {
    last4?: string;
    brand?: string;
  };
  status: OrderStatus;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  trackingUpdates: TrackingStep[];
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend?: number;
  active: boolean;
  description: string;
}

export interface ColorPreset {
  id: string;
  name: string;
  description: string;
  colors: { name: string; hex: string }[];
}

export type Currency = 'BDT' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
}
