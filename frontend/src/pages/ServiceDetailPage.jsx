import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/ui/MagneticButton';
import { allServices } from '../data/servicesData';

const ServiceDetailPage = () => {
  const { id } = useParams();
  
  // Find the specific service from the slug
  const service = allServices.find((s) => s.slug === id);

  // If URL is invalid, redirect to Services overview
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] flex flex-col font-sans relative text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/images/design_monogram.png" 
          alt="Background" 
          className="w-full h-full object-cover scale-105 blur-[5px] opacity-10 dark:opacity-20"
        />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#C49A45]/5 blur-[120px] rounded-full"></div>
      </div>

      <main className="flex-grow pt-20 sm:pt-22 pb-32 relative z-10 overflow-hidden">
        
        {/* HERO SECTION */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[#C49A45] mb-8 shadow-lg dark:shadow-[0_0_30px_rgba(196,154,69,0.15)] border border-gray-200 dark:border-white/10">
              <ServiceIcon className="w-10 h-10" strokeWidth={1.5} />
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#C49A45] text-xl leading-none">👑</span>
              <span className="font-bold text-gray-500 dark:text-gray-400 text-[12px] tracking-[0.2em] uppercase">Premium Service</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-8 max-w-4xl">
              {service.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C49A45] to-[#E5C170]">{service.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
              {service.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {service.ctas?.map((cta, index) => (
                <MagneticButton key={index}>
                  <Link 
                    to={cta.link} 
                    className={`inline-flex h-[55px] items-center justify-center px-10 font-bold text-[14px] rounded-sm transition-colors duration-300 tracking-widest uppercase ${
                      cta.primary 
                        ? 'bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black'
                        : 'bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white'
                    }`}
                  >
                    {cta.text}
                  </Link>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </div>

        {/* WHY CHOOSE US SECTION */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.features?.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
                className="bg-gray-50 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors shadow-sm dark:shadow-none"
              >
                <div className="w-12 h-12 rounded-full bg-[#C49A45]/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-[#C49A45]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        {!service.hideBottomCTA && (
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-[#1A1A1A] via-[#0D0D0D] to-[#050505] text-white border border-[#C49A45]/30 rounded-3xl p-6 sm:p-10 md:p-14 text-center relative overflow-hidden shadow-2xl"
            >
              {/* Gold Ambient Flare */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-[#C49A45]/15 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center">
                <span className="text-[#C49A45] text-[10px] font-black uppercase tracking-[0.25em] mb-3 border border-[#C49A45]/30 px-3.5 py-1 rounded-full bg-black/40">
                  DA-WINGS GLOBAL QUALITY
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 max-w-2xl leading-tight">
                  Ready to elevate your production?
                </h2>
                <p className="text-gray-300 font-medium text-xs sm:text-base mb-8 max-w-xl leading-relaxed">
                  Send us your artwork today and experience the Da-Wings Global standard of excellence.
                </p>
                <MagneticButton>
                  <Link 
                    to="/contact" 
                    className="inline-flex h-12 sm:h-[55px] items-center justify-center bg-[#C49A45] hover:bg-white text-black font-black text-xs sm:text-sm px-6 sm:px-10 rounded-xl transition-all duration-300 tracking-widest uppercase shadow-xl hover:-translate-y-0.5 gap-2 shrink-0 whitespace-nowrap"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="w-4 h-4 text-black shrink-0" />
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        )}

      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
