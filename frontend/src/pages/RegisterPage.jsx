import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Upload, Palette, X, Eye, EyeOff, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/ui/MagneticButton';
import { registerDesignerAPI } from '../services/api';

const specializations = [
  "Agbada Digitizing",
  "Cap & Hat Designs",
  "Monogram Designs",
  "Corporate Logo Digitizing",
  "Lace & Fabric Patterns",
  "Custom Embroidery",
  "Traditional Attire Patterns",
  "Machine Engineering",
];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: '',
    specialization: [],
    experience: '',
    portfolio: '',
    about: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSpecialization = (spec) => {
    setFormData((prev) => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter((s) => s !== spec)
        : [...prev.specialization, spec],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    setPasswordError('');
    setLoading(true);

    try {
      const result = await registerDesignerAPI(formData);
      if (result.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setServerError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#C49A45] font-medium transition-all duration-300";
  const labelClass = "block text-gray-700 dark:text-white text-xs font-bold uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] flex flex-col font-sans selection:bg-[#C49A45] selection:text-white text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[400px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-22 pb-24">
          
          {/* Header - Premium Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            
            {/* Left: Text */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-5 h-5 text-[#C49A45]" />
                <span className="font-extrabold text-gray-600 dark:text-gray-400 text-[11px] tracking-[0.2em] uppercase">Designer Registration</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.05] mb-6">
                Sell Your Designs <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C49A45] to-amber-500">On Our Platform.</span>
              </h1>
              <p className="text-gray-700 dark:text-gray-400 text-[15px] leading-relaxed max-w-md mb-10 font-medium">
                Upload your work, set your prices, and earn from every sale. Join a growing community of elite embroidery creators.
              </p>

              {/* Mini Stats */}
              <div className="flex gap-10">
                <div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">80%</p>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">Revenue Share</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">5k+</p>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">Active Buyers</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#C49A45]">15+</p>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-widest font-bold">Countries</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Premium Image Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="bg-white/90 dark:bg-white/5 backdrop-blur-2xl border border-amber-900/10 dark:border-white/10 rounded-3xl p-4 shadow-2xl">
                <div className="rounded-2xl overflow-hidden h-[420px]">
                  <img 
                    src="/images/hero_agbada.png" 
                    alt="Premium Embroidery Design" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/90 dark:bg-black/80 backdrop-blur-2xl border border-amber-900/10 dark:border-white/10 rounded-2xl px-5 py-4 shadow-xl">
                  <p className="text-[#C49A45] text-[10px] font-bold uppercase tracking-widest mb-1">Top Designer</p>
                  <p className="text-gray-900 dark:text-white text-sm font-bold">Earned ₦2.4M this year</p>
                </div>
              </div>
            </motion.div>

          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white/90 dark:bg-white/5 backdrop-blur-2xl border border-amber-900/10 dark:border-white/10 rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
                  
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#C49A45] rounded-full text-black text-xs font-black flex items-center justify-center">1</span>
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input 
                          type="text" name="fullName" required
                          value={formData.fullName} onChange={handleChange}
                          placeholder="Your full name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Email Address *</label>
                        <input 
                          type="email" name="email" required
                          value={formData.email} onChange={handleChange}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <input 
                          type="tel" name="phone"
                          value={formData.phone} onChange={handleChange}
                          placeholder="+234 800 000 0000"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Country *</label>
                        <input 
                          type="text" name="country" required
                          value={formData.country} onChange={handleChange}
                          placeholder="Nigeria"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Login Credentials */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#C49A45] rounded-full text-black text-xs font-black flex items-center justify-center">2</span>
                      Login Credentials
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-5">Create a username and password to access your designer dashboard.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Username *</label>
                        <input 
                          type="text" name="username" required
                          value={formData.username} onChange={handleChange}
                          placeholder="Choose a unique username"
                          className={inputClass}
                        />
                      </div>
                      <div className="relative">
                        <label className={labelClass}>Password *</label>
                        <input 
                          type={showPassword ? 'text' : 'password'} name="password" required
                          value={formData.password} onChange={(e) => { handleChange(e); setPasswordError(''); }}
                          placeholder="Min. 8 characters"
                          className={inputClass}
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-[38px] text-gray-400 hover:text-[#C49A45] transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div>
                        <label className={labelClass}>Confirm Password *</label>
                        <input 
                          type={showPassword ? 'text' : 'password'} name="confirmPassword" required
                          value={formData.confirmPassword} onChange={(e) => { handleChange(e); setPasswordError(''); }}
                          placeholder="Re-enter password"
                          className={`${inputClass} ${passwordError ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30' : ''}`}
                        />
                      </div>
                    </div>
                    {passwordError && (
                      <p className="text-red-500 dark:text-red-400 text-xs mt-3 flex items-center gap-1.5">
                        <X className="w-3 h-3" /> {passwordError}
                      </p>
                    )}
                  </div>

                  {/* Specialization */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#C49A45] rounded-full text-black text-xs font-black flex items-center justify-center">3</span>
                      Your Specialization
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">Select all the design categories you work in.</p>
                    <div className="flex flex-wrap gap-3">
                      {specializations.map((spec) => {
                        const isSelected = formData.specialization.includes(spec);
                        return (
                          <button
                            type="button"
                            key={spec}
                            onClick={() => toggleSpecialization(spec)}
                            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide border transition-all duration-300 ${
                              isSelected 
                                ? 'bg-[#C49A45] border-[#C49A45] text-black' 
                                : 'bg-white dark:bg-white/5 border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-400 hover:border-[#C49A45]/50 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            {isSelected && <CheckCircle className="w-3 h-3 inline mr-1.5 -mt-0.5" />}
                            {spec}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Experience & About */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#C49A45] rounded-full text-black text-xs font-black flex items-center justify-center">4</span>
                      Experience & Portfolio
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <label className={labelClass}>Years of Experience *</label>
                        <select 
                          name="experience" required
                          value={formData.experience} onChange={handleChange}
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          <option value="" className="bg-white dark:bg-[#111] text-gray-900 dark:text-white">Select experience level</option>
                          <option value="0-1" className="bg-white dark:bg-[#111] text-gray-900 dark:text-white">Less than 1 year</option>
                          <option value="1-3" className="bg-white dark:bg-[#111] text-gray-900 dark:text-white">1 - 3 years</option>
                          <option value="3-5" className="bg-white dark:bg-[#111] text-gray-900 dark:text-white">3 - 5 years</option>
                          <option value="5-10" className="bg-white dark:bg-[#111] text-gray-900 dark:text-white">5 - 10 years</option>
                          <option value="10+" className="bg-white dark:bg-[#111] text-gray-900 dark:text-white">10+ years</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Portfolio Link</label>
                        <input 
                          type="url" name="portfolio"
                          value={formData.portfolio} onChange={handleChange}
                          placeholder="https://your-portfolio.com (optional)"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Tell Us About Yourself *</label>
                        <textarea 
                          name="about" required rows={4}
                          value={formData.about} onChange={handleChange}
                          placeholder="Briefly describe your design style, what software you use, and what makes your work unique..."
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error display */}
                  {serverError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 dark:text-red-400 text-xs font-semibold uppercase tracking-wider">
                      {serverError}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="pt-4">
                    <MagneticButton>
                      <button 
                        type="submit"
                        disabled={loading}
                        className="shimmer-btn inline-flex h-[55px] items-center justify-center bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black px-12 font-bold text-[13px] rounded-sm transition-all duration-300 tracking-widest uppercase shadow-[0_10px_30px_rgba(196,154,69,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            Processing... <Loader2 className="ml-3 w-4 h-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            Submit Application <ArrowRight className="ml-3 w-4 h-4" />
                          </>
                        )}
                      </button>
                    </MagneticButton>
                  </div>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl text-center mx-auto py-20"
              >
                <div className="w-20 h-20 bg-[#C49A45]/20 border border-[#C49A45]/30 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-10 h-10 text-[#C49A45]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
                  Application Submitted!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
                  Thank you, <span className="text-gray-900 dark:text-white font-bold">{formData.fullName}</span>. Your designer account has been created. You can now log in with your credentials to access your designer portal.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <MagneticButton>
                    <a 
                      href="/login"
                      className="inline-flex h-[50px] items-center justify-center bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black px-8 font-bold text-[13px] rounded-xl transition-all duration-300 tracking-wider shadow-lg"
                    >
                      Log In To Dashboard
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a 
                      href="/"
                      className="inline-flex h-[50px] items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white px-8 font-bold text-[13px] rounded-xl transition-all duration-300 tracking-wide border border-gray-200 dark:border-white/10"
                    >
                      Back to Home
                    </a>
                  </MagneticButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
