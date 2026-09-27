import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Tag, Cpu, Sparkles, CheckCircle2, ArrowRight, Layers, PackageCheck, Send, ChevronDown, Check, Shirt, Wrench } from 'lucide-react';

const laserCategories = [
  {
    id: 'fashion',
    name: 'Fashion & Branding',
    desc: 'Bespoke metal tags, zipper pulls, and hardware for luxury fashion houses & tailors.',
    icon: Shirt,
    items: [
      { name: 'Metal Name Tags', desc: 'Engraved brass & stainless steel brand tags for clothing & agbadas.' },
      { name: 'Zipper Pulls & Fashion Accessories', desc: 'Custom logo metal pulls for jackets, bags & luxury garments.' },
      { name: 'Metal Business Cards', desc: 'Matte black & brushed gold stainless steel executive cards.' },
      { name: 'Engraved Pens', desc: 'Custom branded metallic pens for corporate gifts & events.' },
      { name: 'Metal Trophies & Awards', desc: 'Laser etched plaques, awards & metallic recognition plates.' },
    ],
  },
  {
    id: 'jewelry',
    name: 'Jewelry & Accessories',
    desc: 'High-precision micro engraving on precious metals, timepieces & personal items.',
    icon: Sparkles,
    items: [
      { name: 'Jewelry (Rings & Bracelets)', desc: 'Micro text & intricate pattern laser engraving on gold, silver & steel.' },
      { name: 'Custom Watches', desc: 'Watch case backs, bezels, and metallic straps personalization.' },
      { name: 'Key Holders & Fobs', desc: 'Bespoke keychains with custom initials, logos & phone numbers.' },
      { name: 'Dog Tags & Pendant Tags', desc: 'Military-grade & fashion dog tags with crisp laser contrast.' },
    ],
  },
  {
    id: 'industrial',
    name: 'Industrial & Identification',
    desc: 'Permanent high-contrast marking for industrial compliance, tracking & machinery.',
    icon: Wrench,
    items: [
      { name: 'Industrial Identification Plates', desc: 'Heavy-duty machine rating plates & specification tags.' },
      { name: 'QR Codes & Barcodes', desc: 'Scannable high-density laser codes resistant to heat & chemical wear.' },
      { name: 'Serial Numbers & Asset Tags', desc: 'Sequential serial numbering for inventory & equipment security.' },
      { name: 'Machine Parts & Tools', desc: 'Permanent laser etching on steel, aluminum & brass components.' },
      { name: 'Knives & Blades', desc: 'Custom logo & custom pattern laser marking on steel blades.' },
    ],
  },
  {
    id: 'tech',
    name: 'Tech & Automotive',
    desc: 'Custom fiber laser marking on tech devices, enclosures & vehicle parts.',
    icon: Cpu,
    items: [
      { name: 'Phone & Laptop Metal Bodies', desc: 'Personalized laser artwork & logos on aluminum tech casings.' },
      { name: 'Electrical Components', desc: 'Laser marked switches, aluminum panels & control boxes.' },
      { name: 'Automotive Metal Parts', desc: 'Engine tags, metallic badges & custom auto accessories.' },
    ],
  },
];

