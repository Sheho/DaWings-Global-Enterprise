import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Search, Wrench, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const mockEngineers = [
  { id: 1, name: 'David Ojo', location: 'Lagos', state: 'Lagos State', phone: '+234 801 234 5678', email: 'david.o@dawings.com', specialties: ['Agbada Embroidery', 'Multi-head Machines'] },
  { id: 2, name: 'Michael Eze', location: 'Abuja', state: 'FCT', phone: '+234 802 345 6789', email: 'michael.e@dawings.com', specialties: ['Industrial Digitizing', 'Motor Repairs'] },
  { id: 3, name: 'Samuel Kalu', location: 'Port Harcourt', state: 'Rivers State', phone: '+234 803 456 7890', email: 'samuel.k@dawings.com', specialties: ['Cap Monograms', 'Software Tuning'] },
  { id: 4, name: 'Chinedu Obi', location: 'Lagos', state: 'Lagos State', phone: '+234 804 567 8901', email: 'chinedu.o@dawings.com', specialties: ['Motherboard Repair', 'Needle Calibration'] },
  { id: 5, name: 'Tunde Bakare', location: 'Ibadan', state: 'Oyo State', phone: '+234 805 678 9012', email: 'tunde.b@dawings.com', specialties: ['Routine Maintenance', 'Tension Adjustment'] },
  { id: 6, name: 'Oluwaseun Ade', location: 'Kano', state: 'Kano State', phone: '+234 806 789 0123', email: 'oluwaseun.a@dawings.com', specialties: ['Heavy Duty Machinery', 'Spare Parts Fitting'] },
];

const EngineersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredEngineers = mockEngineers.filter(eng => 
    eng.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
    eng.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    eng.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] text-gray-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow pt-20 sm:pt-22 pb-24 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[350px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#C49A45] transition-colors mb-12 text-xs font-black tracking-widest uppercase">
            <ArrowLeft className="w-4 h-4 text-[#C49A45]" /> Back to Home
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 mb-4 backdrop-blur-md shadow-sm">
                <Wrench className="w-4 h-4 text-[#C49A45]" />
                <span className="text-xs font-extrabold text-gray-800 dark:text-gray-300 uppercase tracking-widest">
                  Technical Support Hub
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-3 break-words">
                CERTIFIED <span className="text-[#C49A45] italic">ENGINEERS</span>
              </h1>
              <p className="text-gray-700 dark:text-gray-400 text-sm font-medium">Search and connect with DA-WINGS repair specialists in your region.</p>
            </motion.div>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full md:w-96"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-[#C49A45]" />
              </div>
              <input
                type="text"
                placeholder="Search by city, state or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[54px] bg-white dark:bg-black/50 border border-amber-900/10 dark:border-white/10 rounded-xl pl-12 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#C49A45] transition-all placeholder:text-gray-400 font-medium shadow-md"
              />
            </motion.div>
          </div>

          {/* Engineer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredEngineers.map((engineer) => (
                <motion.div
                  layout
                  key={engineer.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/90 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 p-8 rounded-2xl hover:border-[#C49A45]/50 transition-all group shadow-xl backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#C49A45] transition-colors">{engineer.name}</h4>
                        <p className="text-[#C49A45] text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {engineer.location}, {engineer.state}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[#C49A45]/10 border border-[#C49A45]/30 flex items-center justify-center text-[#C49A45] group-hover:bg-[#C49A45] group-hover:text-black transition-colors shrink-0">
                        <Wrench className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <a href={`tel:${engineer.phone}`} className="flex items-center gap-3 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#C49A45] transition-colors">
                        <Phone className="w-4 h-4 text-[#C49A45]" /> {engineer.phone}
                      </a>
                      <a href={`mailto:${engineer.email}`} className="flex items-center gap-3 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#C49A45] transition-colors">
                        <Mail className="w-4 h-4 text-[#C49A45]" /> {engineer.email}
                      </a>
                    </div>

                    <div className="mb-6">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500 dark:text-gray-400 block mb-2">Specialties</span>
                      <div className="flex flex-wrap gap-1.5">
                        {engineer.specialties.map((spec, i) => (
                          <span key={i} className="text-[10px] font-bold bg-amber-50 dark:bg-white/10 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-md border border-amber-900/10 dark:border-white/5">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a 
                    href={`tel:${engineer.phone}`} 
                    className="w-full h-11 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Engineer Now
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EngineersPage;
