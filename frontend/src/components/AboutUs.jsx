import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

// Helper component for counting numbers
const Counter = ({ from, to, duration, suffix = "", isK = false }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            const val = Math.floor(value);
            if (isK && val >= to) {
              nodeRef.current.textContent = `5k${suffix}`;
            } else {
              nodeRef.current.textContent = `${val}${suffix}`;
            }
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, isInView, suffix, isK]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

const AboutUs = () => {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden flex items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] transition-colors duration-300 border-t border-amber-900/10 dark:border-white/5">
      
      {/* Ambient Gold Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-amber-500/15 dark:bg-amber-600/10 blur-[140px] rounded-full pointer-events-none"></div>

      {/* Clean & Vibrant Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/images/design_monogram.png" 
          alt="Background Pattern" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover scale-105 opacity-35 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF8]/70 via-[#FFFDF8]/30 to-[#F5EFE4]/80 dark:from-[#050505]/70 dark:via-[#050505]/40 dark:to-[#050505]/80"></div>
      </div>

      {/* Main Glassmorphism Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-[90%] max-w-[72rem] mx-auto bg-white/85 dark:bg-white/5 backdrop-blur-2xl border border-amber-900/10 dark:border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-none p-8 sm:p-12 lg:p-16 overflow-hidden my-12 text-gray-900 dark:text-white"
      >

        {/* Top Section: Text and Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 mb-20 relative z-10">
          

          {/* Left: Text Content */}
          <div className="flex flex-col justify-center relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C49A45]/10 border border-[#C49A45]/30 w-fit mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
              <span className="text-[11px] font-extrabold text-[#C49A45] uppercase tracking-widest">
                DA-WINGS HERITAGE & CRAFT
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6 uppercase">
              ABOUT <span className="text-[#C49A45] italic">US</span>
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 text-[14px] leading-relaxed mb-6 font-medium">
              At DA-WINGS GLOBAL, we believe premium digitizing is more than just translating a file—it's about preserving the soul and authenticity of the original design. Whether you're creating complex Agbadas, intricate caps, or luxury monograms, we design files around what truly matters to you.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-[14px] leading-relaxed mb-10 font-medium">
              With expert precision, trusted global partners, and a passion for African fashion, we make production effortless, inspiring, and unforgettable.
            </p>

            <div>
              <MagneticButton>
                <Link 
                  to="/about" 
                  className="inline-flex h-[52px] items-center justify-center px-10 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black dark:hover:text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl border border-transparent dark:border-white/10 gap-3 group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 text-[#C49A45] group-hover:text-black dark:text-black group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Right: Overlapping Images Collage */}
          <div className="relative h-[320px] sm:h-[420px] flex items-center justify-center z-10">
            {/* Image 1 (Background/Left) */}
            <motion.div 
              initial={{ opacity: 0, x: 20, rotate: 0 }}
              whileInView={{ opacity: 1, x: -40, rotate: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute w-52 sm:w-64 h-52 sm:h-64 rounded-2xl shadow-xl overflow-hidden z-10 border-2 border-[#C49A45]/20"
            >
              <img src="/images/about_studio.png" alt="Studio" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </motion.div>
            
            {/* Image 2 (Foreground/Right, Rotated) */}
            <motion.div 
              initial={{ opacity: 0, x: -20, rotate: 0 }}
              whileInView={{ opacity: 1, x: 40, rotate: 7 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute w-60 sm:w-72 h-60 sm:h-72 rounded-2xl shadow-2xl overflow-hidden z-20 border-4 border-white dark:border-white/10"
            >
              <img src="/images/hero_agbada.png" alt="Agbada Design" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>

        {/* Bottom Section: Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-amber-900/10 dark:border-white/10 relative z-10">
          <div className="text-center">
            <h4 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-2">
              <Counter from={0} to={5000} duration={1.5} isK={true} suffix="+" />
            </h4>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">Happy Clients</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-2">
              <Counter from={0} to={50} duration={1.5} suffix="+" />
            </h4>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">Global Partners</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl sm:text-4xl font-black text-[#C49A45] mb-2">
              <Counter from={0} to={98} duration={1.5} suffix="%" />
            </h4>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-2">
              <Counter from={0} to={10} duration={1.5} suffix="+" />
            </h4>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">Years Experience</p>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default AboutUs;
