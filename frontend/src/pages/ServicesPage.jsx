import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { allServices } from '../data/servicesData';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

const ServicesPage = () => {
  // Ensure page loads at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] flex flex-col font-sans relative text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow pt-20 sm:pt-22 pb-32 relative z-10 overflow-hidden">
        
        {/* Full Section Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            src="/images/design_monogram.png" 
            alt="Background" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover scale-105 opacity-25 dark:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF8]/70 via-[#FFFDF8]/40 to-[#F5EFE4]/80 dark:from-[#050505]/70 dark:via-[#050505]/40 dark:to-[#050505]/80"></div>
        </div>

        {/* Page Header - Editorial Split Layout */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12"
          >
            {/* Left Side: Title */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 mb-6 backdrop-blur-md shadow-sm">
                <Sparkles className="w-4 h-4 text-[#C49A45]" />
                <span className="font-extrabold text-gray-800 dark:text-gray-300 text-[11px] tracking-[0.2em] uppercase">The Global Ecosystem</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] break-words">
                COMPREHENSIVE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C49A45] to-amber-500">SOLUTIONS</span>
              </h1>
            </div>

            {/* Right Side: Description & Badge */}
            <div className="max-w-lg flex flex-col items-start">
              <p className="text-gray-700 dark:text-gray-300 text-[15px] sm:text-[16px] leading-relaxed mb-8 text-left font-medium">
                From ultra-precise digitizing to machine engineering and a global marketplace, discover the complete suite of solutions powering the modern embroidery industry.
              </p>
              
              {/* Statistics Badge */}
              <div className="inline-flex items-center gap-5 bg-white/90 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#050505] bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white">SJ</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#050505] bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white">MC</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#050505] bg-gray-700 flex items-center justify-center text-[10px] font-bold text-white">ER</div>
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#050505] bg-[#C49A45] flex items-center justify-center text-[11px] font-bold text-black">+</div>
                </div>
                <div className="text-left">
                  <p className="text-gray-900 dark:text-white font-black text-xl leading-none mb-1">5k+</p>
                  <p className="text-[#C49A45] text-[10px] font-bold tracking-widest uppercase">Satisfied Clients</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services Grid with Subtle Background Blob */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Subtle Background Glow behind the grid */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#C49A45]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          >
            {allServices.map((service) => (
              <motion.div 
                key={service.id}
                variants={cardVariants}
                className="bg-white/85 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-amber-900/10 dark:border-white/10 shadow-xl hover:shadow-[0_20px_50px_rgba(196,154,69,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between items-start group"
              >
                <div className="w-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#C49A45]/10 border border-[#C49A45]/30 flex items-center justify-center text-[#C49A45] mb-6 group-hover:bg-[#C49A45] group-hover:text-black transition-colors duration-300 shadow-sm">
                    <service.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.3] mb-3 group-hover:text-[#C49A45] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 text-[14px] leading-relaxed mb-8 font-medium">
                    {service.desc}
                  </p>
                </div>
                
                {/* Read More Link */}
                <Link to={`/services/${service.slug}`} className="flex items-center gap-3 mt-auto transform group-hover:translate-x-2 transition-transform duration-300 relative z-30 w-fit">
                  <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center group-hover:bg-[#C49A45] transition-colors">
                    <ArrowRight className="w-4 h-4 text-white dark:text-black group-hover:text-black transition-colors" />
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white text-[13px] group-hover:text-[#C49A45] transition-colors">Read More</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
