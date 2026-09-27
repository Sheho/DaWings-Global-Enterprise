import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

const Preloader = ({ onLoadingComplete }) => {
  useEffect(() => {
    // Pre-cache key site images in browser memory for instant rendering
    const imagesToPreload = [
      '/images/hero_agbada.png',
      '/images/laser_marking_tags.png',
      '/images/agbada_category.png',
      '/images/cap_category.png',
      '/images/flap_pocket_category.png',
      '/images/logo_category.png',
      '/images/monogram_category.png',
      '/images/about_studio.png',
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const handleLoad = () => {
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [onLoadingComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative flex flex-col items-center">
        {/* Orbital spinning rings for premium effect */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 rounded-full border border-t-[#C49A45] border-r-transparent border-b-transparent border-l-transparent opacity-50"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-40 h-40 rounded-full border border-b-[#C49A45] border-r-transparent border-t-transparent border-l-transparent opacity-30"
        />

        {/* Logo and Text */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center z-10"
        >
          <Crown className="w-12 h-12 text-[#C49A45] mb-4" strokeWidth={1.5} />
          <h1 className="text-3xl font-black tracking-[0.3em] text-white uppercase ml-2">
            DAWINGS
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="h-[2px] bg-[#C49A45] mt-4"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
