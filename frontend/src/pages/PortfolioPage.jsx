import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// A mix of images to simulate a rich gallery
const galleryImages = [
  { id: 1, src: '/images/hero_agbada.png', title: 'Wedding Agbada Excellence', span: 'col-span-1 row-span-2' },
  { id: 2, src: '/images/design_monogram.png', title: 'Custom Initials & Crests', span: 'col-span-1 row-span-1' },
  { id: 3, src: '/images/design_cap.png', title: 'Traditional Royal Fila Cap', span: 'col-span-1 row-span-1' },
  { id: 4, src: '/images/about_studio.png', title: 'Behind The Scenes Studio', span: 'col-span-2 row-span-1' },
  { id: 5, src: '/images/hero_agbada.png', title: 'Luxury Black & Gold Attire', span: 'col-span-1 row-span-1' },
  { id: 6, src: '/images/design_monogram.png', title: 'Corporate Monogram Crest', span: 'col-span-1 row-span-2' },
];

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] text-gray-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow pt-20 sm:pt-22 pb-24 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 mb-6 backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C49A45]" />
              <span className="text-xs font-bold text-gray-800 dark:text-gray-300 uppercase tracking-widest">
                Inspiration Gallery
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6 break-words"
            >
              OUR CRAFT IN <span className="text-[#C49A45] italic">REALITY</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-700 dark:text-gray-400 text-sm sm:text-base leading-relaxed font-medium"
            >
              A curated collection of completed physical garments and embroidery projects. Witness the quality, precision, and passion we pour into every stitch.
            </motion.p>
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-6">
            {galleryImages.map((img) => (
              <div 
                key={img.id} 
                className={`relative group overflow-hidden bg-white dark:bg-white/5 border border-amber-900/10 dark:border-white/10 ${img.span} rounded-2xl shadow-xl backdrop-blur-md`}
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 dark:opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg">{img.title}</h3>
                  <div className="h-[2px] w-12 bg-[#C49A45] mt-2"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
