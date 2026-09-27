import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { shopProducts } from '../data/shopData';

const FeaturedDesigns = () => {
  const featuredList = shopProducts.filter(p => p.featured).slice(0, 4);

  return (
    <section className="py-20 bg-[#FDFDFD] dark:bg-[#050505] text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#C49A45] font-bold text-[11px] tracking-[0.2em] uppercase mb-2">SHOP MARKETPLACE</p>
            <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white tracking-tight">FEATURED DESIGNS</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/shop" className="hidden sm:inline-flex items-center text-[12px] font-bold text-gray-800 dark:text-gray-200 hover:text-[#C49A45] dark:hover:text-[#C49A45] tracking-widest uppercase transition-colors group">
              VIEW ALL STORE <span className="ml-1 group-hover:translate-x-1 transition-transform">➔</span>
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredList.map((design, index) => (
            <motion.div 
              key={design.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col cursor-pointer"
            >
              <Link to={`/product/${design.id}`}>
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden mb-5 bg-[#f4f4f4] dark:bg-[#0A0A0A] border border-transparent dark:border-white/10 rounded-sm">
                  <img 
                    src={design.image} 
                    alt={design.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" 
                  />
                  
                  {/* Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating Add to Cart Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <button className="h-[45px] px-8 bg-white dark:bg-[#C49A45] text-black text-[11px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#C49A45] dark:hover:bg-white dark:hover:text-black transition-colors flex items-center gap-2 shadow-xl">
                      <ShoppingCart className="w-4 h-4" /> VIEW DESIGN
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="flex justify-between items-start px-1">
                  <div>
                    <p className="text-[9px] text-[#C49A45] font-black uppercase tracking-[0.25em] mb-1.5">{design.vendor}</p>
                    <h3 className="text-[14px] font-bold text-gray-900 dark:text-white tracking-tight">{design.title}</h3>
                  </div>
                  <span className="text-[14px] font-light text-gray-600 tracking-wide">{design.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedDesigns;
