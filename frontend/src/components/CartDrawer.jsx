import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, subtotal, totalItemsCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Sliding Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-screen max-w-md bg-[#FFFDF8] dark:bg-[#0A0A0A] border-l border-slate-200 dark:border-white/10 text-slate-900 dark:text-white shadow-2xl flex flex-col justify-between transition-colors duration-300"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C49A45]/15 border border-[#C49A45]/30 flex items-center justify-center text-[#C49A45]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Your Shopping Cart</h2>
                    <p className="text-xs text-slate-700 dark:text-gray-400 font-medium">
                      {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} saved in local session
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.type}`}
                      className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center gap-4 hover:border-[#C49A45]/40 transition-colors shadow-sm"
                    >
                      <img
                        src={item.image || '/images/agbada_category.png'}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black text-[#A88135] dark:text-[#C49A45] uppercase tracking-wider block mb-0.5">
                          {item.category || 'Digitized Design'}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.title}</h4>
                        <div className="text-xs text-slate-700 dark:text-gray-400 mt-1 font-semibold">
                          ${item.unitPrice.toFixed(2)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center bg-slate-100 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.type)}
                              className="px-2 py-1 text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.type)}
                              className="px-2 py-1 text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id, item.type)}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-[11px] font-semibold flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-black text-slate-900 dark:text-white">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <ShoppingBag className="w-12 h-12 text-slate-400 dark:text-gray-600 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Your cart is currently empty</h3>
                    <p className="text-xs text-slate-700 dark:text-gray-400 mb-6">
                      Explore our marketplaces for digitized embroidery patterns & custom metal tags.
                    </p>
                    <Link
                      to="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-flex items-center h-10 px-6 bg-black dark:bg-[#C49A45] text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#C49A45] dark:hover:bg-white hover:text-black transition-colors"
                    >
                      Browse Marketplace
                    </Link>
                  </div>
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 space-y-4">
                  <div className="space-y-2 text-xs text-slate-700 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span className="font-medium">Subtotal</span>
                      <strong className="text-slate-950 dark:text-white font-bold">${subtotal.toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Delivery / Instant Access</span>
                      <strong className="text-emerald-700 dark:text-emerald-400 font-bold">Free Instant Digital Download</strong>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-300 dark:border-white/10">
                      <span>Total Amount</span>
                      <span className="text-[#A88135] dark:text-[#C49A45] font-black text-base">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full h-12 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black dark:hover:text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
                  >
                    Proceed To Full Checkout <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-700 dark:text-gray-400 font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Secure Local Storage Persistence
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
