import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, SlidersHorizontal, Star, CheckCircle, Sparkles, Eye, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/ui/MagneticButton';
import { shopCategories, shopProducts } from '../data/shopData';
import { useCart } from '../context/CartContext';

const ShopPage = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [cartToast, setCartToast] = useState(null);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...shopProducts];

    // Category Filter
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search Query Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.vendor.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sortBy === 'popular') {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setCartToast(product.title);
    setTimeout(() => {
      setCartToast(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] text-gray-900 dark:text-white flex flex-col font-sans selection:bg-[#C49A45] selection:text-white transition-colors duration-300">
      <Navbar />

      {/* Cart Toast Notification */}
      <AnimatePresence>
        {cartToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-[#C49A45] text-black px-6 py-4 rounded-xl shadow-[0_20px_50px_rgba(196,154,69,0.4)] flex items-center gap-3 font-bold text-sm border border-white/20"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Added "<strong className="underline">{cartToast}</strong>" to Cart!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow relative pt-20 sm:pt-22 pb-24 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 mb-6 backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C49A45]" />
              <span className="text-xs font-bold text-gray-800 dark:text-gray-300 uppercase tracking-widest">
                Official Dawings Marketplace
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6"
            >
              EXPLORE OUR <span className="text-[#C49A45] italic">DESIGNS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-medium"
            >
              Browse production-ready digitized embroidery files from Dawings Global & certified master creators worldwide. Instant downloads in DST, PES, EXP, and JEF formats.
            </motion.p>
          </div>

          {/* Search & Sort Controls Bar */}
          <div className="bg-white/90 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-xl mb-12 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Agbada, Caps, Logos, Monograms..."
                  className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-xl pl-11 pr-10 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#C49A45] font-medium transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills (Desktop & Mobile Scroll) */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-2 scrollbar-none">
                {shopCategories.map((cat) => {
                  const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        isActive
                          ? 'bg-[#C49A45] text-black shadow-[0_4px_15px_rgba(196,154,69,0.35)] scale-105'
                          : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-amber-100/50 dark:hover:bg-white/10 hover:text-black dark:hover:text-white border border-gray-200 dark:border-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <SlidersHorizontal className="w-4 h-4 text-[#C49A45]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 text-xs font-bold text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#C49A45] transition-all cursor-pointer"
                >
                  <option value="default" className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">Sort by: Default</option>
                  <option value="price-low" className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">Price: Low to High</option>
                  <option value="price-high" className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">Price: High to Low</option>
                  <option value="popular" className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">Most Popular</option>
                </select>
              </div>

            </div>
          </div>

          {/* Category Info Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-amber-900/10 dark:border-white/10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <span>Category:</span>
                <span className="text-[#C49A45] italic">{selectedCategory}</span>
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">
                Showing <strong className="text-gray-900 dark:text-white">{filteredProducts.length}</strong> production-ready designs
              </p>
            </div>

            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-xs font-bold text-[#C49A45] hover:underline uppercase tracking-wider"
              >
                Clear Category Filter ✕
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white/90 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 rounded-2xl overflow-hidden hover:border-[#C49A45]/50 transition-all duration-500 flex flex-col justify-between hover:shadow-xl dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-sm"
                  >
                    <div>
                      {/* Product Image & Badges */}
                      <div className="relative aspect-[4/5] bg-black/40 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                          <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                            {product.category}
                          </span>
                          <span className="bg-[#C49A45] text-black font-black text-xs px-3 py-1 rounded-full shadow-lg">
                            {product.price}
                          </span>
                        </div>

                        {/* Overlay Hover Actions */}
                        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                          <Link
                            to={`/product/${product.id}`}
                            className="w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300"
                            title="Quick View"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="h-12 px-6 bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-bold text-xs uppercase tracking-wider rounded-full flex items-center gap-2 shadow-xl transition-all duration-300"
                          >
                            <ShoppingCart className="w-4 h-4" /> Add To Cart
                          </button>
                        </div>
                      </div>

                      {/* Info Body */}
                      <div className="p-6">
                        <div className="flex items-center gap-1.5 text-[#C49A45] text-xs font-bold mb-2">
                          <Star className="w-3.5 h-3.5 fill-[#C49A45]" />
                          <span>{product.rating}</span>
                          <span className="text-gray-400 font-normal">({product.reviewsCount} reviews)</span>
                        </div>

                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-base font-bold text-gray-900 dark:text-white hover:text-[#C49A45] transition-colors leading-snug mb-2 line-clamp-1">
                            {product.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                          {product.desc}
                        </p>

                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          <span>Vendor:</span>
                          <span className="text-gray-700 dark:text-gray-300">{product.vendor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="px-5 pb-5 pt-3.5 border-t border-amber-900/10 dark:border-white/10 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-medium text-slate-700 dark:text-gray-400">
                        Formats: <strong className="text-slate-900 dark:text-white font-mono font-bold">DST, PES, EMB</strong>
                      </span>

                      <Link
                        to={`/product/${product.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black font-extrabold text-[11px] uppercase tracking-wider transition-all shadow-sm shrink-0"
                      >
                        View Details <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="bg-white/90 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 rounded-2xl p-16 text-center max-w-xl mx-auto backdrop-blur-md">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Designs Found</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any designs matching "{searchQuery}". Try searching for another keyword or clear category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-[#C49A45] text-black font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;