const LuxurySelect = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-1.5">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white dark:bg-black/50 border border-amber-900/20 dark:border-white/10 hover:border-[#C49A45] rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-900 dark:text-white flex items-center justify-between shadow-sm focus:outline-none focus:ring-1 focus:ring-[#C49A45] transition-all"
      >
        <span className="truncate">{value}</span>
        <ChevronDown className={`w-4 h-4 text-[#C49A45] shrink-0 ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 right-0 mt-1.5 bg-white dark:bg-[#121214] border border-[#C49A45]/30 rounded-xl shadow-2xl overflow-hidden py-1 max-h-56 overflow-y-auto backdrop-blur-2xl"
          >
            {options.map((opt) => {
              const optVal = typeof opt === 'string' ? opt : opt.value;
              const optLabel = typeof opt === 'string' ? opt : opt.label;
              const isSelected = value === optVal;
              return (
                <div
                  key={optVal}
                  onClick={() => {
                    onChange(optVal);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 text-xs flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#C49A45]/15 text-[#C49A45] font-bold'
                      : 'text-gray-800 dark:text-gray-200 hover:bg-[#C49A45]/10 hover:text-[#C49A45] font-medium'
                  }`}
                >
                  <span className="truncate">{optLabel}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#C49A45] shrink-0 ml-2" />}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LaserMarkingSection = () => {
  const [activeTab, setActiveTab] = useState('fashion');
  const [quoteForm, setQuoteForm] = useState({
    itemType: 'Metal Name Tags',
    quantity: '100 pcs',
    material: 'Brushed Gold Brass',
    contact: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const activeCategory = laserCategories.find((c) => c.id === activeTab) || laserCategories[0];

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] relative overflow-hidden text-gray-900 dark:text-white border-t border-amber-900/10 dark:border-white/5 transition-colors duration-300">
      {/* Ambient Gold & Warm Lights */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-amber-500/15 dark:bg-amber-600/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C49A45]/10 border border-[#C49A45]/30 mb-4 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-[#C49A45] animate-pulse" />
              <span className="text-[11px] font-bold text-[#C49A45] uppercase tracking-widest">
                Laser Marking & Custom Metal Tags
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              BULK LASER MARKING & <span className="text-[#C49A45] italic">METAL TAGS</span> MARKETPLACE
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-sm sm:text-base mt-4 leading-relaxed font-medium">
              Equipped with state-of-the-art fiber laser marking machines. Dawings Global provides fashion designers, brands, and industrial clients with high-volume, fiber-laser engraved metal hardware, fashion tags, and personal accessories.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/metal-tags"
              className="inline-flex items-center h-[52px] bg-black dark:bg-white/10 hover:bg-[#C49A45] text-white hover:text-black dark:hover:text-black px-8 font-bold text-xs rounded-xl transition-all duration-300 tracking-widest uppercase border border-transparent dark:border-white/10 gap-3 shadow-xl"
            >
              Order Bulk Metal Tags <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Category Tabs & List */}
          <div className="lg:col-span-7 space-y-8">

            {/* Category Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-white/80 dark:bg-white/5 p-2 rounded-2xl border border-amber-900/10 dark:border-white/10 backdrop-blur-md shadow-lg">
              {laserCategories.map((cat) => {
                const isActive = activeTab === cat.id;
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`relative py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#C49A45] via-amber-500 to-[#C49A45] text-black shadow-[0_4px_20px_rgba(196,154,69,0.35)] scale-[1.02]'
                        : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-amber-100/40 dark:hover:bg-white/5'
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-black' : 'text-[#C49A45]'}`} />
                    <span className="truncate">{cat.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Category Header & Items */}
            <div className="bg-white/90 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-xl dark:shadow-none">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#C49A45]" />
                  <span>{activeCategory.name}</span>
                </h3>
                <span className="text-xs font-bold text-[#C49A45] bg-[#C49A45]/10 border border-[#C49A45]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  Fiber Laser Precision
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-400 text-xs sm:text-sm mb-8 leading-relaxed font-medium">
                {activeCategory.desc}
              </p>

              {/* Items List Grid */}
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {activeCategory.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-amber-50/50 dark:bg-black/40 border border-amber-900/10 dark:border-white/5 hover:border-[#C49A45]/60 transition-all duration-300 flex items-start gap-4 group shadow-sm dark:shadow-none"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#C49A45]/10 border border-[#C49A45]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#C49A45] group-hover:text-black transition-colors">
                          <Tag className="w-4 h-4 text-[#C49A45] group-hover:text-black" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#C49A45] transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Feature & Quick Bulk Quote Form */}
          <div className="lg:col-span-5 space-y-6">

            {/* Featured Laser Machine Card */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-900/10 dark:border-white/10 group shadow-2xl">
              <img
                src="/images/laser_marking_tags.png"
                alt="Fiber Laser Marking Machine Dawings"
                loading="lazy"
                decoding="async"
                className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-bold text-black bg-[#C49A45] px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                  Industrial Fiber Laser 30W/50W
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  High-Speed Micro Engraving Technology
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  Permanent high-contrast laser marks on Brass, Stainless Steel, Titanium & Anodized Metals.
                </p>
              </div>
            </div>

            {/* Quick Bulk Order Inquiry Box */}
            <div className="bg-white/90 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur-xl relative shadow-xl dark:shadow-none">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="w-5 h-5 text-[#C49A45]" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Instant Bulk Order Quote</h3>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-400 mb-6 font-medium">
                Are you a fashion designer or brand? Request a quote for custom laser-engraved metal tags or accessories.
              </p>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                  Quote Request Sent! Our team will send price tiers to your contact details shortly.
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  
                  {/* Custom Luxury Select: Item Type */}
                  <LuxurySelect
                    label="Select Item Type"
                    value={quoteForm.itemType}
                    options={[
                      'Metal Name Tags',
                      'Zipper Pulls',
                      'Jewelry & Rings',
                      'Key Holders / Dog Tags',
                      'Metal Business Cards',
                      'Industrial Plates & Barcodes',
                    ]}
                    onChange={(val) => setQuoteForm({ ...quoteForm, itemType: val })}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    {/* Custom Luxury Select: Quantity */}
                    <LuxurySelect
                      label="Quantity"
                      value={quoteForm.quantity}
                      options={['50 pcs', '100 pcs', '500 pcs', '1,000+ pcs']}
                      onChange={(val) => setQuoteForm({ ...quoteForm, quantity: val })}
                    />

                    {/* Custom Luxury Select: Finish / Material */}
                    <LuxurySelect
                      label="Finish / Material"
                      value={quoteForm.material}
                      options={[
                        { value: 'Brushed Gold Brass', label: 'Gold Brass' },
                        { value: 'Matte Black Stainless', label: 'Matte Black' },
                        { value: 'Silver Stainless Steel', label: 'Silver Steel' },
                        { value: 'Rose Gold Finish', label: 'Rose Gold' },
                      ]}
                      onChange={(val) => setQuoteForm({ ...quoteForm, material: val })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest mb-1.5">
                      Phone Number or Email
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., +234 800 000 0000 or email"
                      value={quoteForm.contact}
                      onChange={(e) => setQuoteForm({ ...quoteForm, contact: e.target.value })}
                      className="w-full bg-white dark:bg-black/50 border border-amber-900/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#C49A45] shadow-sm font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-11 bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" /> Request Bulk Pricing
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default LaserMarkingSection;
