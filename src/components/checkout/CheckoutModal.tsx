import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Truck, 
  Check, 
  ShoppingBag, 
  User, 
  MapPin, 
  Sparkles,
  Zap
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { ShippingAddress } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    finalTotal,
    formatPrice,
    placeOrder,
    setActiveView
  } = useCommerce();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address state
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple_pay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('981');
  const [cardHolder, setCardHolder] = useState('Jordan Miller');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill demo address for fast testing
  const handleAutoFillDemo = () => {
    setAddress({
      fullName: 'Jordan Miller',
      email: 'jordan.miller@example.com',
      phone: '+1 (555) 432-8765',
      addressLine1: '450 California Street, Floor 12',
      addressLine2: 'Suite 120',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94104',
      country: 'United States'
    });
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      placeOrder({
        address,
        paymentMethod,
        paymentDetails: {
          last4: cardNumber.slice(-4) || '4242',
          brand: paymentMethod === 'card' ? 'Visa' : paymentMethod
        }
      });
      setIsSubmitting(false);
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Your bag is empty</h2>
        <p className="text-xs text-slate-500">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-from-checkout"
          onClick={() => setActiveView('shop')}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      {/* Progress Step Bar */}
      <div className="max-w-2xl mx-auto flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10" />
        
        <div className="flex flex-col items-center bg-white px-2">
          <button
            onClick={() => setStep(1)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= 1 ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-400'
            }`}
          >
            1
          </button>
          <span className="text-[11px] font-semibold text-slate-700 mt-1">Shipping</span>
        </div>

        <div className="flex flex-col items-center bg-white px-2">
          <button
            onClick={() => { if (address.fullName) setStep(2); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= 2 ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-400'
            }`}
          >
            2
          </button>
          <span className="text-[11px] font-semibold text-slate-700 mt-1">Payment</span>
        </div>

        <div className="flex flex-col items-center bg-white px-2">
          <button
            onClick={() => { if (address.fullName) setStep(3); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step === 3 ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-400'
            }`}
          >
            3
          </button>
          <span className="text-[11px] font-semibold text-slate-700 mt-1">Review & Place</span>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Steps Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Shipping Destination</h3>
                  <p className="text-xs text-slate-500">Where should we deliver your order?</p>
                </div>
                <button
                  type="button"
                  id="btn-autofill-demo"
                  onClick={handleAutoFillDemo}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Auto-Fill Sample Info</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="e.g. Jordan Miller"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      placeholder="jordan@example.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    placeholder="123 Market Street, Apt 4B"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="San Francisco"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">State / Province</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="CA"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      placeholder="94104"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  id="btn-checkout-step1-next"
                  type="button"
                  onClick={() => {
                    if (!address.fullName || !address.addressLine1 || !address.city) {
                      handleAutoFillDemo();
                    }
                    setStep(2);
                  }}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Continue to Payment Method
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Select Payment Method</h3>
                <p className="text-xs text-slate-500">Secure, encrypted zero-fraud transaction guarantee.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card' ? 'border-slate-900 bg-slate-900 text-white shadow-md' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs font-bold">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'apple_pay' ? 'border-slate-900 bg-slate-900 text-white shadow-md' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="font-bold text-sm"> Pay</span>
                  <span className="text-xs font-bold">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'paypal' ? 'border-slate-900 bg-slate-900 text-white shadow-md' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="font-bold text-blue-500 text-sm">PayPal</span>
                  <span className="text-xs font-bold">Express</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'cod' ? 'border-slate-900 bg-slate-900 text-white shadow-md' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span className="text-xs font-bold">Pay on Delivery</span>
                </button>
              </div>

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                        VISA
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Security CVC</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        maxLength={4}
                        className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Back to Shipping
                </button>
                <button
                  id="btn-checkout-step2-next"
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Review Order Summary
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Place */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Final Review & Confirmation</h3>
                <p className="text-xs text-slate-500">Please verify your shipping and payment choices.</p>
              </div>

              {/* Destination summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Shipping Address</span>
                  <button onClick={() => setStep(1)} className="text-indigo-600 font-semibold hover:underline">Edit</button>
                </div>
                <div className="text-slate-700">{address.fullName} • {address.phone}</div>
                <div className="text-slate-500">{address.addressLine1}, {address.city}, {address.state} {address.postalCode}</div>
              </div>

              {/* Payment summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Payment Method</span>
                  <button onClick={() => setStep(2)} className="text-indigo-600 font-semibold hover:underline">Edit</button>
                </div>
                <div className="text-slate-700 capitalize">
                  {paymentMethod === 'card' ? `Credit Card (ending in ${cardNumber.slice(-4)})` : paymentMethod.replace('_', ' ')}
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                id="btn-place-order-final"
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Securing Order & Generating Invoice...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Authorize & Place Order • {formatPrice(finalTotal)}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5">
          <h4 className="font-bold text-slate-900 text-sm sm:text-base">Order Items ({cart.length})</h4>

          <div className="divide-y divide-slate-200 max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-3 first:pt-0 flex items-center gap-3">
                <img
                  src={item.selectedColor.previewImage || item.product.images[0]}
                  alt={item.product.title}
                  className="w-14 h-14 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{item.product.title}</div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.selectedColor.hex }} />
                    <span>{item.selectedColor.name}</span>
                    <span>• Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-slate-900">
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-slate-900">{formatPrice(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount Promo</span>
                <span className="font-mono">-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-mono">
                {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatPrice(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax (7%)</span>
              <span className="font-mono">{formatPrice(taxAmount)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t border-slate-200">
              <span>Final Total</span>
              <span className="font-mono">{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
