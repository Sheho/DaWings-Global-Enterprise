import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  FileCheck,
  ShoppingBag,
  TrendingUp,
  Sliders,
  Sparkles,
  ArrowRight,
  Eye,
  Check,
  X,
  Building,
  RefreshCw,
  Search,
  ChevronRight,
  Award,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  MOCK_ADMIN_STATS,
  MOCK_ADMIN_MODERATION_QUEUE,
  MOCK_ADMIN_PAYOUT_REQUESTS,
  MOCK_ADMIN_DESIGNERS,
} from '../data/mockDesigner';

const AdminDashboard = () => {
  const [stats, setStats] = useState(MOCK_ADMIN_STATS);
  const [moderationQueue, setModerationQueue] = useState(MOCK_ADMIN_MODERATION_QUEUE);
  const [payoutRequests, setPayoutRequests] = useState(MOCK_ADMIN_PAYOUT_REQUESTS);
  const [designers, setDesigners] = useState(MOCK_ADMIN_DESIGNERS);
  const [activeTab, setActiveTab] = useState('approvals'); // 'approvals', 'designers', 'payouts', 'settings'

  // Settings State
  const [commissionRate, setCommissionRate] = useState('15');
  const [metalTagBasePrice, setMetalTagBasePrice] = useState('2.50');
  const [autoApproveVip, setAutoApproveVip] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Preview Modal
  const [previewDesign, setPreviewDesign] = useState(null);

  // Moderation Actions
  const handleApproveDesign = (id) => {
    setModerationQueue((prev) => prev.filter((item) => item.id !== id));
    setStats((prev) => ({
      ...prev,
      pendingApprovals: Math.max(0, prev.pendingApprovals - 1),
    }));
  };

  const handleRejectDesign = (id) => {
    setModerationQueue((prev) => prev.filter((item) => item.id !== id));
    setStats((prev) => ({
      ...prev,
      pendingApprovals: Math.max(0, prev.pendingApprovals - 1),
    }));
  };

  // Payout Actions
  const handleCompletePayout = (id) => {
    setPayoutRequests((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Completed' } : p))
    );
    setStats((prev) => ({
      ...prev,
      pendingPayouts: Math.max(0, prev.pendingPayouts - 1),
    }));
  };

  // Toggle VIP Status
  const handleToggleVip = (id) => {
    setDesigners((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status.includes('VIP') ? 'Standard' : 'Verified VIP' }
          : d
      )
    );
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] text-slate-900 dark:text-white flex flex-col font-sans selection:bg-[#C49A45] selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow relative pt-20 sm:pt-22 pb-24 overflow-hidden">
        {/* Ambient Purple/Gold Glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[300px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Executive Header Banner */}
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl mb-10 shadow-xl dark:shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-[#C49A45] text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-[0_0_30px_rgba(196,154,69,0.3)] shrink-0">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>

                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      Executive Admin Portal
                    </h1>
                    <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                      System Live
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-gray-400 font-mono font-medium">
                    DA-WINGS Global Platform Operations & Quality Control Center
                  </p>
                </div>
              </div>

              {/* System Quick Stats */}
              <div className="flex items-center gap-4 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-xs font-mono">
                <div>
                  <span className="text-slate-600 dark:text-gray-400 block text-[10px] font-bold uppercase">API Status</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">100% Operational</span>
                </div>
                <div className="h-8 w-[1px] bg-slate-300 dark:bg-white/10"></div>
                <div>
                  <span className="text-slate-600 dark:text-gray-400 block text-[10px] font-bold uppercase">Pending Actions</span>
                  <span className="text-[#A88135] dark:text-[#C49A45] font-bold">
                    {moderationQueue.length} Files / {payoutRequests.filter((p) => p.status === 'Pending').length} Payouts
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Key Executive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md dark:shadow-none">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-widest">Platform Sales</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats.grossRevenue}</h3>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1 font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> Gross GMV across all files
              </p>
            </div>

            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md dark:shadow-none">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-widest">Platform Net Cut</span>
                <div className="w-10 h-10 rounded-xl bg-[#C49A45]/15 border border-[#C49A45]/30 flex items-center justify-center text-[#C49A45]">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats.platformCommission}</h3>
              <p className="text-[11px] text-[#A88135] dark:text-[#C49A45] mt-1 font-bold">15% Platform Commission</p>
            </div>

            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md dark:shadow-none">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-widest">Pending Approvals</span>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{moderationQueue.length} files</h3>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-bold">Requires Moderation Review</p>
            </div>

            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md dark:shadow-none">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-widest">Active Creators</span>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats.activeDesigners} digitizers</h3>
              <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1 font-bold">Verified Global Talent</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('approvals')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'approvals'
                  ? 'bg-black dark:bg-[#C49A45] text-white dark:text-black shadow-lg'
                  : 'text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <FileCheck className="w-4 h-4" /> Design Approval Queue ({moderationQueue.length})
            </button>

            <button
              onClick={() => setActiveTab('designers')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'designers'
                  ? 'bg-black dark:bg-[#C49A45] text-white dark:text-black shadow-lg'
                  : 'text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4" /> Creator & Designer Verification ({designers.length})
            </button>

            <button
              onClick={() => setActiveTab('payouts')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'payouts'
                  ? 'bg-black dark:bg-[#C49A45] text-white dark:text-black shadow-lg'
                  : 'text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <Building className="w-4 h-4" /> Payout Requests ({payoutRequests.filter((p) => p.status === 'Pending').length})
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'bg-black dark:bg-[#C49A45] text-white dark:text-black shadow-lg'
                  : 'text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4 h-4" /> Platform Settings
            </button>
          </div>

          {/* TAB 1: DESIGN APPROVAL QUEUE */}
          {activeTab === 'approvals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Pending Embroidery File Submissions</h2>
                  <p className="text-xs text-slate-700 dark:text-gray-400 mt-1 font-medium">Review digitizer files for stitch density quality & machine safety before marketplace release.</p>
                </div>
                <span className="text-xs text-slate-700 dark:text-gray-400 font-mono font-bold">
                  {moderationQueue.length} files awaiting approval
                </span>
              </div>

              {moderationQueue.length === 0 ? (
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-12 text-center space-y-3 shadow-md dark:shadow-none">
                  <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">All Clear! No Pending Submissions</h3>
                  <p className="text-xs text-slate-700 dark:text-gray-400 font-medium">Every uploaded embroidery design has been moderated and published.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {moderationQueue.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-[#C49A45]/50 transition-colors shadow-md dark:shadow-none"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 rounded-xl bg-slate-100 dark:bg-black overflow-hidden shrink-0 relative border border-slate-200 dark:border-white/10">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 left-1 bg-black/80 text-[#C49A45] text-[9px] font-bold px-1.5 py-0.5 rounded">
                            {item.category}
                          </span>
                        </div>

                        <div className="flex-1 space-y-1 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                              {item.status}
                            </span>
                            <span className="text-[10px] text-slate-700 dark:text-gray-400 font-mono font-medium">{item.date}</span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
                          <p className="text-slate-700 dark:text-gray-400 text-[11px] font-medium">Designer: <strong className="text-slate-950 dark:text-white font-bold">{item.designer}</strong> ({item.designerEmail})</p>

                          <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-700 dark:text-gray-300 font-mono">
                            <span>Stitches: <strong className="text-slate-950 dark:text-white font-bold">{item.stitches}</strong></span>
                            <span>Price: <strong className="text-[#A88135] dark:text-[#C49A45] font-black">{item.price}</strong></span>
                            <span>Formats: <strong className="text-cyan-700 dark:text-cyan-400 font-bold">{item.fileTypes}</strong></span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-800 dark:text-gray-400 bg-slate-100 dark:bg-black/30 p-3 rounded-xl border border-slate-200 dark:border-white/5 leading-relaxed font-medium">
                        "{item.desc}"
                      </p>

                      {/* Action buttons */}
                      <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-white/5">
                        <button
                          onClick={() => setPreviewDesign(item)}
                          className="px-3 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-gray-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 border border-slate-200 dark:border-white/10"
                        >
                          <Eye className="w-3.5 h-3.5" /> Preview Specs
                        </button>

                        <button
                          onClick={() => handleRejectDesign(item.id)}
                          className="px-4 py-2 bg-red-500/10 hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 border border-red-500/20"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>

                        <button
                          onClick={() => handleApproveDesign(item.id)}
                          className="flex-1 py-2 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] dark:hover:bg-white text-white dark:text-black hover:text-black font-black text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <Check className="w-4 h-4" /> Approve & Publish
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DESIGNER & USER VERIFICATION */}
          {activeTab === 'designers' && (
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-md dark:shadow-none">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Registered Digitizers & Creator Verification</h2>
                  <p className="text-xs text-slate-700 dark:text-gray-400 mt-1 font-medium">Manage designer roles, VIP Creator badges, and account privileges.</p>
                </div>
                <span className="text-xs text-slate-700 dark:text-gray-400 font-mono font-bold">Total Digitizers: {designers.length}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-800 dark:text-gray-300">
                  <thead className="text-[10px] font-bold text-slate-900 dark:text-gray-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                    <tr>
                      <th className="py-3 px-4">Creator Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Status Badge</th>
                      <th className="py-3 px-4">Listed Files</th>
                      <th className="py-3 px-4">Total Earnings</th>
                      <th className="py-3 px-4">Joined Date</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                    {designers.map((des) => (
                      <tr key={des.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#C49A45]/20 text-[#A88135] dark:text-[#C49A45] font-black flex items-center justify-center text-xs border border-[#C49A45]/30">
                            {des.fullName.charAt(0)}
                          </div>
                          {des.fullName}
                        </td>
                        <td className="py-4 px-4 font-mono text-slate-700 dark:text-gray-400">{des.email}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            des.status.includes('VIP')
                              ? 'bg-[#C49A45]/15 text-[#A88135] dark:text-[#C49A45] border border-[#C49A45]/30'
                              : 'bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-gray-300'
                          }`}>
                            {des.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">{des.totalDesigns} designs</td>
                        <td className="py-4 px-4 font-black text-emerald-700 dark:text-emerald-400">{des.earnings}</td>
                        <td className="py-4 px-4 text-slate-700 dark:text-gray-400 font-medium">{des.joined}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleVip(des.id)}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-[#A88135] dark:text-[#C49A45] rounded-lg text-[10px] font-bold border border-slate-200 dark:border-white/10 transition-colors flex items-center gap-1"
                          >
                            <Award className="w-3 h-3" /> Toggle VIP
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PAYOUT PROCESSING HUB */}
          {activeTab === 'payouts' && (
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-md dark:shadow-none">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Designer Payout Moderation Queue</h2>
                  <p className="text-xs text-slate-700 dark:text-gray-400 mt-1 font-medium">Approve royalty and sales earnings payout requests from creators.</p>
                </div>
                <span className="text-xs text-amber-700 dark:text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  {payoutRequests.filter((p) => p.status === 'Pending').length} Pending Withdrawals
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-800 dark:text-gray-300">
                  <thead className="text-[10px] font-bold text-slate-900 dark:text-gray-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                    <tr>
                      <th className="py-3 px-4">Request ID</th>
                      <th className="py-3 px-4">Designer</th>
                      <th className="py-3 px-4">Requested Amount</th>
                      <th className="py-3 px-4">Destination Bank Account</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                    {payoutRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 font-mono text-slate-700 dark:text-gray-400">{req.id}</td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-slate-900 dark:text-white block">{req.designer}</span>
                          <span className="text-[10px] text-slate-700 dark:text-gray-400 font-mono">{req.email}</span>
                        </td>
                        <td className="py-4 px-4 font-black text-emerald-700 dark:text-emerald-400 text-sm">{req.amount}</td>
                        <td className="py-4 px-4 font-mono text-slate-800 dark:text-gray-300">{req.bank}</td>
                        <td className="py-4 px-4 text-slate-700 dark:text-gray-400">{req.date}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            req.status === 'Completed'
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {req.status === 'Pending' ? (
                            <button
                              onClick={() => handleCompletePayout(req.id)}
                              className="px-4 py-2 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] text-white dark:text-black hover:text-black font-bold text-[10px] uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1 shadow-md"
                            >
                              <Check className="w-3.5 h-3.5" /> Approve & Pay
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-600 dark:text-gray-500 font-mono">Transfer Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: GLOBAL PLATFORM SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl max-w-2xl space-y-6 shadow-md dark:shadow-none">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Global Platform Configuration</h2>
                  <p className="text-xs text-slate-700 dark:text-gray-400 mt-1 font-medium">Configure marketplace commission rates and default pricing rules.</p>
                </div>
                {settingsSaved && (
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Platform Settings Saved!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-900 dark:text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                    Platform Revenue Cut (% Commission)
                  </label>
                  <input
                    type="number"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#C49A45]"
                  />
                  <p className="text-[10px] text-slate-600 dark:text-gray-500 mt-1 font-medium">
                    Creators receive {100 - Number(commissionRate)}% of each digital file purchase.
                  </p>
                </div>

                <div>
                  <label className="block text-slate-900 dark:text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                    Metal Tag Baseline Marking Price ($USD per unit)
                  </label>
                  <input
                    type="text"
                    value={metalTagBasePrice}
                    onChange={(e) => setMetalTagBasePrice(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#C49A45]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Auto-Approve VIP Creator Files</span>
                    <span className="text-slate-700 dark:text-gray-400 text-[10px] font-medium">Bypass manual moderation queue for verified VIP creators.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoApproveVip}
                    onChange={(e) => setAutoApproveVip(e.target.checked)}
                    className="w-5 h-5 accent-[#C49A45] rounded cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-black dark:bg-[#C49A45] hover:bg-[#C49A45] text-white dark:text-black hover:text-black font-black text-xs uppercase tracking-widest rounded-xl transition-colors shadow-lg mt-4"
                >
                  Save Global Configuration
                </button>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* Design Inspection Modal */}
      <AnimatePresence>
        {previewDesign && (
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
              className="bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-4 text-slate-900 dark:text-white"
            >
              <button
                onClick={() => setPreviewDesign(null)}
                className="absolute top-6 right-6 text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Design Spec Verification</h3>

              <div className="aspect-video bg-slate-100 dark:bg-black rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 relative">
                <img src={previewDesign.image} alt={previewDesign.title} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="text-base font-bold text-[#A88135] dark:text-[#C49A45]">{previewDesign.title}</h4>
                <p className="text-slate-800 dark:text-gray-300">Category: {previewDesign.category} • Price: {previewDesign.price}</p>
                <p className="text-slate-700 dark:text-gray-400">Stitches: <strong className="text-slate-950 dark:text-white font-bold">{previewDesign.stitches} stitches</strong></p>
                <p className="text-slate-700 dark:text-gray-400">Machine Formats: <strong className="text-cyan-700 dark:text-cyan-400 font-bold">{previewDesign.fileTypes}</strong></p>
                <p className="text-slate-700 dark:text-gray-400">Description: {previewDesign.desc}</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => {
                    handleApproveDesign(previewDesign.id);
                    setPreviewDesign(null);
                  }}
                  className="flex-1 py-3 bg-black dark:bg-[#C49A45] text-white dark:text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#C49A45] dark:hover:bg-white hover:text-black transition-colors"
                >
                  Approve & Release to Marketplace
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
