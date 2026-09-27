import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Tag, Check, Upload, ArrowRight, ShieldCheck, Sparkles, Layers, Send, Package, Sliders, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/ui/MagneticButton';

const tagProducts = [
  { id: 1, title: 'Bespoke Metal Name Tags for Agbada & Suits', category: 'Fashion Tags', price: '$0.80 / pc', minOrder: '50 pcs', materials: 'Brass, Gold, Silver, Matte Black', desc: 'Custom engraved metal labels with screw, pin, or fold-over backing for native wear & luxury fashion.' },
  { id: 2, title: 'Custom Laser Engraved Zipper Pulls', category: 'Fashion Hardware', price: '$0.65 / pc', minOrder: '100 pcs', materials: 'Zinc Alloy, Stainless Steel', desc: 'High-precision double-sided laser etched zipper sliders for jackets, hoodies & leather bags.' },
  { id: 3, title: 'Laser Engraved Jewelry (Rings & Bracelets)', category: 'Jewelry', price: '$3.50 / pc', minOrder: '10 pcs', materials: 'Stainless Steel, Titanium, Gold Plated', desc: 'Micro laser etching of names, dates, coordinates & custom crests on rings & cuff bracelets.' },
  { id: 4, title: 'Custom Engraved Key Holders & Fobs', category: 'Accessories', price: '$1.50 / pc', minOrder: '25 pcs', materials: 'Brushed Metal, Leather + Metal', desc: 'Heavy-duty laser engraved keyrings for fashion brands, auto dealers & corporate gifts.' },
  { id: 5, title: 'Matte Black & Gold Metal Business Cards', category: 'Corporate', price: '$1.20 / pc', minOrder: '50 pcs', materials: 'Anodized Stainless Steel', desc: 'Ultra-thin, ultra-luxurious laser cut & laser etched metallic executive business cards.' },
  { id: 6, title: 'Military & Fashion Laser Dog Tags', category: 'Accessories', price: '$1.80 / pc', minOrder: '20 pcs', materials: 'Stainless Steel, Matte Black', desc: 'High contrast laser etched identification & style pendant tags with ball chain.' },
  { id: 7, title: 'Industrial Identification & Spec Plates', category: 'Industrial', price: '$2.50 / pc', minOrder: '10 pcs', materials: 'Heavy Gauge Aluminum / Steel', desc: 'Weatherproof, heat-resistant machine rating & specification plates.' },
  { id: 8, title: 'QR Code & Serial Number Metal Tags', category: 'Industrial', price: '$1.10 / pc', minOrder: '50 pcs', materials: 'Stainless Steel', desc: 'Permanent scannable laser barcodes & sequential serial number asset tracking tags.' },
  { id: 9, title: 'Engraved Metal Trophies, Plaques & Awards', category: 'Awards', price: '$15.00 / pc', minOrder: '1 pc', materials: 'Crystal + Metal, Solid Brass', desc: 'Precision laser engraved awards & recognition plaques for corporate ceremonies.' },
  { id: 10, title: 'Personalized Laptop & Tech Metal Bodies', category: 'Tech Customization', price: '$12.00 / pc', minOrder: '1 pc', materials: 'Aluminum Casing', desc: 'Direct fiber laser artwork & logo etching onto laptop lids, powerbanks & phone bodies.' },
  { id: 11, title: 'Engraved Knives, Blades & Tools', category: 'Tools & Blades', price: '$4.00 / pc', minOrder: '5 pcs', materials: 'Hardened Tool Steel', desc: 'Deep laser etching on pocket knives, chef blades & professional workshop tools.' },
  { id: 12, title: 'Custom Branded Metallic Pens', category: 'Corporate Gifts', price: '$0.90 / pc', minOrder: '50 pcs', materials: 'Aluminum & Stainless Steel', desc: 'Sleek metallic rollerball pens laser engraved with corporate logos.' },
];

const MetalTagsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderModal, setOrderModal] = useState(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const categories = ['All', 'Fashion Tags', 'Fashion Hardware', 'Jewelry', 'Accessories', 'Corporate', 'Industrial', 'Tools & Blades'];

  const filtered = selectedCategory === 'All'
    ? tagProducts
    : tagProducts.filter(p => p.category === selectedCategory);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
      setOrderModal(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] text-gray-900 dark:text-white flex flex-col font-sans selection:bg-[#C49A45] selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow relative pt-20 sm:pt-22 pb-24 overflow-hidden">
        {/* Ambient Laser Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Page Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 mb-6 backdrop-blur-md shadow-sm">
              <Zap className="w-4 h-4 text-[#C49A45]" />
              <span className="text-xs font-bold text-gray-800 dark:text-gray-300 uppercase tracking-widest">
                Dawings Fiber Laser Marking Hub
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
              METAL TAGS & <span className="text-[#C49A45] italic">LASER MARKING</span> MARKETPLACE
            </h1>

            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
              Order custom laser-engraved metal tags, zipper pulls, business cards, jewelry, and industrial specification plates. Powered by high-speed fiber laser machines for flawless micro detail.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-4 mb-12 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#C49A45] text-black shadow-[0_4px_15px_rgba(196,154,69,0.35)] scale-105'
                    : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-amber-100/50 dark:hover:bg-white/10 hover:text-black dark:hover:text-white border border-gray-200 dark:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 rounded-2xl p-6 hover:border-[#C49A45]/50 transition-all duration-300 flex flex-col justify-between backdrop-blur-md group hover:shadow-xl dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#C49A45]/10 border border-[#C49A45]/30 text-[#C49A45] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                      Min: <strong className="text-gray-900 dark:text-white">{item.minOrder}</strong>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#C49A45] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-700 dark:text-gray-400 leading-relaxed mb-6 font-medium">
                    {item.desc}
                  </p>

                  <div className="bg-amber-50/60 dark:bg-black/40 border border-amber-900/10 dark:border-white/5 rounded-xl p-3 mb-6 space-y-1 text-xs">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Materials:</span>
                      <strong className="text-gray-900 dark:text-white">{item.materials}</strong>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Bulk Price:</span>
                      <strong className="text-[#C49A45] font-black">{item.price}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOrderModal(item)}
                  className="w-full h-11 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black dark:hover:text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Tag className="w-4 h-4 text-[#C49A45] group-hover:text-black dark:text-black" /> Order Custom Bulk Batch
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      {/* Order Customization Modal */}
      <AnimatePresence>
        {orderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-[#0A0A0A] border border-amber-900/10 dark:border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-gray-900 dark:text-white"
            >
              <button
                onClick={() => setOrderModal(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-[#C49A45]" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bulk Order Request</h3>
              </div>

              <h4 className="text-sm font-bold text-[#C49A45] mb-6">{orderModal.title}</h4>

              {orderSubmitted ? (
                <div className="py-8 text-center text-emerald-600 dark:text-emerald-400 font-bold text-sm space-y-2">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600 dark:text-emerald-400" />
                  <p>Order Request Submitted Successfully!</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-normal">Our production manager will contact you with a digital proof & pricing mockup.</p>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-1">Quantity Batch</label>
                    <select className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-[#C49A45]">
                      <option className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">50 pcs (Standard Trial)</option>
                      <option className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">100 pcs (Recommended)</option>
                      <option className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">500 pcs (Bulk Discount)</option>
                      <option className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">1,000+ pcs (Wholesale)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-1">Material & Finish</label>
                    <select className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-[#C49A45]">
                      <option className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">Brushed Gold Brass</option>
                      <option className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">Matte Black Stainless Steel</option>
                      <option className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">Mirror Silver Polish</option>
                      <option className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">Rose Gold Metallic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-1">Your Name / Brand Name</label>
                    <input type="text" required placeholder="e.g. Dawings Couture" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#C49A45]" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-1">WhatsApp / Phone Number</label>
                    <input type="text" required placeholder="+234 800 000 0000" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#C49A45]" />
                  </div>

                  <button type="submit" className="w-full h-12 bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 mt-2 shadow-lg">
                    Submit Order Request
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default MetalTagsPage;
