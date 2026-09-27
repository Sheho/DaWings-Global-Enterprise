import { motion } from 'framer-motion';
import { Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './ui/MagneticButton';

const Engineering = () => {
  return (
    <section id="engineering" className="py-24 bg-white dark:bg-[#050505] text-gray-900 dark:text-white relative overflow-hidden border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C49A45]/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#C49A45] font-bold text-[11px] tracking-[0.2em] uppercase mb-4 block flex items-center gap-2">
              <Wrench className="w-4 h-4" /> Technical Support
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              MACHINE REPAIR &<br/>SPARE PARTS
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-[14px] leading-relaxed mb-8 max-w-lg">
              Our commitment goes beyond digitization. DA-WINGS provides world-class technical support, genuine spare parts, and on-the-ground repair services for high-end industrial embroidery machines.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton>
                <Link 
                  to="/engineers" 
                  className="inline-flex h-[52px] items-center justify-center px-10 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black dark:hover:text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl border border-transparent dark:border-white/10 gap-3 group"
                >
                  <span>FIND AN ENGINEER</span>
                  <ArrowRight className="w-4 h-4 text-[#C49A45] group-hover:text-black dark:text-black group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-sm overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[#C49A45]/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
            <img 
              src="/images/engineering_repair.png" 
              alt="Machine Engineering" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Engineering;
