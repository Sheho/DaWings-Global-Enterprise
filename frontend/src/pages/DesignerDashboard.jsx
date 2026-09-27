import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  ShoppingBag,
  Upload,
  Plus,
  Star,
  CheckCircle,
  Clock,
  Trash2,
  Edit3,
  LogOut,
  User,
  ShieldCheck,
  TrendingUp,
  FileText,
  CreditCard,
  Settings,
  Sparkles,
  X,
  Search,
  Filter,
  FileCheck,
  ArrowUpRight,
  Download,
  Building,
  Save,
  Check,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/ui/MagneticButton';
import {
  TEST_DESIGNER_ACCOUNT,
  MOCK_DESIGNER_DESIGNS,
  MOCK_BANK_DETAILS,
  MOCK_DESIGNER_ORDERS,
  MOCK_PAYOUT_TRANSACTIONS,
} from '../data/mockDesigner';

const DesignerDashboard = () => {
  const navigate = useNavigate();
  const [designer, setDesigner] = useState(null);
  const [designs, setDesigns] = useState(MOCK_DESIGNER_DESIGNS);
  const [activeTab, setActiveTab] = useState('designs'); // 'designs', 'orders', 'earnings', 'profile'
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Drag & Drop State
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // New Design Form State
  const [newDesign, setNewDesign] = useState({
    title: '',
    category: 'Agbada',
    price: '25.00',
    stitches: '18,500',
    desc: '',
    fileType: 'DST, PES, EXP',
    image: '/images/agbada_category.png',
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Editable Bank Details State
  const [bankDetails, setBankDetails] = useState(MOCK_BANK_DETAILS);
  const [bankEditMode, setBankEditMode] = useState(false);
  const [bankSaveSuccess, setBankSaveSuccess] = useState(false);

  // Editable Profile State
  const [profileForm, setProfileForm] = useState(null);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('dawings_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setDesigner(parsed);
        setProfileForm(parsed);
      } catch (e) {
        setDesigner(TEST_DESIGNER_ACCOUNT);
        setProfileForm(TEST_DESIGNER_ACCOUNT);
      }
    } else {
      setDesigner(TEST_DESIGNER_ACCOUNT);
      setProfileForm(TEST_DESIGNER_ACCOUNT);
    }

    const storedBank = localStorage.getItem('dawings_bank');
    if (storedBank) {
      try {
        setBankDetails(JSON.parse(storedBank));
      } catch (e) {
        // default to mock
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dawings_user');
    localStorage.removeItem('dawings_token');
    navigate('/login');
  };

  // Drag & Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      if (!newDesign.title) {
        setNewDesign((prev) => ({
          ...prev,
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        }));
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      if (!newDesign.title) {
        setNewDesign((prev) => ({
          ...prev,
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        }));
      }
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      title: newDesign.title,
      category: newDesign.category,
      price: newDesign.price.startsWith('$') ? newDesign.price : `$${newDesign.price}`,
      sales: 0,
      earnings: '$0.00',
      stitches: newDesign.stitches || '16,000',
      status: 'Under Review',
      date: 'Just Now',
      fileType: newDesign.fileType,
      image: newDesign.image,
    };
    setDesigns([created, ...designs]);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
      setNewDesign({
        title: '',
        category: 'Agbada',
        price: '25.00',
        stitches: '18,500',
        desc: '',
        fileType: 'DST, PES, EXP',
        image: '/images/agbada_category.png',
      });
      setUploadedFile(null);
    }, 2000);
  };

  const handleDeleteDesign = (id) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSaveBankDetails = (e) => {
    e.preventDefault();
    localStorage.setItem('dawings_bank', JSON.stringify(bankDetails));
    setBankSaveSuccess(true);
    setBankEditMode(false);
    setTimeout(() => setBankSaveSuccess(false), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setDesigner(profileForm);
    localStorage.setItem('dawings_user', JSON.stringify(profileForm));
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  // Filtered Designs
  const filteredDesigns = designs.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || d.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  if (!designer) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] text-slate-900 dark:text-white flex flex-col font-sans selection:bg-[#C49A45] selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow relative pt-20 sm:pt-22 pb-24 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[350px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Designer Profile Header */}
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl mb-10 shadow-xl dark:shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#C49A45] to-amber-600 text-black flex items-center justify-center font-black text-2xl sm:text-3xl shadow-[0_0_30px_rgba(196,154,69,0.4)] shrink-0">
                  {designer.fullName ? designer.fullName.charAt(0) : 'D'}
                </div>

                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {designer.fullName || 'Designer Account'}
                    </h1>
                    <span className="bg-[#C49A45]/15 border border-[#C49A45]/30 text-[#A88135] dark:text-[#C49A45] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> VIP Creator
                    </span>
                    <Link
                      to="/admin"
                      className="bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-400 hover:bg-purple-500/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Admin Hub
                    </Link>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-gray-400 font-mono font-medium">
                    @{designer.username || 'designer'} • {designer.email}
                  </p>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {designer.specialization && Array.isArray(designer.specialization) && (
                      designer.specialization.map((spec, i) => (
                        <span key={i} className="text-[10px] font-bold text-slate-800 dark:text-gray-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2.5 py-0.5 rounded-full">
                          {spec}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="flex-1 md:flex-initial h-12 px-6 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
                >
                  <Plus className="w-4 h-4" /> Upload New File
                </button>

                <button
                  onClick={handleLogout}
                  className="h-12 px-4 bg-slate-100 dark:bg-white/5 hover:bg-red-600 hover:text-white text-slate-700 dark:text-gray-400 border border-slate-200 dark:border-white/10 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
                </button>
              </div>

            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md dark:shadow-none">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-widest">Total Earnings</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{designer.totalEarnings || '$1,480.00'}</h3>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1 font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> +18.4% this month
              </p>
            </div>

            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md dark:shadow-none">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-widest">Total Downloads</span>
                <div className="w-10 h-10 rounded-xl bg-[#C49A45]/15 border border-[#C49A45]/30 flex items-center justify-center text-[#C49A45]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{designs.reduce((acc, d) => acc + d.sales, 0) || 64} sales</h3>
              <p className="text-[11px] text-slate-700 dark:text-gray-400 mt-1 font-bold">Across all uploaded files</p>
            </div>

            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md dark:shadow-none">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-widest">Active Listed Files</span>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{designs.length} designs</h3>
              <p className="text-[11px] text-cyan-700 dark:text-cyan-400 mt-1 font-bold">Live in Marketplace</p>
            </div>

            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md dark:shadow-none">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-widest">Creator Rating</span>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">5.0 / 5.0</h3>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-bold">Top Rated Digitizer</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('designs')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'designs'
                  ? 'bg-black dark:bg-[#C49A45] text-white dark:text-black shadow-lg'
                  : 'text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              My Uploaded Designs ({designs.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-black dark:bg-[#C49A45] text-white dark:text-black shadow-lg'
                  : 'text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Recent Customer Sales
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'earnings'
                  ? 'bg-black dark:bg-[#C49A45] text-white dark:text-black shadow-lg'
                  : 'text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Payouts & Financials
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-black dark:bg-[#C49A45] text-white dark:text-black shadow-lg'
                  : 'text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Profile & Bio
            </button>
          </div>

          {/* TAB 1: DESIGNS LIST WITH SEARCH & FILTER */}
          {activeTab === 'designs' && (
            <div className="space-y-6">
              
              {/* Search & Filter Bar */}
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-md dark:shadow-none">
                
                {/* Search Input */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 dark:text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or category..."
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-[#C49A45]"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                  <span className="text-[10px] font-bold text-slate-800 dark:text-gray-400 uppercase tracking-widest mr-1 shrink-0 flex items-center gap-1">
                    <Filter className="w-3 h-3" /> Category:
                  </span>
                  {['All', 'Agbada', 'Caps', 'Flap & Pocket', 'Monogram', 'Logos'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                        selectedCategory === cat
                          ? 'bg-[#C49A45]/20 border border-[#C49A45] text-[#A88135] dark:text-[#C49A45]'
                          : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-slate-800 dark:text-gray-400 uppercase tracking-widest">Status:</span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#C49A45]"
                  >
                    <option value="All" className="bg-white dark:bg-neutral-900">All Status</option>
                    <option value="Published" className="bg-white dark:bg-neutral-900">Published</option>
                    <option value="Under Review" className="bg-white dark:bg-neutral-900">Under Review</option>
                  </select>
                </div>

              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">Your Listed Embroidery Files</h2>
                <span className="text-xs text-slate-700 dark:text-gray-400 font-medium">Showing {filteredDesigns.length} of {designs.length} items</span>
              </div>

              {filteredDesigns.length === 0 ? (
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-12 text-center shadow-md dark:shadow-none">
                  <FileText className="w-12 h-12 text-slate-400 dark:text-gray-500 mx-auto mb-3" />
                  <p className="text-slate-800 dark:text-gray-400 text-sm font-semibold">No embroidery designs match your filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {filteredDesigns.map((design) => (
                    <div
                      key={design.id}
                      className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-[#C49A45]/50 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm group shadow-md dark:shadow-none"
                    >
                      <div>
                        <div className="relative aspect-[16/11] bg-slate-100 dark:bg-black/40 overflow-hidden">
                          <img
                            src={design.image}
                            alt={design.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-white/10">
                            {design.category}
                          </div>
                          <div className="absolute top-2.5 right-2.5 bg-[#C49A45] text-black font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-md">
                            {design.price}
                          </div>
                        </div>

                        <div className="p-3.5 sm:p-4">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              design.status === 'Published' 
                                ? 'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20' 
                                : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                            }`}>
                              {design.status}
                            </span>
                            <span className="text-[10px] text-slate-700 dark:text-gray-400 font-mono font-medium">{design.date}</span>
                          </div>

                          <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-[#C49A45] transition-colors">
                            {design.title}
                          </h3>

                          <div className="grid grid-cols-2 gap-1.5 text-[11px] py-2 border-y border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-400 font-medium">
                            <div>Stitches: <strong className="text-slate-950 dark:text-white font-bold">{design.stitches}</strong></div>
                            <div>Format: <strong className="text-slate-800 dark:text-gray-300 font-bold">{design.fileType || 'DST, PES'}</strong></div>
                            <div>Downloads: <strong className="text-[#A88135] dark:text-[#C49A45] font-black">{design.sales}</strong></div>
                            <div>Revenue: <strong className="text-emerald-700 dark:text-emerald-400 font-black">{design.earnings}</strong></div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 pt-0 flex items-center justify-between gap-2">
                        <Link
                          to={`/product/${design.id}`}
                          className="flex-1 h-8 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white text-[11px] font-bold rounded-lg flex items-center justify-center border border-slate-200 dark:border-white/10 transition-colors gap-1"
                        >
                          Preview Live <ArrowUpRight className="w-3 h-3 text-[#C49A45]" />
                        </Link>
                        <button
                          onClick={() => handleDeleteDesign(design.id)}
                          className="w-8 h-8 bg-red-500/10 hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white rounded-lg flex items-center justify-center transition-colors shrink-0"
                          title="Delete Design"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RECENT CUSTOMER SALES */}
          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-md dark:shadow-none">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Recent Customer Sales & Downloads</h2>
                  <p className="text-xs text-slate-700 dark:text-gray-400 mt-1 font-medium">Live record of customers purchasing your digital embroidery files.</p>
                </div>
                <span className="text-xs font-mono bg-[#C49A45]/15 text-[#A88135] dark:text-[#C49A45] border border-[#C49A45]/30 px-3 py-1 rounded-full font-bold">
                  85% Creator Commission Rate
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-800 dark:text-gray-300">
                  <thead className="text-[10px] font-bold text-slate-900 dark:text-gray-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Embroidery File</th>
                      <th className="py-3 px-4">Format</th>
                      <th className="py-3 px-4">Total Price</th>
                      <th className="py-3 px-4">Your Net Commission</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                    {MOCK_DESIGNER_ORDERS.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 font-mono text-slate-700 dark:text-gray-400">{ord.id}</td>
                        <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">{ord.customer}</td>
                        <td className="py-4 px-4 text-slate-800 dark:text-gray-200 font-medium">{ord.designTitle}</td>
                        <td className="py-4 px-4">
                          <span className="bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded font-mono text-[10px] text-amber-700 dark:text-amber-400 font-bold">{ord.format}</span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-slate-800 dark:text-gray-300">{ord.amount}</td>
                        <td className="py-4 px-4 font-black text-emerald-700 dark:text-emerald-400">{ord.commission}</td>
                        <td className="py-4 px-4 text-slate-700 dark:text-gray-400 font-medium">{ord.date}</td>
                        <td className="py-4 px-4">
                          <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: EARNINGS & FINANCIALS */}
          {activeTab === 'earnings' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Available Balance Card */}
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between shadow-md dark:shadow-none">
                  <div>
                    <span className="text-xs text-slate-700 dark:text-gray-400 uppercase tracking-widest font-bold block mb-1">Available for Payout</span>
                    <span className="text-4xl font-black text-emerald-700 dark:text-emerald-400">$420.00</span>
                    <p className="text-xs text-slate-700 dark:text-gray-400 mt-2 font-medium">Payouts auto-process every Friday or on-demand.</p>
                  </div>
                  <button className="mt-6 w-full py-3 bg-black dark:bg-[#C49A45] text-white dark:text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#C49A45] dark:hover:bg-white hover:text-black transition-colors shadow-lg">
                    Request Immediate Withdrawal
                  </button>
                </div>

                {/* Monthly Earnings Visual SVG Graph */}
                <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-md dark:shadow-none">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Monthly Sales & Commission Overview</h3>
                      <p className="text-xs text-slate-700 dark:text-gray-400 font-medium">Monthly earnings growth progression in 2026</p>
                    </div>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      +24% Growth
                    </span>
                  </div>

                  {/* SVG Bar Graph */}
                  <div className="h-44 w-full flex items-end justify-between gap-3 pt-6 px-2">
                    {[
                      { month: 'Apr', val: 40, height: 'h-[30%]' },
                      { month: 'May', val: 55, height: 'h-[45%]' },
                      { month: 'Jun', val: 70, height: 'h-[60%]' },
                      { month: 'Jul', val: 62, height: 'h-[50%]' },
                      { month: 'Aug', val: 85, height: 'h-[75%]' },
                      { month: 'Sep', val: 100, height: 'h-[90%]' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full bg-slate-100 dark:bg-white/5 rounded-t-lg relative flex items-end justify-center overflow-hidden h-36">
                          <div className={`w-full bg-gradient-to-t from-[#C49A45] to-amber-400 rounded-t-lg ${item.height} group-hover:brightness-125 transition-all duration-300`}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-700 dark:text-gray-400 uppercase">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editable Bank Payout Details */}
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-md dark:shadow-none">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Building className="w-6 h-6 text-[#C49A45]" />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payout Destination Bank Account</h3>
                      <p className="text-xs text-slate-700 dark:text-gray-400 font-medium">Where your royalties and sales earnings are deposited.</p>
                    </div>
                  </div>
                  {!bankEditMode ? (
                    <button
                      onClick={() => setBankEditMode(true)}
                      className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-[#A88135] dark:text-[#C49A45] border border-slate-200 dark:border-[#C49A45]/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit Bank Details
                    </button>
                  ) : (
                    <button
                      onClick={() => setBankEditMode(false)}
                      className="px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {bankSaveSuccess && (
                  <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Bank Account Details updated & verified!
                  </div>
                )}

                {bankEditMode ? (
                  <form onSubmit={handleSaveBankDetails} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-900 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Bank Name</label>
                      <input
                        type="text"
                        required
                        value={bankDetails.bankName}
                        onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#C49A45]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-900 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Account Number</label>
                      <input
                        type="text"
                        required
                        value={bankDetails.accountNumber}
                        onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#C49A45]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-900 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Account Name</label>
                      <input
                        type="text"
                        required
                        value={bankDetails.accountName}
                        onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#C49A45]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-900 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">SWIFT / Sort Code</label>
                      <input
                        type="text"
                        value={bankDetails.swiftCode}
                        onChange={(e) => setBankDetails({ ...bankDetails, swiftCode: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#C49A45]"
                      />
                    </div>
                    <div className="sm:col-span-2 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-black dark:bg-[#C49A45] text-white dark:text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#C49A45] dark:hover:bg-white hover:text-black transition-colors"
                      >
                        Save Bank Details
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm block mb-0.5">{bankDetails.accountName}</span>
                      <span className="text-slate-700 dark:text-gray-300 font-mono font-medium">{bankDetails.bankName} • Account #{bankDetails.accountNumber}</span>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold uppercase text-[10px]">
                      Verified Active Account
                    </span>
                  </div>
                )}

                {/* Payout History Table */}
                <div className="mt-8 border-t border-slate-200 dark:border-white/10 pt-6">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Payout Withdrawal History</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-800 dark:text-gray-300">
                      <thead className="text-[10px] font-bold text-slate-900 dark:text-gray-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                        <tr>
                          <th className="py-2.5 px-4">Payout ID</th>
                          <th className="py-2.5 px-4">Amount</th>
                          <th className="py-2.5 px-4">Destination Bank</th>
                          <th className="py-2.5 px-4">Reference</th>
                          <th className="py-2.5 px-4">Date</th>
                          <th className="py-2.5 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                        {MOCK_PAYOUT_TRANSACTIONS.map((tx) => (
                          <tr key={tx.id}>
                            <td className="py-3 px-4 font-mono text-slate-700 dark:text-gray-400">{tx.id}</td>
                            <td className="py-3 px-4 font-black text-emerald-700 dark:text-emerald-400">{tx.amount}</td>
                            <td className="py-3 px-4 text-slate-800 dark:text-gray-300 font-medium">{tx.account}</td>
                            <td className="py-3 px-4 font-mono text-slate-700 dark:text-gray-400">{tx.ref}</td>
                            <td className="py-3 px-4 text-slate-700 dark:text-gray-400 font-medium">{tx.date}</td>
                            <td className="py-3 px-4">
                              <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: PROFILE & BIO EDITOR */}
          {activeTab === 'profile' && profileForm && (
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl max-w-3xl space-y-6 shadow-md dark:shadow-none">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Designer Profile Information</h2>
                  <p className="text-xs text-slate-700 dark:text-gray-400 mt-1 font-medium">Update your creator bio, portfolio link, and specialization details.</p>
                </div>
                {profileSaveSuccess && (
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Saved!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-900 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.fullName || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#C49A45]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-900 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Username</label>
                    <input
                      type="text"
                      value={profileForm.username || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#C49A45]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-900 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Email Address</label>
                    <input
                      type="email"
                      readOnly
                      value={profileForm.email || ''}
                      className="w-full bg-slate-100 dark:bg-black/60 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-600 dark:text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Portfolio Link (Behance / Instagram)</label>
                  <input
                    type="text"
                    value={profileForm.portfolio || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, portfolio: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#C49A45]"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">About / Bio</label>
                  <textarea
                    rows={4}
                    value={profileForm.about || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white resize-none focus:outline-none focus:border-[#C49A45]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] text-white dark:text-black hover:text-black font-black text-xs uppercase tracking-widest rounded-xl transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Profile Changes
                </button>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* Upload New Design Modal with Drag & Drop */}
      <AnimatePresence>
        {uploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto text-slate-900 dark:text-white"
            >
              <button
                onClick={() => setUploadModalOpen(false)}
                className="absolute top-6 right-6 text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <Upload className="w-6 h-6 text-[#C49A45]" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Upload New Embroidery File</h3>
              </div>

              {uploadSuccess ? (
                <div className="py-12 text-center text-emerald-700 dark:text-emerald-400 font-bold text-sm space-y-3">
                  <CheckCircle className="w-12 h-12 mx-auto text-emerald-600 dark:text-emerald-400" />
                  <p className="text-base font-black">Embroidery File Submitted for Moderation!</p>
                  <p className="text-xs text-slate-700 dark:text-gray-400 font-medium">Our Admin team will review and publish your file within 2-4 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
                  
                  {/* Drag and Drop Zone */}
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer relative ${
                      dragActive
                        ? 'border-[#C49A45] bg-[#C49A45]/10'
                        : uploadedFile
                        ? 'border-emerald-500/50 bg-emerald-500/5'
                        : 'border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 hover:border-[#C49A45]/50'
                    }`}
                  >
                    <input
                      type="file"
                      id="file-upload-input"
                      onChange={handleFileChange}
                      accept=".dst,.pes,.exp,.emb,.ai,.pdf,.png"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />

                    {uploadedFile ? (
                      <div className="space-y-1">
                        <FileCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                        <p className="font-bold text-slate-900 dark:text-white">{uploadedFile.name}</p>
                        <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                          {(uploadedFile.size / 1024).toFixed(1)} KB • Format Recognized
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-[#C49A45] mx-auto" />
                        <p className="font-bold text-slate-900 dark:text-white">Drag & drop your embroidery or vector file here</p>
                        <p className="text-[10px] text-slate-700 dark:text-gray-400 font-medium">Supports .DST, .PES, .EXP, .EMB, .AI, .PNG</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-gray-300 rounded-full text-[10px] font-bold">
                          Browse Computer
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-900 dark:text-gray-400 uppercase tracking-widest mb-1.5">Design Title *</label>
                    <input
                      type="text"
                      required
                      value={newDesign.title}
                      onChange={(e) => setNewDesign({ ...newDesign, title: e.target.value })}
                      placeholder="e.g. Sovereign Agbada Gold Pattern V4"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-900 dark:text-gray-400 uppercase tracking-widest mb-1.5">Category *</label>
                      <select
                        value={newDesign.category}
                        onChange={(e) => setNewDesign({ ...newDesign, category: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-3 text-slate-900 dark:text-white"
                      >
                        <option value="Agbada" className="bg-white dark:bg-neutral-900">Agbada</option>
                        <option value="Caps" className="bg-white dark:bg-neutral-900">Caps</option>
                        <option value="Flap & Pocket" className="bg-white dark:bg-neutral-900">Flap & Pocket</option>
                        <option value="Monogram" className="bg-white dark:bg-neutral-900">Monogram</option>
                        <option value="Logos" className="bg-white dark:bg-neutral-900">Logos</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-900 dark:text-gray-400 uppercase tracking-widest mb-1.5">Price ($USD) *</label>
                      <input
                        type="text"
                        required
                        value={newDesign.price}
                        onChange={(e) => setNewDesign({ ...newDesign, price: e.target.value })}
                        placeholder="25.00"
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-900 dark:text-gray-400 uppercase tracking-widest mb-1.5">Stitch Count</label>
                      <input
                        type="text"
                        value={newDesign.stitches}
                        onChange={(e) => setNewDesign({ ...newDesign, stitches: e.target.value })}
                        placeholder="e.g. 24,000"
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-900 dark:text-gray-400 uppercase tracking-widest mb-1.5">Available Formats</label>
                      <input
                        type="text"
                        value={newDesign.fileType}
                        onChange={(e) => setNewDesign({ ...newDesign, fileType: e.target.value })}
                        placeholder="DST, PES, EXP"
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-900 dark:text-gray-400 uppercase tracking-widest mb-1.5">Description & Specs</label>
                    <textarea
                      rows={3}
                      value={newDesign.desc}
                      onChange={(e) => setNewDesign({ ...newDesign, desc: e.target.value })}
                      placeholder="Specify thread colors, fabric recommendations, and machine compatibility..."
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] text-white dark:text-black hover:text-black font-black text-xs uppercase tracking-widest rounded-xl transition-colors shadow-lg mt-2"
                  >
                    Submit File for Admin Review
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

export default DesignerDashboard;
