import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Scissors, Award, Zap, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/ui/MagneticButton';

// Minimalist Counter Component
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

// Testimonial Data
const testimonials = [
  {
    quote: "The quality of their Agbada digitizing is unmatched. Zero thread breaks on production — my customers can always tell the difference.",
    name: "Alhaji Musa K.",
    role: "Master Tailor, Lagos",
    initials: "MK",
  },
  {
    quote: "We switched to Da-Wings for all our corporate logo digitizing. The turnaround time and stitch precision saved us weeks of rework.",
    name: "Sarah O.",
    role: "Production Manager, Accra",
    initials: "SO",
  },
  {
    quote: "Their machine engineers diagnosed and fixed our embroidery machine remotely within hours. Incredible support network.",
    name: "Ibrahim D.",
    role: "Factory Owner, Kano",
    initials: "ID",
  },
  {
    quote: "We've tested many digitizers across West Africa. Da-Wings is the only one that consistently delivers files our machines run without adjustments.",
    name: "Chioma A.",
    role: "Textile Business Owner, Aba",
    initials: "CA",
  },
  {
    quote: "The monogram designs are exquisite. Our luxury clients specifically request Da-Wings quality now. It's become a selling point for us.",
    name: "Fatima B.",
    role: "Bridal Fashion Designer, Abuja",
    initials: "FB",
  },
];

// Testimonial Slider Component
const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Reset timer when user clicks a dot
  const handleDotClick = (index) => {
    clearInterval(intervalRef.current);
    goTo(index);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const t = testimonials[current];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-[85rem] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 text-center sm:text-left"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C49A45]/10 border border-[#C49A45]/30 mb-3 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
          <span className="text-[11px] font-extrabold text-[#C49A45] uppercase tracking-widest">
            Client Testimonials
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          What Our Clients Say
        </h2>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {/* Slider Card */}
        <div className="bg-white/90 dark:bg-white/5 backdrop-blur-2xl border border-amber-900/10 dark:border-white/10 rounded-3xl p-10 sm:p-14 relative overflow-hidden min-h-[260px] flex flex-col justify-center shadow-xl dark:shadow-none">
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-4 h-4 text-[#C49A45]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-900 dark:text-gray-200 text-lg sm:text-xl leading-relaxed mb-8 font-semibold italic">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C49A45]/20 border border-[#C49A45]/40 flex items-center justify-center text-[11px] font-black text-[#C49A45]">
                  {t.initials}
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white text-sm font-bold">{t.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current 
                  ? 'w-8 bg-[#C49A45]' 
                  : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] flex flex-col font-sans selection:bg-[#C49A45] selection:text-white text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow relative overflow-hidden">

        {/* Background Image - Shared across page */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            src="/images/hero_agbada.png" 
            alt="Background" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover scale-105 opacity-25 dark:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF8]/70 via-[#FFFDF8]/40 to-[#F5EFE4]/80 dark:from-[#050505]/70 dark:via-[#050505]/40 dark:to-[#050505]/80"></div>
        </div>

        {/* SECTION 1: HERO — Bold, Confident Opening */}
        <section className="relative z-10 pt-20 sm:pt-22 pb-24 px-4 sm:px-6 lg:px-8 max-w-[85rem] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12"
          >
            {/* Left: The Statement */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C49A45]"></div>
                <span className="font-extrabold text-gray-600 dark:text-gray-400 text-[11px] tracking-[0.2em] uppercase">About Da-Wings Global</span>
              </div>
              <h1 className="text-2xl sm:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.05] break-words">
                10+ Years Powering <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C49A45] to-amber-500">Africa's Finest</span> <br/>
                Embroidery.
              </h1>
            </div>

            {/* Right: Supporting Text */}
            <div className="max-w-md">
              <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed mb-8 font-medium">
                We bridge the gap between traditional craftsmanship and modern production. Every file we deliver is engineered for precision, built for your machines, and designed to preserve the soul of the original artwork.
              </p>
              <MagneticButton>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-[#C49A45] font-extrabold text-xs uppercase tracking-widest hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                >
                  Explore Our Services <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: WHAT SETS US APART — 4 Pillars */}
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-[85rem] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              What Sets Us Apart
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Scissors, title: "Uncompromising Quality", desc: "Every design is manually digitized and tested for optimal stitch density, ensuring smooth runs on any fabric." },
              { icon: Award, title: "Cultural Precision", desc: "We specialize in traditional attire, preserving the authentic flow of intricate Agbada and cultural patterns." },
              { icon: Globe, title: "Global Network", desc: "From local tailors to international fashion houses, our trusted network of clients and agents spans 15+ countries." },
              { icon: Zap, title: "Rapid Turnaround", desc: "Fast delivery times with direct access to machine engineers, so your production never stops." },
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-amber-900/10 dark:border-white/10 rounded-2xl p-7 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 group shadow-md dark:shadow-none"
              >
                <div className="w-11 h-11 bg-[#C49A45]/10 border border-[#C49A45]/30 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#C49A45] transition-colors duration-300">
                  <pillar.icon className="w-5 h-5 text-[#C49A45] group-hover:text-black transition-colors duration-300" />
                </div>
                <h4 className="text-[15px] font-bold text-gray-900 dark:text-white mb-2">{pillar.title}</h4>
                <p className="text-gray-700 dark:text-gray-400 text-xs leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: THE NUMBERS — Social Proof */}
        <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-[85rem] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/85 dark:bg-white/5 backdrop-blur-2xl border border-amber-900/10 dark:border-white/10 rounded-3xl py-10 px-8 max-w-[60rem] mx-auto shadow-xl dark:shadow-none"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center items-center">
              <div>
                <h4 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-1">
                  <Counter from={0} to={5000} duration={2} isK={true} suffix="+" />
                </h4>
                <p className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-bold tracking-widest">Happy Clients</p>
              </div>
              <div>
                <h4 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-1">
                  <Counter from={0} to={50} duration={2} suffix="+" />
                </h4>
                <p className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-bold tracking-widest">Global Partners</p>
              </div>
              <div>
                <h4 className="text-3xl sm:text-4xl font-black text-[#C49A45] mb-1">
                  <Counter from={0} to={98} duration={2} suffix="%" />
                </h4>
                <p className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-bold tracking-widest">Satisfaction Rate</p>
              </div>
              <div>
                <h4 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-1">
                  <Counter from={0} to={10} duration={2} suffix="+" />
                </h4>
                <p className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-bold tracking-widest">Years Experience</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 4: TESTIMONIALS — Animated Slider */}
        <TestimonialSlider />

        {/* SECTION 5: CTA — Simple & Direct */}
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-6">
              Let's work together.
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-10 font-medium">
              Start your project with a team that understands quality.
            </p>
            <MagneticButton>
              <Link 
                to="/contact" 
                className="inline-flex h-[52px] items-center justify-center px-10 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black dark:hover:text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl border border-transparent dark:border-white/10 gap-3 group"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4 text-[#C49A45] group-hover:text-black dark:text-black group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </MagneticButton>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
