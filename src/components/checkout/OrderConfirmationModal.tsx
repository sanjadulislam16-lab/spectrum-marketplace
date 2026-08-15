import React from 'react';
import { 
  CheckCircle2, 
  Package, 
  Printer, 
  ArrowRight, 
  Truck, 
  MapPin, 
  Clock, 
  Sparkles,
  Palette
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const OrderConfirmationModal: React.FC = () => {
  const {
    activeOrderConfirmation,
    setActiveOrderConfirmation,
    setActiveView,
    formatPrice
  } = useCommerce();

  if (!activeOrderConfirmation) return null;

  const order = activeOrderConfirmation;

  const handlePrint = () => {
    window.print();
  };

  const handleGoToOrders = () => {
    setActiveOrderConfirmation(null);
    setActiveView('orders');
  };

  const handleContinueShopping = () => {
    setActiveOrderConfirmation(null);
    setActiveView('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 font-mono">
            ORDER #{order.orderNumber}
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Thank you, {order.shippingAddress.fullName}!
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your order has been authorized and dispatched to our precision fulfillment center. A confirmation has been sent to <strong>{order.shippingAddress.email}</strong>.
          </p>
        </div>

        {/* Live Milestone Tracking Bar */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-900">Live Shipment Tracker</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-semibold">{order.trackingNumber}</span>
          </div>

          {/* Timeline steps */}
          <div className="space-y-3">
            {order.trackingUpdates.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <div className="flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    step.completed ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  {idx < order.trackingUpdates.length - 1 && (
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
                  <p className="text-[11px] text-slate-500 leading-normal">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ordered items with color swatches */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Ordered Items</h4>
          <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
            {order.items.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.selectedColor.previewImage || item.product.images[0]}
                    alt={item.product.title}
                    className="w-11 h-11 rounded-xl object-cover bg-slate-100 border border-slate-200"
                  />
                  <div>
                    <div className="font-bold text-slate-800 line-clamp-1">{item.product.title}</div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.selectedColor.hex }} />
                      <span>{item.selectedColor.name}</span>
                      <span className="font-mono text-[10px]">({item.selectedColor.hex})</span>
                      <span>• Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>
                <div className="font-mono font-bold text-slate-900">
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial & Delivery Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Delivery Address</span>
            <span className="text-slate-800 font-medium block mt-0.5">{order.shippingAddress.addressLine1}</span>
            <span className="text-slate-500 text-[11px] block">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</span>
          </div>

          <div className="text-right">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Paid</span>
            <span className="text-base font-black text-slate-900 font-mono block mt-0.5">{formatPrice(order.totalAmount)}</span>
            <span className="text-emerald-600 text-[10px] font-semibold block">Paid via {order.paymentMethod.toUpperCase().replace('_', ' ')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            id="btn-confirm-go-to-orders"
            onClick={handleGoToOrders}
            className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Package className="w-4 h-4 text-indigo-300" />
            <span>View All Orders & Tracking</span>
          </button>

          <button
            id="btn-confirm-continue-shopping"
            onClick={handleContinueShopping}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
