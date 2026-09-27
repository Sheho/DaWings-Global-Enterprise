import { Link } from 'react-router-dom';
import { Play, Diamond, ArrowRight, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import MagneticButton from './ui/MagneticButton';

const heroImages = [
  '/images/hero_agbada.png',
  '/images/design_monogram.png',
  '/images/design_cap.png',
  '/images/embroidery_corporate.png',
  '/images/embroidery_lace.png'
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative min-h-[85vh] md:h-[100svh] flex items-start md:items-center bg-[#FDFDFD] dark:bg-[#050505] bg-grain overflow-hidden pt-4 md:pt-16 transition-colors duration-300">
      
      {/* Background Ambient Gold Flares */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[300px] bg-[#C49A45]/10 dark:bg-[#C49A45]/5 blur-[140px] rounded-full pointer-events-none z-0"></div>

      {/* Right side absolute Image (The Massive Curve) */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-0 bottom-0 w-[55%] hidden md:block overflow-hidden rounded-tl-[250px] lg:rounded-tl-[350px] bg-gray-100 dark:bg-black/50 border-l border-amber-900/10 dark:border-white/10 z-0"
      >
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={currentImageIndex}
            src={heroImages[currentImageIndex]} 
            alt="Embroidered Designs" 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Floating Luxury Certification Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-10 left-10 z-20 bg-white/90 dark:bg-black/80 backdrop-blur-2xl border border-amber-900/10 dark:border-white/15 p-4 rounded-2xl shadow-2xl flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-[#C49A45]/15 border border-[#C49A45]/30 flex items-center justify-center text-[#C49A45] shrink-0">
            <Crown className="w-5 h-5 text-[#C49A45]" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C49A45] block">
              Master Digitizing
            </span>
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              Zero Thread-Break Certified
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Container */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Left Text Content */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="w-full md:w-[45%] pr-0 md:pr-12 py-4 sm:py-8 md:py-12"
        >
          {/* Top Label */}
          <motion.div variants={item} className="flex items-center gap-2 text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3 sm:mb-6">
            <Diamond className="w-2 h-2 text-[#C49A45]" fill="currentColor" /> PREMIUM DIGITIZING & LASER MARKING
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={item} className="text-3xl sm:text-5xl lg:text-[75px] font-normal text-black dark:text-white tracking-tight leading-[1.1] mb-6 break-words">
            African <span className="text-[#C49A45] font-serif italic">Styles.</span><br />
            Global<br />
            Designs.
          </motion.h1>
          
          {/* Paragraph */}
          <motion.p variants={item} className="text-[14px] text-gray-700 dark:text-gray-300 font-medium mb-12 max-w-sm leading-relaxed">
            Discover premium digitization designed to bring flawless execution, rich texture, and timeless elegance to your brand's everyday wardrobe. Explore our latest collections.
          </motion.p>
          
          {/* Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <MagneticButton>
              <Link 
                to="/quote" 
                className="inline-flex h-[55px] px-10 items-center justify-center bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black dark:hover:text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl border border-transparent dark:border-white/10 gap-3 group"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 text-[#C49A45] group-hover:text-black dark:text-black group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </MagneticButton>

            <Link to="/portfolio" className="inline-flex items-center justify-center bg-transparent font-bold text-gray-900 dark:text-white hover:text-[#C49A45] dark:hover:text-[#C49A45] text-xs uppercase tracking-widest transition-colors gap-2.5 py-3">
              <Play className="w-3.5 h-3.5 text-[#C49A45]" fill="currentColor" /> Explore Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
