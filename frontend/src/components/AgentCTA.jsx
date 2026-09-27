import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Users, Globe, ShieldCheck, Banknote, Crown, CheckCircle, Palette } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

// 2. Decoding Hacker Text Effect
const DecryptText = ({ text }) => {
  const [display, setDisplay] = useState(text);
  const hasAnimated = useRef(false);

  const startDecrypt = () => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    let iterations = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    
    const interval = setInterval(() => {
      setDisplay(text.split("").map((letter, index) => {
        if(letter === " ") return " ";
        if(index < iterations) return letter;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if(iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  };

  return (
    <motion.span onViewportEnter={startDecrypt}>
      {display}
    </motion.span>
  );
};

// 3. Floating Ambient Particles
const particles = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100 + 10}%`,
  duration: Math.random() * 10 + 15, // Slow float
  delay: Math.random() * 5,
  xOffset: Math.random() * 80 - 40 // Gentle drift left/right
}));

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#C49A45]"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            boxShadow: `0 0 ${p.size * 2}px rgba(196,154,69,0.6)`
          }}
          animate={{
            y: [0, -400],
            opacity: [0, 0.8, 0],
            x: [0, p.xOffset]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const AgentCTA = () => {
  // 3D Card Hover Effect setup
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);
  
  // 3. Holographic Glare Transforms (Moves opposite to tilt)
  const glareX = useTransform(x, [-150, 150], [50, -50]);
  const glareY = useTransform(y, [-150, 150], [50, -50]);
  const glareOpacity = useTransform(y, [-150, 0, 150], [0.6, 0.2, 0.6]);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const perks = [
    { icon: <Banknote className="w-5 h-5 text-[#C49A45]" />, title: "Earn From Every Sale", desc: "Keep up to 80% of every digital design file you sell on the marketplace." },
    { icon: <Globe className="w-5 h-5 text-[#C49A45]" />, title: "Reach Global Buyers", desc: "Your designs get exposure to tailors & fashion houses worldwide." },
    { icon: <ShieldCheck className="w-5 h-5 text-[#C49A45]" />, title: "Secure Payouts", desc: "Automated, reliable payments directly to your account." },
  ];

  return (
    <section className="bg-[#0A0A0A] py-24 lg:py-32 overflow-hidden relative">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-[#C49A45] rounded-full blur-[150px] opacity-10 pointer-events-none z-0"></div>
      
      <FloatingParticles />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* Left: Text Content & Perks */}
        <div className="pr-0 lg:pr-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Palette className="w-10 h-10 text-[#C49A45]" strokeWidth={1} />
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                SELL YOUR <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C49A45] to-[#E5C170]">DESIGNS</span>
              </h2>
            </div>
            
            <p className="text-gray-300 dark:text-gray-400 text-[16px] font-medium mb-10 leading-relaxed max-w-lg">
              Are you a talented digitizer or embroidery designer? Register on our marketplace to upload, price, and sell your premium designs to buyers across the globe.
            </p>

            <div className="space-y-6 mb-12">
              {perks.map((perk, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(196,154,69,0.1)]">
                    {perk.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-[14px] mb-1">{perk.title}</h4>
                    <p className="text-gray-300 dark:text-gray-400 text-[13px]">{perk.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <MagneticButton>
                <Link to="/register" className="shimmer-btn relative overflow-hidden inline-flex h-[55px] items-center justify-center bg-[#C49A45] hover:bg-white px-10 font-bold text-white hover:text-black text-[13px] rounded-sm transition-colors tracking-widest shadow-[0_10px_30px_rgba(196,154,69,0.3)] uppercase group">
                  Register As A Designer
                  <CheckCircle className="w-4 h-4 ml-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: 3D Floating VIP Card */}
        <div 
          className="flex justify-center items-center h-[500px] cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
        >
          <motion.div 
            ref={cardRef}
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d" 
            }}
            className="w-[320px] sm:w-[380px] h-[500px] rounded-[30px] bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative p-8 flex flex-col justify-between overflow-hidden"
          >
            {/* Holographic Glare overlay */}
            <motion.div 
              className="absolute inset-0 rounded-[30px] pointer-events-none mix-blend-overlay"
              style={{
                x: glareX,
                y: glareY,
                opacity: glareOpacity,
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 60%)'
              }}
            />
            
            <div className="absolute inset-0 opacity-10 pointer-events-none rounded-[30px]">
              <svg viewBox="0 0 100 100" className="w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4">
                <path d="M-50,150 Q250,-50 500,100 T1050,-50" stroke="#C49A45" strokeWidth="1" fill="none" />
                <path d="M-50,160 Q250,-40 500,110 T1050,-40" stroke="#C49A45" strokeWidth="1" fill="none" />
              </svg>
            </div>

            <div style={{ transform: "translateZ(40px)" }} className="relative flex justify-between items-start">
              <Crown className="w-8 h-8 text-[#C49A45]" />
              <div className="text-right">
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">DA-WINGS GLOBAL</p>
                <p className="text-[10px] text-[#C49A45] font-bold uppercase tracking-widest border border-[#C49A45]/30 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm inline-block">
                  VIP DESIGNER
                </p>
              </div>
            </div>

            <div style={{ transform: "translateZ(60px)" }} className="relative py-10 flex flex-col items-center justify-center">
              <div className="w-12 h-10 rounded-md bg-gradient-to-br from-[#E5C170] to-[#C49A45] mb-8 shadow-inner border border-yellow-200/20 relative overflow-hidden flex items-center justify-center">
                <div className="w-[1px] h-full bg-black/20 absolute left-1/3"></div>
                <div className="w-[1px] h-full bg-black/20 absolute right-1/3"></div>
                <div className="w-full h-[1px] bg-black/20 absolute top-1/2"></div>
              </div>
              <h3 className="text-white font-serif font-bold text-2xl tracking-widest text-center">
                DESIGNER <br/> <DecryptText text="ID: 8402" />
              </h3>
            </div>

            <div style={{ transform: "translateZ(40px)" }} className="relative flex justify-between items-end border-t border-white/10 pt-6">
              <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">Member Since</p>
                <p className="text-white font-mono text-[13px]">2026</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1 text-right">Clearance</p>
                <p className="text-[#C49A45] font-mono text-[13px] text-right"><DecryptText text="LEVEL 05" /></p>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AgentCTA;
