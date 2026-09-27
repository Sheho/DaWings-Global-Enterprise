import { Link } from 'react-router-dom';
import { Shirt, Briefcase, Award, Scissors, Globe, Edit3, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';

const servicesList = [
  { id: 1, title: 'AGBADA DIGITIZING', icon: Shirt },
  { id: 2, title: 'FLAP & POCKET DESIGNS', icon: Briefcase },
  { id: 3, title: 'MONOGRAM DESIGNS', icon: Award },
  { id: 4, title: 'CAP DIGITIZING', icon: Scissors },
  { id: 5, title: 'GLOBAL LOGO DIGITIZING', icon: Globe },
  { id: 6, title: 'DESIGN EDITING & RESIZING', icon: Edit3 },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-[#050505] text-gray-900 dark:text-white text-center transition-colors duration-300">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-[#C49A45] font-bold text-[11px] tracking-[0.2em] uppercase mb-2">WHAT WE DO</p>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white tracking-tight mb-16">OUR SERVICES</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12">
          {servicesList.map((service, index) => (
            <motion.div 
              key={service.id} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-[72px] h-[72px] rounded-full border-[1.5px] border-[#C49A45] flex items-center justify-center text-[#C49A45] mb-5 group-hover:bg-[#C49A45] group-hover:text-white transition-colors duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-[#C49A45]/20">
                <service.icon className="w-8 h-8" strokeWidth={1} />
              </div>
              <h3 className="text-[10px] font-bold text-black dark:text-white tracking-widest uppercase leading-[1.4] max-w-[120px] group-hover:text-[#C49A45] transition-colors">
                {service.title}
              </h3>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <MagneticButton>
            <Link 
              to="/services" 
              className="inline-flex h-[52px] items-center justify-center px-10 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black dark:hover:text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl border border-transparent dark:border-white/10 gap-3 group"
            >
              <span>VIEW ALL SERVICES</span>
              <ArrowRight className="w-4 h-4 text-[#C49A45] group-hover:text-black dark:text-black group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </MagneticButton>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Services;
