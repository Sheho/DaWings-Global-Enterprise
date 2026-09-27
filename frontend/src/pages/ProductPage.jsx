import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, ZoomIn, X, ChevronRight, Check, ArrowLeft, Download, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/ui/MagneticButton';
import { shopProducts } from '../data/shopData';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const product = shopProducts.find((p) => p.id === Number(id)) || shopProducts[0];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] flex flex-col font-sans selection:bg-[#C49A45] selection:text-white text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-20 sm:pt-22 pb-24 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-[#C49A45]/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumbs */}
          <div className="flex items-center text-xs font-bold tracking-widest text-gray-600 dark:text-gray-400 uppercase mb-8">
            <Link to="/" className="hover:text-[#C49A45] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 dark:text-gray-600" />
            <Link to="/shop" className="hover:text-[#C49A45] transition-colors">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 dark:text-gray-600" />
            <span className="text-[#C49A45]">{product.category}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Product Image */}
            <div className="w-full">
              <div
                className="relative bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden cursor-pointer group shadow-2xl backdrop-blur-md"
                onClick={() => setLightboxOpen(true)}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Inspection Hint Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 bg-[#C49A45] text-black rounded-full flex items-center justify-center shadow-xl">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-widest bg-black/60 px-4 py-1.5 rounded-full border border-white/20">
                    Click to Zoom High Res
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-4 text-[#C49A45] font-bold text-xs uppercase tracking-widest flex items-center gap-3">
                <span className="bg-[#C49A45]/10 border border-[#C49A45]/30 px-3 py-1 rounded-full text-[#C49A45]">
                  {product.vendor}
                </span>
                <span className="text-gray-400 dark:text-gray-500">|</span>
                <span className="flex items-center text-amber-500 dark:text-amber-400 gap-1">
                  <Star className="w-4 h-4 fill-current" /> {product.rating} ({product.reviewsCount} Verified Reviews)
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">{product.title}</h1>
              <div className="text-3xl font-light text-[#C49A45] mb-6 flex items-center gap-4">
                <span>{product.price}</span>
                <span className="text-xs text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Instant Download Ready
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-8">
                {product.desc}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Stitch Count</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{product.stitches} stitches</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Color Changes</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{product.colors} thread colors</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Included Formats</p>
                  <p className="text-sm font-bold text-[#C49A45]">{product.formats}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Guarantee</p>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> 100% Stitch Tested
                  </p>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`w-full inline-flex h-[55px] items-center justify-center font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(196,154,69,0.3)] gap-3 ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" /> Added To Cart Successfully!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" /> Add Design To Cart — {product.price}
                    </>
                  )}
                </button>

                <Link
                  to="/shop"
                  className="w-full inline-flex h-[48px] items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-gray-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors border border-gray-200 dark:border-white/10 gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Marketplace
                </Link>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-[#C49A45] p-2 bg-white/10 rounded-full"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-[85vh] object-contain rounded-xl border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProductPage;
