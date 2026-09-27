import { CloudUpload, Laptop, ShieldCheck, Send, ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';

const steps = [
  {
    id: 1,
    title: 'UPLOAD YOUR DESIGN',
    shortDesc: 'Submit your artwork, sketches, or vector files online in any format.',
    detail: 'Upload your raw design or idea. Our system accepts vector files (AI, SVG, PNG, PDF) and existing embroidery formats.',
    icon: CloudUpload,
    badge: 'Step 01',
  },
  {
    id: 2,
    title: 'PRECISION CRAFTING',
    shortDesc: 'Fiber laser marking & high-density stitch digitizing by master craftsmen.',
    detail: 'Our master digitizers recalculate stitch paths and density, while fiber laser machines engrave metal tags with micro precision.',
    icon: Laptop,
    badge: 'Step 02',
  },
  {
    id: 3,
    title: 'QUALITY & SAFETY TESTING',
    shortDesc: '100% stitch-break testing & material density verification.',
    detail: 'Every file is sample-stitched and tested for puckering, thread breaks, and metal tag scratch resistance before approval.',
    icon: ShieldCheck,
    badge: 'Step 03',
  },
  {
    id: 4,
    title: 'SEAMLESS FINAL DELIVERY',
    shortDesc: 'Instant digital file download & swift worldwide hardware shipping.',
    detail: 'Download your machine-ready DST/PES files instantly or receive your custom laser metal tag batches at your doorstep.',
    icon: Send,
    badge: 'Step 04',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-[#050505] text-center relative overflow-hidden font-sans text-gray-900 dark:text-white transition-colors duration-300" id="workflow">
      
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none opacity-[0.02] dark:opacity-[0.04] z-0">
        <h2 className="text-[100px] sm:text-[180px] font-black text-black dark:text-white leading-none tracking-tighter select-none whitespace-nowrap">
          WORKFLOW
        </h2>
      </div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-24"
        >
          <span className="text-[#C49A45] font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
            End-To-End Precision
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-black dark:text-white tracking-tight">
            OUR GLOBAL <span className="text-[#C49A45] italic">WORKFLOW</span>
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            From your initial upload to final crafting and delivery—discover how Dawings Global guarantees zero thread breaks, high-density perfection, and rapid turnaround times.
          </p>
        </motion.div>
        
        {/* DESKTOP WORKFLOW (Horizontal Timeline) */}
        <div className="hidden md:flex justify-between items-start relative max-w-5xl mx-auto mb-20">
          
          {/* Animated Connector Line */}
          <div className="absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-gray-100 dark:bg-white/10 -z-10 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-transparent via-[#C49A45] to-transparent w-1/3"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="flex flex-col items-center bg-transparent px-2 group cursor-default max-w-[200px]"
              >
                <div className="relative">
                  <div className="w-[90px] h-[90px] rounded-2xl border-2 border-gray-200 dark:border-white/15 group-hover:border-[#C49A45] bg-white dark:bg-[#0A0A0A] flex items-center justify-center text-gray-500 dark:text-gray-300 group-hover:text-[#C49A45] mb-6 relative z-10 transition-all duration-300 shadow-sm group-hover:shadow-[0_10px_30px_rgba(196,154,69,0.25)] group-hover:scale-105">
                    <IconComponent className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-black dark:bg-[#C49A45] text-white dark:text-black text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-black z-20 group-hover:bg-[#C49A45] group-hover:text-black transition-colors">
                    0{step.id}
                  </div>
                </div>
                
                <h3 className="text-xs font-black text-gray-900 dark:text-white tracking-wider uppercase leading-snug text-center mb-2 group-hover:text-[#C49A45] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed text-center">
                  {step.shortDesc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* MOBILE WORKFLOW (Connected Vertical Flow Card Timeline) */}
        <div className="block md:hidden relative max-w-md mx-auto mb-16 text-left pl-6">
          
          {/* Vertical Glowing Connecting Line */}
          <div className="absolute left-[27px] top-6 bottom-6 w-[3px] bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-[#C49A45] via-amber-500 to-black dark:to-white h-1/2"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative flex items-start gap-4 group"
                >
                  {/* Step Node Icon on Vertical Line */}
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-black dark:bg-[#0A0A0A] border-2 border-[#C49A45] text-[#C49A45] flex items-center justify-center font-black text-xs shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5 text-[#C49A45]" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C49A45] text-black text-[9px] font-black rounded-full flex items-center justify-center">
                      0{step.id}
                    </span>
                  </div>

                  {/* Step Flow Card */}
                  <div className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:border-[#C49A45] transition-colors">
                    <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-widest block mb-1">
                      {step.badge}
                    </span>
                    <h3 className="text-sm font-black text-gray-900 dark:text-white tracking-wide uppercase mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <MagneticButton>
            <a 
              href="/shop" 
              className="shimmer-btn group inline-flex items-center gap-3 h-[52px] bg-black hover:bg-[#C49A45] hover:text-black text-white px-8 rounded-xl font-bold text-xs tracking-widest uppercase transition-all shadow-xl"
            >
              Start Your Order Today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;
