/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CommerceProvider, useCommerce } from './context/CommerceContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { ShopView } from './components/shop/ShopView';
import { ProductDetailView } from './components/shop/ProductDetailView';
import { QuickViewModal } from './components/shop/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderConfirmationModal } from './components/checkout/OrderConfirmationModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SellerPortal } from './components/seller/SellerPortal';
import { ColorHubView } from './components/color/ColorHubView';
import { OrderHistoryView } from './components/orders/OrderHistoryView';
import { WishlistModal } from './components/wishlist/WishlistModal';

const MainAppContent: React.FC = () => {
  const { activeView } = useCommerce();

  return (
    <div className="app-shell min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col selection:bg-lime-300 selection:text-slate-950 font-sans transition-colors duration-200">
      {/* Global Header with Color-Coded Announcement Bar & Category Nav */}
      <Header />

      {/* Main Dynamic View Content */}
      <main className="flex-1 pb-16">
        <div key={activeView} className="page-enter">
          {activeView === 'shop' && <ShopView />}
          {activeView === 'product-detail' && <ProductDetailView />}
          {activeView === 'checkout' && <CheckoutModal />}
          {activeView === 'admin' && <AdminDashboard />}
          {activeView === 'seller-portal' && <SellerPortal />}
          {activeView === 'color-hub' && <ColorHubView />}
          {activeView === 'orders' && <OrderHistoryView />}
        </div>
      </main>

      {/* Footer with Color Ticker and Value Props */}
      <Footer />

      {/* Overlays & Global Modals */}
      <CartDrawer />
      <QuickViewModal />
      <WishlistModal />
      <OrderConfirmationModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CommerceProvider>
      <MainAppContent />
    </CommerceProvider>
  );
}
