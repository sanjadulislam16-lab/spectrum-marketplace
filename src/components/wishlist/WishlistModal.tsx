import React from 'react';
import { 
  Heart, 
  X, 
  ShoppingBag, 
  ArrowRight, 
  Trash2 
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const WishlistModal: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    removeFromWishlist,
    addToCart,
    formatPrice,
    setSelectedProduct,
    setActiveView
  } = useCommerce();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (prod: any) => {
    addToCart(prod, prod.colors[0], prod.sizes?.[0], 1);
    removeFromWishlist(prod.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Saved Wishlist</h3>
              <p className="text-xs text-slate-500">{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved</p>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 pr-1">
          {wishlistProducts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-400 mx-auto flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Your wishlist is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the heart icon on any product in our marketplace to save items for future purchases.
              </p>
            </div>
          ) : (
            wishlistProducts.map((prod) => (
              <div key={prod.id} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-16 h-16 rounded-2xl object-cover bg-slate-100 border border-slate-200 shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setSelectedProduct(prod);
                      setActiveView('product-detail');
                    }}
                  />
                  <div>
                    <h4 
                      onClick={() => {
                        setIsWishlistOpen(false);
                        setSelectedProduct(prod);
                        setActiveView('product-detail');
                      }}
                      className="font-bold text-slate-900 text-xs sm:text-sm hover:text-indigo-600 cursor-pointer line-clamp-1"
                    >
                      {prod.title}
                    </h4>
                    <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                      {formatPrice(prod.price)}
                    </div>
                    {/* Color swatches */}
                    <div className="flex items-center gap-1 mt-1">
                      {prod.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: c.hex }}
                          title={`${c.name}: ${c.hex}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveToCart(prod)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-indigo-300" />
                    <span className="hidden sm:inline">Move to Bag</span>
                  </button>

                  <button
                    onClick={() => removeFromWishlist(prod.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
          {wishlistProducts.length > 0 && (
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => addToCart(p, p.colors[0], p.sizes?.[0], 1));
                setIsWishlistOpen(false);
              }}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Add All to Shopping Bag
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
