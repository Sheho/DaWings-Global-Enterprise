import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CUSTOM COMPONENTS FOR WORLD-CLASS DESIGN ---

const FloatingInput = ({ label, type = "text", rows }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  
  const isActive = isFocused || value !== "";

  return (
    <div className="relative w-full pt-6">
      <motion.label
        initial={false}
        animate={{
          y: isActive ? -24 : 0,
          scale: isActive ? 0.85 : 1,
        }}
        className={`absolute left-0 top-6 text-[13px] font-bold origin-left pointer-events-none transition-colors ${
          isActive ? 'text-[#C49A45]' : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        {label}
      </motion.label>
      
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={rows}
          className="w-full bg-transparent border-b border-gray-300 dark:border-white/20 px-0 py-2 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:border-[#C49A45] transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-b border-gray-300 dark:border-white/20 px-0 py-2 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:border-[#C49A45] transition-colors"
        />
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const testimonials = [
  {
    text: "Working with DA-WINGS GLOBAL has been an absolute pleasure from start to finish. Their team's expertise in digitizing allowed them to bring our vision to life with precision and creativity.",
    name: "Sarah Johnson",
    role: "Chief Marketing Officer at Tech Savvy Solutions"
  },
  {
    text: "The quality of the 3D puff embroidery files they provided was nothing short of spectacular. We were able to scale our production globally without a single glitch in the machines.",
    name: "Michael Chen",
    role: "Head of Production, Urban Stitch"
  },
  {
    text: "Their attention to detail and fast turnaround times have made them an invaluable partner for our seasonal luxury collections. Truly a premium digitizing service.",
    name: "Elena Rodriguez",
    role: "Creative Director, ER Designs"
  }
];

// Staggered Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const ContactPage = () => {
  const [agreed, setAgreed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow relative flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Clean Background Pattern */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/images/design_monogram.png" 
            alt="Background" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover scale-105 opacity-25 dark:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF8]/70 via-[#FFFDF8]/40 to-[#F5EFE4]/80 dark:from-[#050505]/70 dark:via-[#050505]/40 dark:to-[#050505]/80"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[1200px] bg-white/85 dark:bg-black/40 backdrop-blur-2xl border border-amber-900/10 dark:border-white/10 rounded-[32px] p-4 lg:p-6 shadow-xl flex flex-col lg:flex-row gap-8 lg:gap-16"
        >
          
          {/* Left Side - Image & Testimonial */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative w-full lg:w-1/2 h-[500px] lg:h-[700px] rounded-[24px] overflow-hidden group"
          >
            {/* Inner Image */}
            <img 
              src="/images/hero_agbada.png" 
              alt="Premium Embroidery" 
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Subtle base gradient so text is always readable */}
            <div className="absolute inset-0 bg-black/30 dark:bg-black/20"></div>
            
            {/* Glassmorphic Content Card at the bottom */}
            <div className="absolute bottom-6 left-6 right-6 p-6 sm:p-8 bg-black/70 dark:bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl flex flex-col justify-end shadow-2xl">
              
              <div className="relative min-h-[140px] sm:min-h-[120px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <p className="text-gray-100 dark:text-gray-200 text-sm sm:text-base leading-relaxed mb-6 font-medium italic">
                      "{testimonials[activeIndex].text}"
                    </p>
                    
                    <div>
                      <h4 className="text-white font-bold text-sm">{testimonials[activeIndex].name}</h4>
                      <p className="text-[#C49A45] text-xs mt-1 font-bold tracking-wide">{testimonials[activeIndex].role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Auto-sliding Progress Indicators */}
              <div className="flex gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <div key={idx} className="h-[2px] flex-1 bg-white/20 rounded-full overflow-hidden">
                    {idx === activeIndex && (
                      <motion.div 
                        className="h-full bg-[#C49A45]" 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                      />
                    )}
                    {idx < activeIndex && (
                      <div className="h-full bg-[#C49A45] w-full" />
                    )}
                  </div>
                ))}
              </div>
              
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full lg:w-1/2 flex flex-col justify-center px-2 sm:px-6 lg:pr-12 py-8 lg:py-0"
          >
            
            {/* Form Header */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center gap-2 mb-8">
                <span className="text-[#C49A45] text-lg leading-none">👑</span>
                <span className="font-extrabold text-gray-900 dark:text-white text-sm tracking-wide">DA-WINGS GLOBAL</span>
              </div>
              
              <div className="overflow-hidden mb-4">
                <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                  Have a project idea?
                </motion.h1>
                <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-black text-[#C49A45] italic tracking-tight leading-[1.1] mt-2">
                  Let's discuss it.
                </motion.h1>
              </div>
              <motion.p variants={itemVariants} className="text-gray-700 dark:text-gray-300 text-sm max-w-md leading-relaxed font-medium">
                We are always open to new opportunities. Feel free to drop us a line if you have any questions or projects.
              </motion.p>
            </motion.div>

            {/* Form Fields */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <FloatingInput label="First Name" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FloatingInput label="Last Name" />
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <FloatingInput label="Email Address" type="email" />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FloatingInput label="Message" rows={3} />
              </motion.div>

              {/* Checkbox */}
              <motion.div variants={itemVariants} className="flex items-center gap-4 pt-6">
                <button 
                  type="button"
                  onClick={() => setAgreed(!agreed)}
                  className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${agreed ? 'bg-[#C49A45] border-[#C49A45]' : 'bg-transparent border-gray-300 dark:border-white/20'}`}
                >
                  {agreed && <Check className="w-3.5 h-3.5 text-black dark:text-white font-bold" />}
                </button>
                <span className="text-[12px] text-gray-600 dark:text-gray-400 font-medium">
                  By clicking the button you agree to our terms and conditions.
                </span>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded-xl transition-all duration-300 shadow-xl"
                >
                  Send Message
                </button>
              </motion.div>
            </form>
            
          </motion.div>
          
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
