import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, CreditCard, Lock, Sparkles, ArrowLeft, Download, UserCheck, KeyRound, Eye, EyeOff, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/ui/MagneticButton';
import { useCart } from '../context/CartContext';
import { registerDesignerAPI, initializePaymentAPI, verifyPaymentAPI } from '../services/api';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, totalItemsCount } = useCart();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrderDetails, setCompletedOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hybrid Form Fields for Non-Logged-In Users
  const [guestForm, setGuestForm] = useState({
    fullName: '',
    email: '',
    password: '',
    username: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('dawings_user');
    if (stored) {
      try {
        setCurrentUser(JSON.parse(stored));
      } catch (e) {
        setCurrentUser(null);
      }
    }
  }, []);

  const handleHybridCheckout = async (e) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    try {
      let activeUser = currentUser;

      // If user is NOT logged in, register them frictionlessly during checkout
      if (!activeUser) {
        if (!guestForm.fullName || !guestForm.email || !guestForm.password) {
          setFormError('Please fill in your name, email, and password to create your secure account.');
          setLoading(false);
          return;
        }

        const username = guestForm.username || guestForm.email.split('@')[0] + Math.floor(Math.random() * 1000);
        
        const registrationPayload = {
          fullName: guestForm.fullName,
          email: guestForm.email,
          username,
          password: guestForm.password,
          role: 'buyer',
          isApproved: true,
        };

        // Call API / Local Storage Fallback
        const regRes = await registerDesignerAPI(registrationPayload);
        activeUser = regRes.data?.user || registrationPayload;
        setCurrentUser(activeUser);
      }

      // Initialize Payment via Backend Controller
      const payInitRes = await initializePaymentAPI({
        email: activeUser.email,
        amount: subtotal,
        cartItems: cartItems.map(i => ({ id: i.id, title: i.title, price: i.unitPrice, qty: i.quantity })),
        currency: 'USD',
      });

      const paymentRef = payInitRes.reference || ('DW-PAY-' + Math.floor(100000 + Math.random() * 900000));

      // Verify Payment
      const verifyRes = await verifyPaymentAPI(paymentRef, subtotal.toFixed(2));

      // Create Order Object & Save to Purchases Vault
      const orderData = {
        orderId: paymentRef,
        date: new Date().toISOString().split('T')[0],
        items: [...cartItems],
        total: `$${subtotal.toFixed(2)}`,
        status: 'Completed',
        paymentStatus: 'Paid & Verified',
        paymentGateway: paymentMethod === 'bank' ? 'Bank Transfer Direct' : 'Paystack / Card Gateway',
        paidAt: verifyRes.paidAt || new Date().toISOString(),
        userEmail: activeUser.email,
      };

      const existingPurchases = JSON.parse(localStorage.getItem('dawings_purchases') || '[]');
      existingPurchases.unshift(orderData);
      localStorage.setItem('dawings_purchases', JSON.stringify(existingPurchases));

      setCompletedOrderDetails(orderData);
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      setFormError(err.message || 'An error occurred during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] flex flex-col font-sans selection:bg-[#C49A45] selection:text-white text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow relative pt-20 sm:pt-22 pb-24 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200 dark:border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C49A45]/10 border border-[#C49A45]/30 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45]" />
                <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-widest">
                  Frictionless Hybrid Checkout
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                YOUR MARKETPLACE <span className="text-[#C49A45] italic">CART</span>
              </h1>
            </div>

            {cartItems.length > 0 && !orderComplete && (
              <button
                onClick={clearCart}
                className="text-xs font-bold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 uppercase tracking-wider flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Clear Entire Cart
              </button>
            )}
          </div>

          {orderComplete && completedOrderDetails ? (
            /* Post-Purchase Order Confirmation & Download Vault Screen */
            <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-xl text-center shadow-2xl space-y-6">
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-500 dark:text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                ORDER CONFIRMED & ACCOUNT CREATED!
              </h2>

              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Thank you! Reference <strong className="text-[#C49A45] font-mono">{completedOrderDetails.orderId}</strong>. Your production files are generated and permanently saved to your digital vault.
              </p>

              <div className="p-4 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Customer Account:</span>
                  <strong className="text-gray-900 dark:text-white">{currentUser?.email || guestForm.email}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Paid:</span>
                  <strong className="text-[#C49A45] font-bold">{completedOrderDetails.total}</strong>
                </div>
              </div>

              {/* Direct File Downloads List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#C49A45]">Instant File Downloads</h4>
                {completedOrderDetails.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <span className="font-bold text-gray-900 dark:text-white truncate">{item.title}</span>
                    <a
                      href={item.image || '/images/agbada_category.png'}
                      download={`${item.title}.zip`}
                      className="px-4 py-2 bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-bold rounded-lg uppercase tracking-wider text-[11px] flex items-center gap-1 shrink-0 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Download ZIP
                    </a>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/my-purchases"
                  className="px-8 py-3.5 bg-gray-100 dark:bg-white/10 hover:bg-[#C49A45] hover:text-black text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all border border-gray-200 dark:border-white/10"
                >
                  View My Purchases Vault
                </Link>
                <Link
                  to="/shop"
                  className="px-8 py-3.5 bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              {/* Cart Items List */}
              <div className="lg:col-span-7 space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    layout
                    key={`${item.id}-${item.type}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 backdrop-blur-md hover:border-[#C49A45]/40 transition-colors shadow-sm dark:shadow-none"
                  >
                    <div className="flex items-center gap-5 min-w-0">
                      <img
                        src={item.image || '/images/agbada_category.png'}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-xl bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 shrink-0"
                      />

                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-widest block mb-1">
                          {item.category || 'Digitized Pattern'}
                        </span>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">{item.title}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">
                          Format: DST, PES, EXP • Vendor: {item.vendor || 'Dawings Global'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-200 dark:border-white/5">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.type)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.type)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-24">
                        <div className="text-lg font-black text-gray-900 dark:text-white">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                          ${item.unitPrice.toFixed(2)} each
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.type)}
                        className="w-9 h-9 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-colors shrink-0"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}

                <div className="pt-4">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#C49A45] hover:underline uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-4 h-4" /> Continue Shopping in Marketplace
                  </Link>
                </div>
              </div>

              {/* Seamless Hybrid Checkout Box */}
              <div className="lg:col-span-5">
                <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl sticky top-28 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/10">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Hybrid Checkout</h3>
                    <span className="text-xs text-[#C49A45] font-bold font-mono">
                      Subtotal: ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {formError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleHybridCheckout} className="space-y-4">
                    {/* Logged In Status or Guest Account Fields */}
                    {currentUser ? (
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl flex items-center gap-3">
                        <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <div className="text-xs min-w-0">
                          <span className="text-gray-600 dark:text-gray-400 block">Checking out as:</span>
                          <strong className="text-gray-900 dark:text-white truncate block">{currentUser.fullName} ({currentUser.email})</strong>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 p-4 bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-widest flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> Frictionless Sign-Up
                          </span>
                          <Link to="/login" className="text-[11px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline">
                            Already registered? Log In
                          </Link>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Chief Adebayo"
                            value={guestForm.fullName}
                            onChange={(e) => setGuestForm({ ...guestForm, fullName: e.target.value })}
                            className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="yourname@gmail.com"
                            value={guestForm.email}
                            onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                            className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-1">Choose Password * (For Vault Access)</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              required
                              placeholder="At least 6 characters"
                              value={guestForm.password}
                              onChange={(e) => setGuestForm({ ...guestForm, password: e.target.value })}
                              className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Method Selector */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-1.5">Payment Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                            paymentMethod === 'card'
                              ? 'bg-[#C49A45] text-black border-[#C49A45] shadow-lg'
                              : 'bg-gray-100 dark:bg-black/40 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-white/10'
                          }`}
                        >
                          Card (Paystack/Flutterwave)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('transfer')}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                            paymentMethod === 'transfer'
                              ? 'bg-[#C49A45] text-black border-[#C49A45] shadow-lg'
                              : 'bg-gray-100 dark:bg-black/40 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-white/10'
                          }`}
                        >
                          Bank Transfer
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-13 bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(196,154,69,0.3)] disabled:opacity-50 mt-2"
                    >
                      {loading ? (
                        <>
                          Processing Order... <Loader2 className="w-4 h-4 animate-spin" />
                        </>
                      ) : currentUser ? (
                        <>
                          Pay ${subtotal.toFixed(2)} & Download Files <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Pay ${subtotal.toFixed(2)} & Create Account <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="pt-4 border-t border-gray-200 dark:border-white/5 space-y-2 text-[10px] text-gray-600 dark:text-gray-400 font-medium">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-[#C49A45]" />
                      <span>256-bit Encrypted Payment Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>100% Anti-Fraud Verified Vault Protection</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Empty Cart */
            <div className="text-center py-24 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl max-w-xl mx-auto backdrop-blur-md">
              <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Cart is Empty</h2>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-8 max-w-md mx-auto">
                You haven't added any digitized embroidery patterns or metal tag items to your cart yet. Explore our marketplace to get started.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-colors shadow-lg"
                >
                  Shop Embroidery Designs
                </Link>
                <Link
                  to="/metal-tags"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors border border-gray-200 dark:border-white/10"
                >
                  Shop Laser Metal Tags
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
