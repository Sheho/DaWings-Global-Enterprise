import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingBag, ShoppingCart, Zap, Shirt, Wrench, Image, Users, Sparkles, LogIn, UserCheck, PlusCircle } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import ThemeToggle from './ui/ThemeToggle';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(null);

  const { totalItemsCount, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('dawings_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const marketplaceItems = [
    {
      name: 'Embroidery Designs Shop',
      desc: 'Shop Agbada, Caps, Flap & Pocket, Logos & Monograms',
      href: '/shop',
      icon: Shirt,
      badge: 'Digitized Files',
    },
    {
      name: 'Laser Metal Tags Hub',
      desc: 'Custom Metal Name Tags, Zipper Pulls & Jewelry',
      href: '/metal-tags',
      icon: Zap,
      badge: 'Laser Engraved',
    },
    {
      name: 'Sell Your Designs',
      desc: 'Register as a designer & earn money selling files',
      href: '/register',
      icon: PlusCircle,
      badge: 'Creator Signup',
    },
    {
      name: 'Admin Portal',
      desc: 'Platform Operations, Moderation & Payout Hub',
      href: '/admin',
      icon: Sparkles,
      badge: 'Admin Only',
    },
  ];

  const servicesItems = [
    {
      name: 'All Digitizing Services',
      desc: 'Explore traditional attire & corporate logo digitizing',
      href: '/services',
      icon: Sparkles,
    },
    {
      name: 'Machine Engineers Network',
      desc: 'Certified repair & maintenance engineers nationwide',
      href: '/engineers',
      icon: Wrench,
    },
    {
      name: 'Inspiration Gallery',
      desc: 'Real physical garments and embroidery craft showcase',
      href: '/portfolio',
      icon: Image,
    },
  ];

  return (
    <nav className="bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-white/10 relative transition-all duration-300">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          
          {/* Brand Logo */}
          <MagneticButton>
            <Link to="/" className="flex items-center z-50 group" title="DA-WINGS GLOBAL Home">
              <div className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl bg-[#C49A45]/10 border border-[#C49A45]/30 group-hover:border-[#C49A45] group-hover:bg-[#C49A45]/20 transition-all shadow-sm">
                <span className="text-[#C49A45] text-base leading-none">👑</span>
                <span className="text-[#C49A45] font-serif font-black text-xl leading-none tracking-tighter -mt-0.5">DW</span>
              </div>
            </Link>
          </MagneticButton>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">

            {/* Home */}
            <Link 
              to="/" 
              className={`text-[13px] font-bold tracking-wide transition-colors ${
                location.pathname === '/' ? 'text-[#C49A45]' : 'text-gray-800 dark:text-gray-200 hover:text-[#C49A45] dark:hover:text-[#C49A45]'
              }`}
            >
              HOME
            </Link>

            {/* Marketplace Mega Dropdown */}
            <div 
              className="relative group py-6"
              onMouseEnter={() => setActiveDropdown('marketplace')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-gray-800 dark:text-gray-200 hover:text-[#C49A45] dark:hover:text-[#C49A45] transition-colors focus:outline-none">
                <span>MARKETPLACE</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'marketplace' ? 'rotate-180 text-[#C49A45]' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'marketplace' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[65px] left-0 w-88 bg-white/95 dark:bg-[#0C0C0D]/95 backdrop-blur-2xl border border-amber-900/10 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3.5 z-50 overflow-hidden"
                  >
                    <div className="h-1 bg-gradient-to-r from-[#C49A45] via-amber-400 to-[#C49A45] rounded-t-full -mx-3.5 -mt-3.5 mb-3" />
                    <div className="flex items-center justify-between px-2 py-1 border-b border-gray-100 dark:border-white/10 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#C49A45] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#C49A45]" /> Marketplace & Vendor Hub
                      </span>
                    </div>
                    {marketplaceItems.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={idx}
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/80 dark:hover:bg-white/5 border border-transparent hover:border-[#C49A45]/20 transition-all group/item mb-1"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#C49A45]/10 border border-[#C49A45]/20 flex items-center justify-center text-[#C49A45] group-hover/item:bg-[#C49A45] group-hover/item:text-black group-hover/item:shadow-[0_0_12px_rgba(196,154,69,0.3)] transition-all shrink-0 mt-0.5">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-[#C49A45] transition-colors">
                                  {item.name}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] font-bold text-[#C49A45] bg-[#C49A45]/10 border border-[#C49A45]/30 px-2 py-0.5 rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5 leading-snug font-medium">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <span className="text-[#C49A45] opacity-0 group-hover/item:opacity-100 transform -translate-x-1 group-hover/item:translate-x-0 transition-all text-xs font-bold pl-2">
                            ➔
                          </span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div 
              className="relative group py-6"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-gray-800 dark:text-gray-200 hover:text-[#C49A45] dark:hover:text-[#C49A45] transition-colors focus:outline-none">
                <span>SERVICES</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180 text-[#C49A45]' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[65px] left-0 w-80 bg-white/95 dark:bg-[#0C0C0D]/95 backdrop-blur-2xl border border-amber-900/10 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3.5 z-50 overflow-hidden"
                  >
                    <div className="h-1 bg-gradient-to-r from-[#C49A45] via-amber-400 to-[#C49A45] rounded-t-full -mx-3.5 -mt-3.5 mb-3" />
                    <div className="flex items-center justify-between px-2 py-1 border-b border-gray-100 dark:border-white/10 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#C49A45] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#C49A45]" /> Our Specialized Services
                      </span>
                    </div>
                    {servicesItems.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={idx}
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/80 dark:hover:bg-white/5 border border-transparent hover:border-[#C49A45]/20 transition-all group/item mb-1"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#C49A45]/10 border border-[#C49A45]/20 flex items-center justify-center text-[#C49A45] group-hover/item:bg-[#C49A45] group-hover/item:text-black group-hover/item:shadow-[0_0_12px_rgba(196,154,69,0.3)] transition-all shrink-0 mt-0.5">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-[#C49A45] transition-colors block">
                                {item.name}
                              </span>
                              <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5 leading-snug font-medium">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <span className="text-[#C49A45] opacity-0 group-hover/item:opacity-100 transform -translate-x-1 group-hover/item:translate-x-0 transition-all text-xs font-bold pl-2">
                            ➔
                          </span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Us */}
            <Link 
              to="/about" 
              className={`text-[13px] font-bold tracking-wide transition-colors ${
                location.pathname === '/about' ? 'text-[#C49A45]' : 'text-gray-800 dark:text-gray-200 hover:text-[#C49A45] dark:hover:text-[#C49A45]'
              }`}
            >
              ABOUT US
            </Link>

            {/* Contact */}
            <Link 
              to="/contact" 
              className={`text-[13px] font-bold tracking-wide transition-colors ${
                location.pathname === '/contact' ? 'text-[#C49A45]' : 'text-gray-800 dark:text-gray-200 hover:text-[#C49A45] dark:hover:text-[#C49A45]'
              }`}
            >
              CONTACT
            </Link>

          </div>

          {/* Desktop Right CTA Area — includes Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">

            {/* Light / Dark Mode Switcher */}
            <ThemeToggle />

            {/* LUXURY MINIMAL CART BUTTON */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center gap-2 h-11 px-3.5 rounded-xl bg-white dark:bg-white/5 hover:bg-[#C49A45] text-gray-900 dark:text-white hover:text-black border border-[#C49A45]/40 hover:border-[#C49A45] transition-all duration-300 shadow-[0_4px_15px_rgba(196,154,69,0.15)] group"
              title="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-[#C49A45] group-hover:text-black transition-colors" />
              <span className={`px-2 py-0.5 text-[11px] font-black rounded-full transition-colors ${
                totalItemsCount > 0
                  ? 'bg-[#C49A45] group-hover:bg-black text-black group-hover:text-white font-bold'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 group-hover:bg-black group-hover:text-white'
              }`}>
                {totalItemsCount}
              </span>
            </button>

            {/* LOGIN / DASHBOARD BUTTON */}
            {user ? (
              <MagneticButton>
                <Link 
                  to="/dashboard"
                  className="flex items-center gap-2 text-[12px] font-bold text-black bg-[#C49A45] hover:bg-black hover:text-white px-5 py-2.5 rounded-xl tracking-wider uppercase transition-colors shadow-md"
                >
                  <UserCheck className="w-4 h-4" /> Dashboard
                </Link>
              </MagneticButton>
            ) : (
              <MagneticButton>
                <Link 
                  to="/login"
                  className="flex items-center gap-2 text-[12px] font-bold text-white bg-gray-900 dark:bg-white/10 dark:hover:bg-[#C49A45] hover:bg-[#C49A45] hover:text-black px-5 py-2.5 rounded-xl tracking-wider uppercase transition-all duration-300 shadow-md border border-transparent dark:border-white/10"
                >
                  <LogIn className="w-4 h-4 text-[#C49A45]" /> Login
                </Link>
              </MagneticButton>
            )}

          </div>

          {/* Mobile Hamburger Toggle & Cart Icon */}
          <div className="lg:hidden flex items-center gap-2.5">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/15 hover:border-[#C49A45] active:scale-95 transition-all shadow-sm"
              title="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-[#C49A45]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C49A45] text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-md">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/15 hover:border-[#C49A45] active:scale-95 transition-all shadow-sm z-50"
              title="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-[#C49A45]" /> : <Menu className="w-6 h-6 text-slate-900 dark:text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-[72px] left-0 w-full bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden z-40"
          >
            <div className="flex flex-col px-6 py-6 space-y-6 max-h-[80vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-3">
                <Link 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold tracking-wider text-gray-900 dark:text-white"
                >
                  HOME
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Theme</span>
                  <ThemeToggle />
                </div>
              </div>

              {/* Mobile Marketplace Section */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-widest block">
                  Marketplaces & Selling
                </span>
                <Link
                  to="/shop"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white font-bold text-xs"
                >
                  <Shirt className="w-4 h-4 text-[#C49A45]" /> Embroidery Designs Shop
                </Link>
                <Link
                  to="/metal-tags"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white font-bold text-xs"
                >
                  <Zap className="w-4 h-4 text-[#C49A45]" /> Laser Metal Tags Hub
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white font-bold text-xs"
                >
                  <PlusCircle className="w-4 h-4 text-[#C49A45]" /> Sell Your Designs (Register)
                </Link>
              </div>

              {/* Mobile Services Section */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-widest block">
                  Solutions & Services
                </span>
                <Link
                  to="/services"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-gray-800 dark:text-gray-200 block py-1"
                >
                  Digitizing Services
                </Link>
                <Link
                  to="/engineers"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-gray-800 dark:text-gray-200 block py-1"
                >
                  Machine Engineers Network
                </Link>
                <Link
                  to="/portfolio"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-gray-800 dark:text-gray-200 block py-1"
                >
                  Inspiration Gallery
                </Link>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-white/10 space-y-3">
                <Link 
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-gray-800 dark:text-gray-200 block"
                >
                  ABOUT US
                </Link>
                <Link 
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-gray-800 dark:text-gray-200 block"
                >
                  CONTACT US
                </Link>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex justify-center items-center bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white text-xs font-bold px-6 py-3.5 rounded-xl tracking-wider uppercase w-full gap-2 border border-gray-200 dark:border-white/10"
                >
                  <ShoppingCart className="w-4 h-4 text-[#C49A45]" /> View Cart ({totalItemsCount})
                </button>

                {user ? (
                  <Link 
                    to="/dashboard"  
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center bg-[#C49A45] text-black text-xs font-bold px-6 py-3.5 rounded-xl tracking-wider uppercase w-full gap-2 shadow-lg"
                  >
                    <UserCheck className="w-4 h-4" /> Go to Dashboard
                  </Link>
                ) : (
                  <Link 
                    to="/login"  
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center bg-gray-900 dark:bg-white/10 text-white text-xs font-bold px-6 py-3.5 rounded-xl tracking-wider uppercase w-full gap-2 shadow-lg"
                  >
                    <LogIn className="w-4 h-4 text-[#C49A45]" /> Designer Login
                  </Link>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
