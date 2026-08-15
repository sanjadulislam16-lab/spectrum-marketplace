import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  Clock, 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  CreditCard,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { Order } from '../../types';

export const OrderHistoryView: React.FC = () => {
  const { orders, formatPrice, setActiveView, setSelectedProduct, addToCart, addToast } = useCommerce();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);

  const handlePrint = () => {
    window.print();
  };

  const handleReorderItem = (item: any) => {
    addToCart(item.product, item.selectedColor, item.selectedSize, item.quantity);
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">No orders placed yet</h2>
        <p className="text-xs text-slate-500">Discover our chromatic multi-category marketplace and place your first order.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Orders & Real-Time Tracking
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review past receipts, verify color variant specifications, and monitor carrier progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Orders List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Order History ({orders.length})
          </h2>

          <div className="space-y-3">
            {orders.map((ord) => {
              const isSelected = selectedOrder?.id === ord.id;
              return (
                <div
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-white border-indigo-600 ring-2 ring-indigo-100 shadow-md'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-sm text-slate-900">#{ord.orderNumber}</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {new Date(ord.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      ord.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                      ord.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' :
                      ord.status === 'processing' ? 'bg-amber-100 text-amber-900' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {ord.status}
                    </span>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {ord.items.map((it) => (
                      <div key={it.id} className="relative shrink-0">
                        <img
                          src={it.selectedColor.previewImage || it.product.images[0]}
                          alt={it.product.title}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200"
                        />
                        <span
                          className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                          style={{ backgroundColor: it.selectedColor.hex }}
                          title={`${it.selectedColor.name} (${it.selectedColor.hex})`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 font-mono">
                    <span className="text-slate-500 font-sans">{ord.items.length} item{ord.items.length !== 1 ? 's' : ''}</span>
                    <span className="font-bold text-slate-900">{formatPrice(ord.totalAmount)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Order Details (7 cols) */}
        {selectedOrder && (
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-slate-900 text-lg font-mono">Order #{selectedOrder.orderNumber}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase">
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Carrier: {selectedOrder.carrier} • Tracking #{selectedOrder.trackingNumber}</p>
              </div>

              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 self-start transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>

            {/* Tracking Milestones */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                  <Truck className="w-4 h-4 text-indigo-600" />
                  <span>Real-Time Milestone Timeline</span>
                </div>
                <span className="text-[11px] text-indigo-600 font-semibold font-mono">
                  Est. Delivery: {selectedOrder.estimatedDelivery}
                </span>
              </div>

              <div className="space-y-3">
                {selectedOrder.trackingUpdates.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        step.completed ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {step.completed ? '✓' : idx + 1}
                      </div>
                      {idx < selectedOrder.trackingUpdates.length - 1 && (
                        <div className={`w-0.5 h-6 my-0.5 ${step.completed ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 -mt-0.5">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${step.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                          {step.step}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{step.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ordered Line Items with Colors */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Ordered Products</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl p-4 bg-white">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.selectedColor.previewImage || item.product.images[0]}
                        alt={item.product.title}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                      />
                      <div>
                        <h5 className="font-bold text-slate-900">{item.product.title}</h5>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.selectedColor.hex }} />
                          <span>{item.selectedColor.name} ({item.selectedColor.hex})</span>
                          <span>• Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-slate-900">{formatPrice(item.product.price * item.quantity)}</div>
                      <button
                        onClick={() => handleReorderItem(item)}
                        className="text-[10px] text-indigo-600 hover:text-indigo-700 font-semibold mt-1"
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Payment Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Shipping Address</span>
                <div className="font-bold text-slate-800">{selectedOrder.shippingAddress.fullName}</div>
                <div className="text-slate-600">{selectedOrder.shippingAddress.addressLine1}</div>
                <div className="text-slate-500">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Payment Breakdown</span>
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span className="font-mono">-{formatPrice(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>Total Paid</span>
                  <span className="font-mono">{formatPrice(selectedOrder.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
