import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

const portfolioImages = [
  { id: 1, src: '/images/hero_agbada.png', title: 'Imperial Agbada Gold Pattern', category: 'Agbada' },
  { id: 2, src: '/images/design_monogram.png', title: 'Royal Crown Monogram Emblem', category: 'Monogram' },
  { id: 3, src: '/images/design_cap.png', title: 'Traditional Fila Cap Crest', category: 'Caps' },
  { id: 4, src: '/images/embroidery_corporate.png', title: 'Corporate Brand Logo Pack', category: 'Logos' },
  { id: 5, src: '/images/embroidery_lace.png', title: 'Bespoke Lace Pattern Detail', category: 'Fabric Pattern' },
  { id: 6, src: '/images/about_studio.png', title: 'Behind The Scenes Studio Craft', category: 'Dawings Studio' },
];

const Portfolio = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const navigate = useNavigate();

  // Autoplay Slider Timer (3.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % portfolioImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleNextMobile = () => {
    setMobileIndex((prev) => (prev + 1) % portfolioImages.length);
  };

  const handlePrevMobile = () => {
    setMobileIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-hidden relative font-sans transition-colors duration-300">
      {/* Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C49A45]/10 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C49A45]/10 border border-[#C49A45]/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
            <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-widest">
              Physical Craft Showcase
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            OUR <span className="text-[#C49A45] italic">PORTFOLIO</span> GALLERY
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm max-w-xl mx-auto mt-3 leading-relaxed">
            Witness the crisp stitch quality and high-density thread execution across physical garments and accessories.
          </p>
        </motion.div>
        
        {/* MOBILE VIEW: High-Res Touch Carousel Slider (< md) */}
        <div className="block md:hidden relative max-w-md mx-auto my-6">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full cursor-pointer"
                onClick={() => navigate(`/product/${portfolioImages[mobileIndex].id}`)}
              >
                <img 
                  src={portfolioImages[mobileIndex].src} 
                  alt={portfolioImages[mobileIndex].title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 text-left space-y-1">
                  <span className="bg-[#C49A45] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-1">
                    {portfolioImages[mobileIndex].category}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {portfolioImages[mobileIndex].title}
                  </h3>
                  <p className="text-xs text-gray-300 flex items-center gap-1 font-semibold">
                    <Eye className="w-3.5 h-3.5 text-[#C49A45]" /> Tap to view design details
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Prev / Next Arrow Controls */}
            <button
              onClick={handlePrevMobile}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextMobile}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {portfolioImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  mobileIndex === idx ? 'w-8 bg-[#C49A45]' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP VIEW: Expanding Accordion Gallery (>= md) */}
        <div 
          className="hidden md:flex w-full h-[400px] lg:h-[450px] gap-4 mt-6" 
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {portfolioImages.map((item, index) => {
            let flexClass = 'flex-1';
            
            if (hoveredIndex !== null) {
              if (index === hoveredIndex) flexClass = 'flex-[2.5]'; 
              else if (Math.abs(index - hoveredIndex) === 1) flexClass = 'flex-[1.2]'; 
              else flexClass = 'flex-[0.7]'; 
            }

            return (
              <div 
                key={item.id} 
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => navigate(`/product/${item.id}`)}
                className={`relative h-full ${flexClass} transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden group rounded-2xl border border-white/10 cursor-pointer bg-white/5`}
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                {/* Desktop Hover Info */}
                <div className="absolute bottom-6 left-6 right-6 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-widest block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-white truncate">{item.title}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
        >
          <MagneticButton>
            <Link 
              to="/portfolio" 
              className="w-full sm:w-auto inline-flex h-[52px] items-center justify-center bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-8 font-black text-black text-xs rounded-xl transition-all duration-300 tracking-[0.15em] uppercase shadow-[0_10px_25px_rgba(196,154,69,0.35)] gap-2.5 group"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:text-white dark:group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link 
              to="/shop" 
              className="w-full sm:w-auto inline-flex h-[52px] items-center justify-center bg-black dark:bg-white/10 hover:bg-[#C49A45] dark:hover:bg-[#C49A45] text-white hover:text-black border border-transparent dark:border-white/10 px-8 font-black text-xs rounded-xl transition-all duration-300 tracking-[0.15em] uppercase shadow-lg gap-2.5 group"
            >
              <ShoppingBag className="w-4 h-4 text-[#C49A45] group-hover:text-black transition-colors" />
              <span>Shop All Designs</span>
            </Link>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
};

export default Portfolio;
