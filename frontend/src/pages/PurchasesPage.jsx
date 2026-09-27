import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ShieldCheck, Package, ShoppingBag, ArrowLeft, CheckCircle2, Lock, FileArchive, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PurchasesPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('dawings_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    }

    const storedPurchases = localStorage.getItem('dawings_purchases');
    if (storedPurchases) {
      try {
        setPurchases(JSON.parse(storedPurchases));
      } catch (e) {
        setPurchases([]);
      }
    } else {
      // Pre-seed sample purchase if none
      const sample = [
        {
          orderId: 'DW-89240',
          date: '2026-03-21',
          items: [
            { id: 1, title: 'Imperial Gold Agbada Chest Pattern', category: 'Agbada', price: '$35.00', image: '/images/agbada_category.png', formats: 'DST, PES, EXP, JEF' },
            { id: 5, title: 'Handcrafted Royal Fila Cap Motif', category: 'Caps', price: '$12.00', image: '/images/cap_category.png', formats: 'DST, PES' }
          ],
          total: '$47.00',
          status: 'Completed'
        }
      ];
      setPurchases(sample);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] flex flex-col font-sans selection:bg-[#C49A45] selection:text-white text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow relative pt-20 sm:pt-22 pb-24 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200 dark:border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  Secure Digital Vault
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                MY PURCHASES & <span className="text-[#C49A45] italic">DOWNLOADS</span>
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {user ? `Logged in as ${user.fullName || user.email}` : 'Access your permanently saved production files & metal tag orders'}
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 h-11 px-6 bg-gray-100 dark:bg-white/5 hover:bg-[#C49A45] hover:text-black text-gray-900 dark:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-gray-200 dark:border-white/10"
            >
              <ShoppingBag className="w-4 h-4" /> Browse Marketplace
            </Link>
          </div>

          {/* Orders History List */}
          {purchases.length > 0 ? (
            <div className="space-y-8">
              {purchases.map((order, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
                >
                  {/* Order Top Summary Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-white/10 text-xs">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#C49A45]/10 border border-[#C49A45]/30 flex items-center justify-center text-[#C49A45] shrink-0">
                        <FileArchive className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 block font-mono">Order Reference</span>
                        <strong className="text-gray-900 dark:text-white text-sm font-bold">{order.orderId}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 block">Date Purchased</span>
                        <strong className="text-gray-900 dark:text-white font-mono">{order.date}</strong>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400 block">Total Paid</span>
                        <strong className="text-[#C49A45] font-black text-sm">{order.total}</strong>
                      </div>
                      <div>
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Items in Order */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="p-4 bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-2xl flex items-center justify-between gap-4 hover:border-[#C49A45]/40 transition-colors shadow-sm dark:shadow-none"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={item.image || '/images/agbada_category.png'}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-xl bg-gray-100 dark:bg-black border border-gray-200 dark:border-white/10 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-widest block">
                              {item.category || 'Digitized Pattern'}
                            </span>
                            <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.title}</h4>
                            <p className="text-[10px] text-gray-600 dark:text-gray-400 font-mono mt-0.5">
                              Included: {item.formats || 'DST, PES, EXP'}
                            </p>
                          </div>
                        </div>

                        <a
                          href={item.image || '/images/agbada_category.png'}
                          download={`${item.title}.zip`}
                          className="h-10 px-4 bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-lg"
                        >
                          <Download className="w-3.5 h-3.5" /> Download ZIP
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl max-w-lg mx-auto">
              <Package className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Past Downloads Found</h2>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-8">
                Purchases made under your account or checkout email will appear here permanently.
              </p>
              <Link
                to="/shop"
                className="px-8 py-3.5 bg-[#C49A45] text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                Go to Shop
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PurchasesPage;
